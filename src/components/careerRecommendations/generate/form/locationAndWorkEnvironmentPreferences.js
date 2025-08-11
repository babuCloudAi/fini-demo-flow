import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {MultiSelectField, SelectField, formUtils} from '@/components/common';
import Options from '@/data/careerRecomendation/locationAndWorkEnvironmentPreferences.json';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';

export default function LocationAndWorkEnvironmentPreferences({
    onFormDataChange,
    locationData
}) {
    const LOCATION_AND_WORK_ENVIRONMENT_PREFERENCES =
        CAREER_RECOMMENDATION_SECTIONS.LOCATION_AND_WORK_ENVIRONMENT_PREFERENCES;
    const [locationPreferences, setLocationPreferences] = useState(
        Options.locationPreferences || []
    );

    const [workFormat, setWorkFormat] = useState(Options.workFormat || []);
    const [workHoursAvailability, setWorkHoursAvailability] = useState(
        Options.workHoursAvailability || []
    );

    const handleChange = (field, value) => {
        onFormDataChange(
            LOCATION_AND_WORK_ENVIRONMENT_PREFERENCES,
            formUtils.getUpdatedFormData(locationData, field, value)
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
                Location & Work Environment Preferences
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
                        Location Preferences
                    </Typography>
                    <SelectField
                        name="locationPreferences"
                        label="Location Preferences"
                        value={locationData?.locationPreferences}
                        options={locationPreferences}
                        onChange={value =>
                            handleChange('locationPreferences', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Willingness to Relocate
                    </Typography>
                    <SelectField
                        name="willingnesstoRelocate"
                        label="Willingness to Relocate"
                        value={locationData?.willingnesstoRelocate}
                        options={['Yes', 'No']}
                        onChange={value =>
                            handleChange('willingnesstoRelocate', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Work Format
                    </Typography>
                    <MultiSelectField
                        name="workFormat"
                        label="Work Format"
                        value={locationData?.workFormat}
                        options={workFormat}
                        onChange={value => handleChange('workFormat', value)}
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Work Hours Availability
                    </Typography>
                    <MultiSelectField
                        name="workHoursAvailability"
                        label="Work Hours Availability"
                        value={locationData?.workHoursAvailability}
                        options={workHoursAvailability}
                        onChange={value =>
                            handleChange('workHoursAvailability', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
