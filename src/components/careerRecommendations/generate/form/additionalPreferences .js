import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    AutoCompleteMultiSelect,
    formUtils,
    TextAreaField
} from '@/components/common';
import Options from '@/data/careerRecomendation/additionalAndPreferences.json';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';

export default function AdditionalAndPreferences({
    additionalPreferencesData,
    onFormDataChange
}) {
    const ADDITIONAL_AND_PREFERENCES =
        CAREER_RECOMMENDATION_SECTIONS.ADDITIONAL_AND_PREFERENCES;
    const [softSkills, setSoftSkills] = useState(
        Options.softSkillsOptions || []
    );
    const [hobbies, setHobbies] = useState(Options.hobbiesOptions || []);
    const [teamPreferences, setTeamPreferences] = useState(
        Options.teamPreferencesOptions || []
    );

    const handleChange = (field, value) => {
        onFormDataChange(
            ADDITIONAL_AND_PREFERENCES,
            formUtils.getUpdatedFormData(
                additionalPreferencesData,
                field,
                value
            )
        );
    };
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography
                className="infinize__inputLabel"
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                color="primary.main"
            >
                Additional Preferences & Interests
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
                        Soft Skills
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="softSkills"
                        label="Soft Skills"
                        value={additionalPreferencesData?.softSkills}
                        options={softSkills}
                        onChange={value => handleChange('softSkills', value)}
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Hobbies / Personal Interests
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="hobbies"
                        label="Hobbies / Personal Interests"
                        value={additionalPreferencesData?.hobbies}
                        options={hobbies}
                        onChange={value => handleChange('hobbies', value)}
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Team / Culture Preferences
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="teamPreferences"
                        label="Team / Culture Preferences"
                        value={additionalPreferencesData?.teamPreferences}
                        options={teamPreferences}
                        onChange={value =>
                            handleChange('teamPreferences', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Extracurricular Volunteer Involvement
                    </Typography>
                    <TextAreaField
                        maxWords={100}
                        hasWordLimit={true}
                        name="extracurricularInvolvement"
                        label="Extracurricular Volunteer Involvement"
                        value={
                            additionalPreferencesData?.extracurricularInvolvement
                        }
                        onChange={val =>
                            handleChange('extracurricularInvolvement', val)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
