'use client';
import {useEffect, useState, useRef} from 'react';
import {Box, Stack, Skeleton, Button} from '@mui/material';
import {Loader, NoResults, Widget} from '@/components/common';
import CareersListView from './careersListView';
import {useParams, useRouter} from 'next/navigation';
import UploadResumeDialog from './uploadResumeDialog';
import {careerRecommendationsService} from '@/dataAccess';

export default function CareerRecommendations() {
    const router = useRouter();
    const params = useParams(); // returns an object of dynamic params
    const studentId = params?.studentId;
    const [expanded, setExpanded] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [careerRecommendations, setCareerRecommendations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [isInProgress, setIsInProgress] = useState(false);

    const hasLoaded = useRef(false);

    /**
     * Fetch career recommendations for the given student.
     *
     * This function:
     * 1) Calls the GET API to retrieve saved career recommendations
     * 2) If the API returns errors, logs them and stops further processing.
     * 3) If successful, updates the local state with the fetched data.
     * 4) Catches and logs any unexpected request errors.
     */
    const loadSavedCareers = async () => {
        try {
            // Call API to get career recommendations for studentId
            const res = await careerRecommendationsService.fetchCareers(
                studentId
            );
            // If data is present, update state
            if (res.data) {
                setCareerRecommendations(res.data);
            }
        } catch (err) {
            // Log any request-level errors
            console.log('Error fetching saved searches:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResumeUpload = file => {
        setResumeFile(file);
    };

    const handleContinue = () => {
        setIsLoading(true); // Show a loading indicator immediately
        // Add a slight delay before navigation to simulate processing
        setTimeout(() => {
            // Navigate to the career recommendations page and pass a query param indicating file was uploaded
            router.push(
                `/student/${studentId}/careerRecommendations?isResumeUploaded =true`
            );
        }, 2000);
    };

    // Triggered when the user clicks "Cancel"
    const handleCancel = () => {
        // Navigate to the same destination but indicate the file was *not* uploaded
        router.push(
            `/student/${studentId}/careerRecommendations?isResumeUploaded =false`
        );
    };

    /**
     * Deletes a selected career recommendation for a student.
     *
     * - Extracts `STUDENT_UID` and `CREATED_AT_PLAN_ID` from the selected career object.
     * - Sends a DELETE request to remove the career plan from the backend.
     * - On success, re-fetches the saved career list from the server to reflect the change in the UI.
     * - Handles errors gracefully and ensures the loading state is cleared.
     *
     * @param {object} selectedCareer - The career item to be deleted.
     */
    const handleDeleteCareer = async selectedCareer => {
        setIsInProgress(true);
        try {
            // Get the selected career's identifiers
            const {STUDENT_UID, CREATED_AT_PLAN_ID} = selectedCareer;

            // Call API to delete the selected career plan
            await careerRecommendationsService.deleteCareer(
                STUDENT_UID,
                CREATED_AT_PLAN_ID
            );

            // Re-fetch the latest list from server (source of truth)
            await loadSavedCareers();
        } catch (error) {
            console.error('Failed to delete career:', error);
        } finally {
            setIsInProgress(false);
        }
    };

    useEffect(() => {
        if (!hasLoaded.current) {
            hasLoaded.current = true;
            loadSavedCareers();
        }
    }, []);

    const handleAccordionChange = () => {
        setExpanded(prev => !prev);
    };

    const handleViewAll = e => {
        e.stopPropagation();
    };
    const handleGenerateCareer = e => {
        e.stopPropagation();
        setIsOpen(true);
    };

    return (
        <Box>
            <Widget
                expanded={expanded}
                onChange={handleAccordionChange}
                title="Career Recommendations"
                actions={
                    !isLoading && careerRecommendations.length > 0 ? (
                        careerRecommendations.length > 3 ? (
                            <Stack direction="row" gap={2}>
                                <Button
                                    variant="outlined"
                                    onClick={handleViewAll}
                                    className="infinize__Button"
                                >
                                    View All
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleGenerateCareer}
                                    className="infinize__Button"
                                >
                                    Generate
                                </Button>
                            </Stack>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleGenerateCareer}
                                className="infinize__Button"
                            >
                                Generate
                            </Button>
                        )
                    ) : null
                }
            >
                <Box padding={2}>
                    {isLoading && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={100}
                        />
                    )}
                    {!isLoading && careerRecommendations.length > 0 && (
                        <CareersListView
                            careers={careerRecommendations}
                            onDelete={handleDeleteCareer}
                        />
                    )}
                    {!isLoading && careerRecommendations.length == 0 && (
                        <NoResults
                            title="There are no career recommendations"
                            description="Get started by exploring career paths that align with your interests and goals"
                            buttonLabel="Generate"
                            onClick={handleGenerateCareer}
                        />
                    )}
                    <UploadResumeDialog
                        resumeFile={resumeFile}
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onContinue={handleContinue}
                        onSkip={handleCancel}
                        onResumeUpload={handleResumeUpload}
                        isLoading={isLoading}
                    />
                </Box>
            </Widget>
            {isInProgress && <Loader isOpen={isInProgress} />}
        </Box>
    );
}
