'use client';
import {useEffect, useState} from 'react';
import {Box, Skeleton, Typography} from '@mui/material';
import {InfinizeDialog} from './infinizeDialog';
import {MarkdownViewer} from './markdownViewer';
import classes from './common.module.css';

export function RationaleDialog({
    isOpen,
    onClose,
    contentUrl,
    title,
    isOriginalAiRecommendation = true //TODO:The assigned value should be removed because it is already being set in functions like Add, Delete, Move, and resolving the onload errors.
}) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const toggleIsLoading = value => {
        setIsLoading(prev => {
            return value === prev ? prev : value;
        });
    };

    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch(contentUrl);
                const text = await res.text();
                setTimeout(() => {
                    setContent(text); // TODO: Remove this after API integration
                    toggleIsLoading(false);
                }, 3000);
            } catch (error) {
                console.error('Error loading Rationale Content:', error);
                toggleIsLoading(false);
            }
        }
        toggleIsLoading(true);
        fetchContent();
    }, [contentUrl]);

    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="md"
            title={title}
        >
            <Box
                className={`${classes.infinize__rationaleViewerContainer} ${
                    !isOriginalAiRecommendation
                        ? classes.disclaimer
                        : classes.noDisclaimer
                }`}
            >
                <Box className={classes.infinize__rationaleViewerSubContainer}>
                    {isLoading && (
                        <Box display="flex" flexDirection="column" gap={2}>
                            {Array(2)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={`skeleton_${index}`}
                                        variant="rectangular"
                                        height={180}
                                    />
                                ))}
                        </Box>
                    )}

                    {!isLoading && <MarkdownViewer markdownContent={content} />}
                </Box>
                {!isLoading && !isOriginalAiRecommendation && (
                    <Box
                        className={
                            classes.infinize__rationaleDisclaimerContainer
                        }
                    >
                        <Typography
                            className={
                                classes.infinize__rationaleDisclaimerHeading
                            }
                        >
                            Disclaimer :
                        </Typography>
                        <Typography
                            className={
                                classes.infinize__rationaleDisclaimerText
                            }
                        >
                            This AI-generated rationale reflects the original
                            course plan generated based on current student
                            preferences and academic data. If you’ve made any
                            manual changes or customizations to the plan, the
                            rationale shown here may no longer fully align with
                            the modified version.
                        </Typography>
                    </Box>
                )}
            </Box>
        </InfinizeDialog>
    );
}
