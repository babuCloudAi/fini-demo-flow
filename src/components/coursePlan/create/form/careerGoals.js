import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    AutoCompleteMultiSelect,
    formUtils,
    MultiSelectField,
    SelectField
} from '@/components/common';
import predefinedOptions from '@/data/coursePlan/form/careerGoals.json';
import {COURSE_PLAN_SECTIONS} from '@/config/constants';

export default function CareerGoals({careerGoalsData, onFormDataChange}) {
    const CAREER_GOALS = COURSE_PLAN_SECTIONS?.CAREER_GOALS;
    const [careerAspirations, setCareerAspirations] = useState([]);
    const [desiredCourseLoad, setDesiredCourseLoad] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [internshipGoals, setInternshipGoals] = useState([]);
    const [salaryExpectations, setSalaryExpectations] = useState([]);

    useEffect(() => {
        setCareerAspirations(predefinedOptions.careerAspirations);
        setDesiredCourseLoad(predefinedOptions.desiredCourseLoad);
        setCertifications(predefinedOptions.certifications);
        setInternshipGoals(predefinedOptions.internshipGoals);
        setSalaryExpectations(predefinedOptions.salaryExpectations);
    }, []);

    const handleChange = (field, value) => {
        onFormDataChange(
            CAREER_GOALS,
            formUtils.getUpdatedFormData(careerGoalsData, field, value)
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
                Career Goals
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Career Aspirations
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="careerAspirations"
                        label="Career Aspirations"
                        value={careerGoalsData?.careerAspirations}
                        options={careerAspirations}
                        onChange={value =>
                            handleChange('careerAspirations', value)
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
                        Desired Course Load
                    </Typography>
                    <MultiSelectField
                        name="desiredCourseLoad"
                        label="Desired Course Load"
                        value={careerGoalsData?.desiredCourseLoad}
                        options={desiredCourseLoad}
                        onChange={value =>
                            handleChange('desiredCourseLoad', value)
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
                        Certifications
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="certifications"
                        label="Certifications"
                        value={careerGoalsData?.certifications}
                        options={certifications}
                        onChange={value =>
                            handleChange('certifications', value)
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
                        Internship/Co-Op Goals
                    </Typography>
                    <MultiSelectField
                        name="internshipGoals"
                        label="Internship/Co-Op Goals"
                        value={careerGoalsData?.internshipGoals}
                        options={internshipGoals}
                        onChange={value =>
                            handleChange('internshipGoals', value)
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
                        Salary Expectations
                    </Typography>
                    <SelectField
                        name="salaryExpectations"
                        label="Salary Expectations"
                        value={careerGoalsData?.salaryExpectations}
                        options={salaryExpectations}
                        onChange={value =>
                            handleChange('salaryExpectations', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
