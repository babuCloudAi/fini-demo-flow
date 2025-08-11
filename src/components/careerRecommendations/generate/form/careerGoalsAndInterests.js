import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    AutoCompleteMultiSelect,
    AutoCompleteSelect,
    formUtils,
    SelectField
} from '@/components/common';
import Options from '@/data/careerRecomendation/careerGoalsAndInterests.json';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';

export default function CareerGoalsAndInterests({
    interestsData,
    onFormDataChange
}) {
    const CAREER_GOALS_AND_INTERESTS =
        CAREER_RECOMMENDATION_SECTIONS.CAREER_GOALS_AND_INTERESTS;
    const [desiredIndustries, setDesiredIndustries] = useState(
        Options.desiredIndustries || []
    );
    const [desiredRoles, setDesiredRoles] = useState(
        Options.desiredRoles || []
    );
    const [careerFocus, setCareerFocus] = useState(Options.careerFocus || []);
    const [salaryExpectations, setSalaryExpectations] = useState(
        Options.salaryExpectation || []
    );
    const [organization, setOrganization] = useState(
        Options.organization || []
    );

    const handleChange = (field, value) => {
        onFormDataChange(
            CAREER_GOALS_AND_INTERESTS,
            formUtils.getUpdatedFormData(interestsData, field, value)
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
                Career Goals & Interests
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
                p={3}
                className="border"
            >
                <Box>
                    <Typography className="infinize__inputLabel">
                        Desired Industries
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="desiredIndustries"
                        label="Desired Industries"
                        value={interestsData?.desiredIndustries}
                        options={desiredIndustries}
                        onChange={value =>
                            handleChange('desiredIndustries', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Desired Roles / Job Titles
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="desiredRoles"
                        label="Desired Roles / Job Titles"
                        value={interestsData?.desiredRoles}
                        options={desiredRoles}
                        onChange={value => handleChange('desiredRoles', value)}
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Career Focus
                    </Typography>
                    <AutoCompleteSelect
                        name="careerFocus"
                        label="Career Focus"
                        value={interestsData?.careerFocus}
                        options={careerFocus}
                        onChange={value => handleChange('careerFocus', value)}
                        getOptionLabel={option => option}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Salary Expectations
                    </Typography>
                    <SelectField
                        name="salaryExpectations"
                        label="Salary Expectations"
                        value={interestsData?.salaryExpectations}
                        options={salaryExpectations}
                        onChange={value =>
                            handleChange('salaryExpectations', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Preferred Organization Type
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="preferredOrganizationType"
                        label="Preferred Organization Type"
                        value={interestsData?.preferredOrganizationType}
                        options={organization}
                        onChange={value =>
                            handleChange('preferredOrganizationType', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
