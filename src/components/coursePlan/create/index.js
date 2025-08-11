'use client';
import {useState, useEffect} from 'react';
import {Typography, Box} from '@mui/material';
import classes from './createCoursePlan.module.css';
import CoursePlanForm from './form';
import {Loader, Reasoning} from '@/components/common';
import CoursePlanRecommendations from './recommendations';

export default function CreateCoursePlan() {
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [showReasoning, setShowReasoning] = useState(false);
    const [reasoning, setReasoning] = useState('');
    const [additionalInstructions, setAditionalInstructions] = useState('');

    const handleGeneratePlan = () => {
        toggleShowRecommendations();
        toggleShowReasoning();
    };

    const toggleShowRecommendations = () => {
        setShowRecommendations(prev => !prev);
    };

    const toggleShowReasoning = value => {
        setShowReasoning(value);
    };

    const toggleIsInProgress = () => {
        setIsInProgress(prev => !prev);
    };

    const handleCreate = () => {
        // TODO: Remove this simulation block once actual API integration is implemented

        // Simulate the start of an API call
        toggleIsInProgress();

        // Simulate an API response delay using setTimeout
        setTimeout(() => {
            // Show the reasoning
            toggleShowReasoning(true);

            // Stop the loading indicator after the simulated delay
            toggleIsInProgress();
        }, 1500);
    };

    const handleRestart = () => {
        // TODO: When restart, show the form again with filled data.
        toggleIsInProgress();
        setTimeout(() => {
            setShowRecommendations(false); // Hide recommendations
            toggleIsInProgress(); // Stop loading after 1.5 seconds
        }, 1500);
    };

    useEffect(() => {
        if (showReasoning) {
            window.scrollTo(0, 0); // Automatically scroll to the top when AI recommendations are shown
        }
    }, [showReasoning]); // Runs only when showReasoning changes

    // Fetch the markdown file
    async function fetchReasoning() {
        try {
            const res = await fetch('/coursePlan/reasoning.md'); // Path to the markdown file in the public folder
            const text = await res.text();
            setReasoning(text);
        } catch (error) {
            console.error('Error loading markdown content:', error);
        }
    }
    useEffect(() => {
        fetchReasoning();
    }, []);

    const handleModifyPlan = async () => {
        // TODO: Remove once API integration is done.
        toggleIsInProgress(); // Start the in-progress state immediately

        try {
            // Scroll to top after reasoning is fetched
            window.scrollTo({top: 0, behavior: 'smooth'});

            // Add a 2-second delay before calling fetchReasoning
            await new Promise(resolve => setTimeout(resolve, 2000));

            setReasoning(''); // Clear previous reasoning
            await fetchReasoning(); // Fetch new reasoning data

            // Only clear the context if reasoning fetch is successful
            setAditionalInstructions(''); // Clear context after successful fetch
        } catch (err) {
            console.error('Reasoning fetch failed', err);
        } finally {
            toggleIsInProgress(); // End the in-progress state
        }
    };

    return (
        <Box>
            <>
                {isInProgress && <Loader isOpen={isInProgress} />}
                {showReasoning && (
                    <Reasoning
                        title={'Course Plan AI Reasoning'}
                        onGeneratePlan={handleGeneratePlan}
                        reasoning={reasoning}
                        additionalInstructions={additionalInstructions}
                        onRegenerate={handleModifyPlan}
                        onAdditionalInstructionsChange={val =>
                            setAditionalInstructions(val)
                        }
                        generateButtonLabel={'Generate Plan'}
                        regenerateButtonLabel={'Regenerate Plan'}
                    />
                )}
            </>
            {!showReasoning && !showRecommendations && (
                <Box className={classes.infinize__createCoursePlan__container}>
                    <Loader isOpen={isInProgress} />
                    <Typography
                        variant="h5"
                        gutterBottom
                        color="primary.main"
                        className={classes.infinize__createCoursePlan__title}
                    >
                        Create a Customized Course Plan
                    </Typography>
                    <CoursePlanForm onCreate={handleCreate} />
                </Box>
            )}
            {showRecommendations && (
                <CoursePlanRecommendations onRestart={handleRestart} />
            )}
        </Box>
    );
}
