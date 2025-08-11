import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    MultiSelectField,
    SelectField,
    CheckboxGroup,
    RadioGroupField,
    formUtils,
    AutoCompleteMultiSelect
} from '@/components/common';
import predefinedOptions from '@/data/coursePlan/form/academicConstraints.json';
import {COURSE_PLAN_SECTIONS} from '@/config/constants';

export default function AcademicConstraints({academicData, onFormDataChange}) {
    const ACADEMIC_CONSTRAINTS = COURSE_PLAN_SECTIONS.ACADEMIC_CONSTRAINTS;
    const [strengths, setStrengths] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [financialConstraints, setFinancialConstraints] = useState([]);
    const [desiredGraduationTerm, setDesiredGraduationTerm] = useState([]);
    const [locationConstraints, setLocationConstraints] = useState([]);

    useEffect(() => {
        setStrengths(predefinedOptions.strengths);
        setChallenges(predefinedOptions.challenges);
        setFinancialConstraints(predefinedOptions.financialConstraints);
        setDesiredGraduationTerm(predefinedOptions.desiredGraduationTerms);
        setLocationConstraints(predefinedOptions.locationConstraints);
    }, []);

    const handleChange = (field, value) => {
        onFormDataChange(
            ACADEMIC_CONSTRAINTS,
            formUtils.getUpdatedFormData(academicData, field, value)
        );
    };

    return (
        <Box sx={{mb: 3}}>
            <Typography
                color="primary.main"
                mb={1}
                mt={2}
                fontSize={'18px'}
                fontWeight={'500'}
            >
                Academic Constraints
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', md: '1fr 1fr'}}
                gap={3}
                mb={2}
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Strengths
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="strengths"
                        label="Strengths"
                        value={academicData?.strengths}
                        options={strengths}
                        onChange={value => handleChange('strengths', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Challenges
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="challenges"
                        label="Challenges"
                        value={academicData?.challenges}
                        options={challenges}
                        onChange={value => handleChange('challenges', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Schedule Preferences
                    </Typography>
                    <CheckboxGroup
                        name="schedulePreferences"
                        label="Schedule Preferences"
                        value={academicData?.schedulePreferences}
                        options={[
                            'Mornings',
                            'Afternoons',
                            'Evenings',
                            'Weekdays',
                            'Weekends'
                        ]}
                        onChange={value =>
                            handleChange('schedulePreferences', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Course Load Preferences
                    </Typography>
                    <RadioGroupField
                        name="courseLoadPreferences"
                        label="Course Load Preferences"
                        value={academicData?.courseLoadPreferences}
                        options={['Full-Time', 'Part-Time']}
                        onChange={value =>
                            handleChange('courseLoadPreferences', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Financial Constraints
                    </Typography>
                    <MultiSelectField
                        name="financialConstraints"
                        label="Financial Constraints"
                        value={academicData?.financialConstraints}
                        options={financialConstraints}
                        onChange={value =>
                            handleChange('financialConstraints', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Location Constraints
                    </Typography>
                    <MultiSelectField
                        name="locationConstraints"
                        label="Location Constraints"
                        value={academicData?.locationConstraints}
                        options={locationConstraints}
                        onChange={value =>
                            handleChange('locationConstraints', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Desired Graduation Term
                    </Typography>
                    <SelectField
                        name="desiredGraduationTerm"
                        label="Desired GraduationTerm"
                        value={academicData?.desiredGraduationTerm}
                        options={desiredGraduationTerm}
                        onChange={value =>
                            handleChange('desiredGraduationTerm', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
