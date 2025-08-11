'use client';
import {useState} from 'react';
import {CareerPreferencesForm} from './form';
import {Box} from '@mui/material';
import Recommendations from '../generate/recommendations';
import {Loader, Reasoning} from '@/components/common';

export default function GenerateCareerRecommendations() {
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showReasoning, setShowReasoning] = useState(false);
    const [reasoning, setReasoning] = useState('');
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const [isInProgress, setIsInProgress] = useState(false);

    const toggleShowRecommendations = value => {
        setShowRecommendations(value);
    };
    const toggleIsInProgress = () => {
        setIsInProgress(prev => !prev);
    };
    const toggleShowReasoning = value => {
        setShowReasoning(value);
    };

    // Fetch the markdown file
    async function fetchReasoning() {
        try {
            const res = await fetch('/careerRecommendations/reasoning.md'); // Path to the markdown file in the public folder
            const text = await res.text();
            setReasoning(text);
        } catch (error) {
            console.error('Error loading markdown content:', error);
        }
    }

    const handleGenerate = () => {
        toggleIsInProgress();
        //    TODO remove it once API integration is done.
        setTimeout(() => {
            toggleShowReasoning(false);
            toggleIsInProgress();
            toggleShowRecommendations(true);
        }, 3000);
    };

    const handleRestart = () => {
        //    TODO remove it once API integration is done.
        toggleIsInProgress();
        setTimeout(() => {
            toggleIsInProgress();
            toggleShowRecommendations(false);
            toggleShowReasoning(false);
        }, 3000);
    };

    const handleSubmitPreferences = async () => {
        await fetchReasoning(); // Wait for reasoning to be fetched
        toggleShowReasoning(true); // Show the reasoning dialog after fetching
    };

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
            setAdditionalInstructions(''); // Clear context after successful fetch
        } catch (err) {
            console.error('Reasoning fetch failed', err);
        } finally {
            toggleIsInProgress(); // End the in-progress state
        }
    };

    return (
        <Box>
            {showReasoning && (
                <>
                    {isInProgress && <Loader isOpen={isInProgress} />}
                    <Reasoning
                        title={'Career Recommendation AI Reasoning'}
                        onGeneratePlan={handleGenerate}
                        reasoning={reasoning}
                        additionalInstructions={additionalInstructions}
                        onRegenerate={handleModifyPlan}
                        onAdditionalInstructionsChange={val =>
                            setAdditionalInstructions(val)
                        }
                        generateButtonLabel={'Generate Careers'}
                        regenerateButtonLabel={'Regenerate Careers'}
                    />
                </>
            )}
            {showRecommendations && (
                <Recommendations onRestart={handleRestart} />
            )}

            {!showReasoning && !showRecommendations && (
                <CareerPreferencesForm
                    onSubmitPreferences={handleSubmitPreferences}
                />
            )}
        </Box>
    );
}
