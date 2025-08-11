import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    AutoCompleteMultiSelect,
    formUtils,
    MultiSelectField,
    RadioGroupField
} from '@/components/common';
import predefinedOptions from '@/data/coursePlan/form/learningPersonalization.json';
import {COURSE_PLAN_SECTIONS} from '@/config/constants';

export default function LearningPersonalization({
    learningData,
    onFormDataChange
}) {
    const LEARNING_PERSONALIZATION =
        COURSE_PLAN_SECTIONS.LEARNING_PERSONALIZATION;
    const [priorKnowledge, setPriorKnowledge] = useState([]);

    useEffect(() => {
        setPriorKnowledge(predefinedOptions.priorKnowledge);
    }, []);

    const handleChange = (field, value) => {
        onFormDataChange(
            LEARNING_PERSONALIZATION,
            formUtils.getUpdatedFormData(learningData, field, value)
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
                Learning Personalization
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
                        Prior Knowledge/Skills
                    </Typography>
                    <AutoCompleteMultiSelect
                        name="priorKnowledge"
                        label="Prior Knowledge/Skills"
                        value={learningData?.priorKnowledge}
                        options={priorKnowledge}
                        onChange={value =>
                            handleChange('priorKnowledge', value)
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
                        Preferred Learning Pace
                    </Typography>
                    <RadioGroupField
                        name="learningPace"
                        label="Preferred Learning Pace"
                        value={learningData?.learningPace}
                        options={['Fast-Paced', 'Steady Progress']}
                        onChange={value => handleChange('learningPace', value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
