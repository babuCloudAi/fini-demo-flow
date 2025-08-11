import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {
    TextInput,
    CustomDatePicker,
    AddButton,
    formUtils,
    DeleteButton
} from '@/components/common';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';
import classes from '../../career.module.css';

export default function CertificationsAndLicenses({
    onFormDataChange,
    licensesData
}) {
    const CERTIFICATIONS_AND_LICENSES =
        CAREER_RECOMMENDATION_SECTIONS.CERTIFICATIONS_AND_LICENSES;
    const [licensesList, setLicensesList] = useState([]);

    useEffect(() => {
        // Initialize the licensesList state based on the licensesData prop
        // Each license gets an ID based on its index for tracking in the UI
        setLicensesList(
            licensesData?.licenses?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [licensesData]); // Runs when `licensesList` changes

    /**
     * Handles field changes within a specific license entry.
     * Updates the license object at the given index and notifies the parent.
     *
     * @param {number} index - Index of the license entry being modified.
     * @param {string} field - Field name to be updated (e.g., "name", "issuer").
     * @param {any} value - New value for the specified field.
     */

    const handleFieldChange = (index, field, value) => {
        const updatedData = licensesData?.licenses ?? [];

        updatedData[index] = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );
        const finalObject = {
            ...licensesData,
            licenses: updatedData
        };
        // Notify the parent component
        onFormDataChange(CERTIFICATIONS_AND_LICENSES, finalObject);
    };

    /**
     * Adds a new blank license entry to the licenses list.
     * Each new entry gets a unique ID based on the current list length.
     */
    const handleAddLicenses = () => {
        setLicensesList([...licensesList, {id: licensesList?.length}]);
    };

    /**
     * Removes a license entry from the list by index.
     * Updates both the local UI list and the parent form data.
     */
    const handleRemoveLicenses = index => {
        // Remove the licenses section entry at the specified index
        const updatedList = [...licensesList];
        updatedList.splice(index, 1);

        // Remove the licenses entry from form data at the specified index
        const updatedLicensessList = licensesData?.licenses
            ? [...licensesData.licenses]
            : [];
        updatedLicensessList.splice(index, 1);

        setLicensesList(updatedList);

        // Update state and notify parent component
        onFormDataChange(
            CERTIFICATIONS_AND_LICENSES,
            formUtils.getUpdatedFormData(
                licensesData,
                'licenses',
                updatedLicensessList
            )
        );
    };

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                color="primary.main"
            >
                Certifications & Licenses
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={1}>
                {licensesList?.map((Positions, index) => (
                    <Box className="border" p={3} key={index}>
                        <Box
                            display="grid"
                            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                            gap={3}
                        >
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Certification Name
                                </Typography>
                                <TextInput
                                    name={`certificationName${index}`}
                                    label="Certification Name"
                                    value={
                                        licensesData?.licenses?.[index]
                                            ?.certificationName
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'certificationName',
                                            val
                                        )
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Issued By
                                </Typography>
                                <TextInput
                                    name={`company${index}`}
                                    label="Company/Organization"
                                    value={
                                        licensesData?.licenses?.[index]?.company
                                    }
                                    onChange={val =>
                                        handleFieldChange(index, 'company', val)
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Issue Date
                                </Typography>
                                <CustomDatePicker
                                    name={`issueDate${index}`}
                                    label="Issue Date"
                                    value={
                                        licensesData?.licenses?.[index]
                                            ?.issueDate
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'issueDate',
                                            val
                                        )
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Expiration Date
                                </Typography>

                                <CustomDatePicker
                                    name={`expirationDate${index}`}
                                    label="Expiration Date"
                                    value={
                                        licensesData?.licenses?.[index]
                                            ?.expirationDate
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'expirationDate',
                                            val
                                        )
                                    }
                                />
                            </Box>
                        </Box>
                        <Box
                            className={
                                classes.infinize__positionActionContainer
                            }
                        >
                            {licensesList?.length > 1 && (
                                <DeleteButton
                                    onClick={() => handleRemoveLicenses(index)}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <AddButton
                onAdd={handleAddLicenses}
                name="Add"
                disabled={
                    licensesList.length === licensesData?.licenses?.length
                }
            />
        </Box>
    );
}
