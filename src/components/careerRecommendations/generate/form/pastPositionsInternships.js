import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {
    TextInput,
    TextAreaField,
    CustomDatePicker,
    CustomCheckbox,
    AddButton,
    formUtils,
    DeleteButton
} from '@/components/common';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';
import classes from '../../career.module.css';

export default function PastPositionsInternships({
    onFormDataChange,
    pastPositionsData
}) {
    const PAST_POSITIONS_INTERNSHIPS =
        CAREER_RECOMMENDATION_SECTIONS.PAST_POSITIONS_INTERNSHIPS;
    const [pastPositionsList, setPastPositionsList] = useState([]);
    useEffect(() => {
        // Sync the length of pastPositionsData and pastPositionsList on component mount
        // Add an object to the pastPositionsList for each item that exists in pastPositionsData
        // This will ensure that all the items in the pastPositionsData will be displayed on component mount
        // If there are no Datas added (pastPositionsData is empty), then to display one section by default, initialize pastPositionsList with one object
        setPastPositionsList(
            pastPositionsData?.positions?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [pastPositionsData]); // Runs when `pastPositionsData` changes

    const handleFieldChange = (index, field, value) => {
        const updatedData = pastPositionsData?.positions ?? [];

        let updatedItem = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );
        // Remove `to` field if `isCurrentlyWorkingHere` is true
        if (updatedItem?.isCurrentlyWorkingHere) {
            const {to, ...rest} = updatedItem;
            updatedItem = rest;
        }
        updatedData[index] = updatedItem;

        const finalObject = {
            ...pastPositionsData,
            positions: updatedData
        };

        // Notify the parent component
        onFormDataChange(PAST_POSITIONS_INTERNSHIPS, finalObject);
    };
    /**
     * Adds a new empty position entry to the list.
     */
    const handleAddPosition = () => {
        setPastPositionsList([
            ...pastPositionsList,
            {id: pastPositionsList?.length}
        ]);
    };

    /**
     * Removes a position entry from the list based on index.
     */
    const handleRemovePosition = index => {
        console.log();
        // Remove the position section entry at the specified index
        const updatedList = [...pastPositionsList];
        updatedList.splice(index, 1);

        // Remove the position entry from form data at the specified index
        const updatedPositionList = pastPositionsData?.positions
            ? [...pastPositionsData.positions]
            : [];
        updatedPositionList.splice(index, 1);

        setPastPositionsList(updatedList);

        // Update state and notify parent component
        onFormDataChange(
            PAST_POSITIONS_INTERNSHIPS,
            formUtils.getUpdatedFormData(
                pastPositionsData,
                'positions',
                updatedPositionList
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
                Past Positions / Internships
            </Typography>

            <Box display="flex" flexDirection="column" gap={2} mb={1}>
                {pastPositionsList?.map((_, index) => (
                    <Box p={3} className="border" key={index}>
                        <Box
                            display="grid"
                            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                            gap={3}
                        >
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Position Title
                                </Typography>
                                <TextInput
                                    name={`positionTitle${index}`}
                                    label="Position Title"
                                    value={
                                        pastPositionsData?.positions?.[index]
                                            ?.positionTitle
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'positionTitle',
                                            val
                                        )
                                    }
                                />
                            </Box>
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Company/Organization
                                </Typography>
                                <TextInput
                                    name={`company${index}`}
                                    label="Company/Organization"
                                    value={
                                        pastPositionsData?.positions?.[index]
                                            ?.company
                                    }
                                    onChange={val =>
                                        handleFieldChange(index, 'company', val)
                                    }
                                />
                            </Box>
                            <Box>
                                <Box display={'flex'} gap={2}>
                                    <Box flex={1}>
                                        <Typography className="infinize__inputLabel">
                                            From
                                        </Typography>
                                        <CustomDatePicker
                                            name={`from${index}`}
                                            label="From"
                                            value={
                                                pastPositionsData?.positions?.[
                                                    index
                                                ]?.from
                                            }
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'from',
                                                    val
                                                )
                                            }
                                        />
                                    </Box>
                                    {!pastPositionsData?.positions?.[index]
                                        ?.isCurrentlyWorkingHere && (
                                        <Box flex={1}>
                                            <Typography className="infinize__inputLabel">
                                                To
                                            </Typography>
                                            <CustomDatePicker
                                                label="To"
                                                name={`to${index}`}
                                                value={
                                                    pastPositionsData
                                                        ?.positions?.[index]?.to
                                                }
                                                onChange={val =>
                                                    handleFieldChange(
                                                        index,
                                                        'to',
                                                        val
                                                    )
                                                }
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <CustomCheckbox
                                    label="I am currently working here"
                                    name={`isCurrentlyWorkingHere${index}`}
                                    value={
                                        pastPositionsData?.positions?.[index]
                                            ?.isCurrentlyWorkingHere || false
                                    }
                                    onChange={val => {
                                        handleFieldChange(
                                            index,
                                            'isCurrentlyWorkingHere',
                                            val
                                        );
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Key Responsibilities / Achievements
                                </Typography>
                                <TextAreaField
                                    maxWords={100}
                                    hasWordLimit={true}
                                    name={`keyResponsibilities${index}`}
                                    label="Key Responsibilities / Achievements"
                                    value={
                                        pastPositionsData?.positions?.[index]
                                            ?.keyResponsibilities
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'keyResponsibilities',
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
                            {pastPositionsList?.length > 1 && (
                                <DeleteButton
                                    onClick={() => handleRemovePosition(index)}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <AddButton
                onAdd={handleAddPosition}
                name="Add"
                disabled={
                    pastPositionsList.length ===
                    pastPositionsData?.positions?.length
                }
            />
        </Box>
    );
}
