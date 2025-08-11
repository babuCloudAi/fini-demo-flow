import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    formUtils,
    MultiSelectField,
    RadioGroupField
} from '@/components/common';
import predefinedOptions from '@/data/coursePlan/form/personalInterests.json';
import {COURSE_PLAN_SECTIONS} from '@/config/constants';
import {AutoCompleteMultiSelect} from '@/components/common/form/autoCompleteMultiSelect';

export default function PersonalInterests({
    personalInterestsData,
    onFormDataChange
}) {
    const PERSONAL_INTERESTS = COURSE_PLAN_SECTIONS.PERSONAL_INTERESTS;
    const [clubs, setClubs] = useState([]);
    const [passions, setPassions] = useState([]);

    useEffect(() => {
        setPassions(predefinedOptions.hobbiesPassions);
        setClubs(predefinedOptions.clubs);
    }, []);

    const handleChange = (field, value) => {
        onFormDataChange(
            PERSONAL_INTERESTS,
            formUtils.getUpdatedFormData(personalInterestsData, field, value)
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
                Personal Interests
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
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
                        Clubs/Organizations
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="clubs"
                        label="Clubs/Organizations"
                        value={personalInterestsData?.clubs}
                        options={clubs}
                        onChange={value => handleChange('clubs', value)}
                    />
                </Box>

                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Hobbies/Passions
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="passions"
                        label="Hobbies/Passions"
                        value={personalInterestsData?.passions}
                        options={passions}
                        onChange={value => handleChange('passions', value)}
                    />
                </Box>

                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Study Abroad or Exchange Opportunities
                    </Typography>
                    <RadioGroupField
                        name="studyAbroad"
                        label="Study Abroad or Exchange Opportunities"
                        value={personalInterestsData?.studyAbroad}
                        options={['Yes', 'No', 'Maybe']}
                        onChange={value => handleChange('studyAbroad', value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
