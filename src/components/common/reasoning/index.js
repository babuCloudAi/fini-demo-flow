'use client';
import React, {useState, useEffect} from 'react';
import {Box, Button, Typography} from '@mui/material';
import classes from './reasoning.module.css';
import {MarkdownViewer, TextAreaField} from '@/components/common';

export function Reasoning({
    reasoning,
    onGeneratePlan,
    title,
    onRegenerate,
    additionalInstructions,
    onAdditionalInstructionsChange,
    generateButtonLabel,
    regenerateButtonLabel
}) {
    useEffect(() => {
        // Scroll to the top of the page once the reasoning is displayed
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [reasoning]);

    const [isShowTextArea, setisShowTextArea] = useState(false);

    const toggleIsShowTextArea = () => {
        setisShowTextArea(prev => !prev);
    };

    const handelRegenerate = () => {
        onRegenerate();
        toggleIsShowTextArea();
    };
    const handleCancel = () => {
        onAdditionalInstructionsChange('');
        toggleIsShowTextArea();
    };
    return (
        <Box className={classes.infinize__reasoningContainer}>
            <Typography variant="h6" color="primary.main" fontWeight={600}>
                {title}
            </Typography>
            <Box className={classes.infinize__reasoningViewerContainer}>
                <Box className={classes.infinize__reasoningViewerSubContainer}>
                    <MarkdownViewer
                        markdownContent={reasoning}
                        isSlowReveal={true}
                    />
                </Box>
            </Box>

            {isShowTextArea && (
                <TextAreaField
                    maxWords={250}
                    placeholder={'Additional instructions or context for AI'}
                    name="additionalInstructions"
                    label="additionalInstructions"
                    value={additionalInstructions}
                    onChange={onAdditionalInstructionsChange}
                    hasWordLimit={true}
                />
            )}

            <Box
                display={'flex'}
                gap={2}
                flexDirection={{xs: 'column', sm: 'row'}}
                width={'100%'}
            >
                {!isShowTextArea && (
                    <Button
                        variant="contained"
                        className="infinize__button"
                        onClick={onGeneratePlan}
                    >
                        {generateButtonLabel}
                    </Button>
                )}
                {!isShowTextArea && (
                    <Button
                        variant="outlined"
                        size="large"
                        className="infinize__button"
                        onClick={toggleIsShowTextArea}
                    >
                        Provide Instructions
                    </Button>
                )}

                {isShowTextArea && (
                    <Box
                        display={'flex'}
                        flexDirection={{xs: 'column', sm: 'row'}}
                        gap={2}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            className="infinize__button"
                            onClick={handelRegenerate}
                            disabled={!additionalInstructions}
                        >
                            {regenerateButtonLabel}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            className="infinize__button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
