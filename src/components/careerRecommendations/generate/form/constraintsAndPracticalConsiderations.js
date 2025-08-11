import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {SelectField, formUtils} from '@/components/common';
import Options from '@/data/careerRecomendation/constraintsAndPracticalConsiderations.json';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';

export default function ConstraintsAndPracticalConsiderations({
    constraintsData,
    onFormDataChange
}) {
    const CONSTRAINTS_AND_PRACTICAL_CONSIDERATIONS =
        CAREER_RECOMMENDATION_SECTIONS.CONSTRAINTS_AND_PRACTICAL_CONSIDERATIONS;
    const [financialConstraintsOrNeeds, setFinancialConstraintsOrNeeds] =
        useState(Options.financialConstraintsOrNeeds || []);
    const [timeline, setTimeline] = useState(Options.timeline || []);

    const handleChange = (field, value) => {
        onFormDataChange(
            CONSTRAINTS_AND_PRACTICAL_CONSIDERATIONS,
            formUtils.getUpdatedFormData(constraintsData, field, value)
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
                Constraints & Practical Considerations
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
                className="border"
                p={3}
            >
                <Box>
                    <Typography className="infinize__inputLabel">
                        Financial Constraints / Needs
                    </Typography>
                    <SelectField
                        name="financialConstraintsOrNeeds"
                        label="Financial Constraints / Needs"
                        value={constraintsData?.financialConstraintsOrNeeds}
                        options={financialConstraintsOrNeeds}
                        onChange={value =>
                            handleChange('financialConstraintsOrNeeds', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Timeline / Urgency
                    </Typography>
                    <SelectField
                        name="Timeline"
                        label="Timeline / Urgency"
                        value={constraintsData?.Timeline}
                        options={timeline}
                        onChange={value => handleChange('Timeline', value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
