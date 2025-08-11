'use client';
import {useState, useEffect} from 'react';
import {Stack, Typography, IconButton, Box, Button} from '@mui/material';
import CareersList from './careersList';
import CareerDetails from './careerDetails';
import JobData from '@/data/careerRecommendation/careerRecommendations.json';
import styles from '../../career.module.css';
import {theme} from '@/config';
import Image from 'next/image';
import {InfinizeTooltip, Loader, RationaleDialog} from '@/components/common';
import SaveAllConfirmationDialog from './saveAllConfirmationDialog';
import {postData} from '@/dataAccess';
import {careerRecommendationsService} from '@/dataAccess';
import {useParams} from 'next/navigation';

export default function Recommendations({onRestart}) {
    const params = useParams();
    const studentId = params?.studentId;
    const [careerList, setCareerList] = useState([]);
    const [selectedCareerIndex, setSelectedCareerIndex] = useState(null);
    const [savedCareers, setSavedCareers] = useState([]);
    const [saveInProgressCareers, setSaveInProgressCareers] = useState([]);
    const [isRationaleDialogOpen, setIsRationaleDialogOpen] = useState(false);
    const [isSaveAllDialogOpen, setIsSaveAllDialogOpen] = useState(false);
    const [isSaveAllInProgress, setIsSaveAllInProgress] = useState(false);

    const careersCount = careerList.length - savedCareers.length;

    useEffect(() => {
        setCareerList(JobData.recommendations || []);
        if (JobData.recommendations.length > 0) {
            setSelectedCareerIndex(0);
        }
    }, []);

    const toggleIsRationaleDialog = () => {
        setIsRationaleDialogOpen(prev => !prev);
    };

    const toggleIsSaveAllDialog = () => {
        setIsSaveAllDialogOpen(prev => !prev);
    };

    const toggleIsSaveAllInProgress = () => {
        setIsSaveAllInProgress(prev => !prev);
    };

    /**
     * Saves a selected career plan for a specific student to the backend.
     *
     * - Adds the index to `saveInProgressCareers` to trigger a loading state in the UI.
     * - Constructs a custom payload with only the required fields in the expected format.
     * - Sends a POST request to save the career plan.
     * - On success, adds the index to `savedCareers` to indicate it was saved.
     * - In all cases (success or failure), removes the index from `saveInProgressCareers` to stop the loader.
     *
     * @param {object} career - The career plan object to be saved.
     * @param {number} index - The index of the career plan in the `careerList`.
     */

    const handleSaveCareer = async (career, index) => {
        try {
            sessionStorage.setItem('hasCareerRecommendations', 'true');
            // Mark this career as saving (show loader)
            setSaveInProgressCareers(prev => [...prev, index]);

            // Build custom payload
            const payload = {
                careerPlanName: career.title,
                careerPlanDescription: career.description,
                rolesAndResponsibilities: career.roles,
                match: career.match,
                careerRecommendations: career.careerRecommendations
            };

            await careerRecommendationsService.saveCareer(studentId, payload);

            //  Mark as saved on success
            setSavedCareers(prev => [...prev, index]);
        } catch (error) {
            console.error('Failed to save career:', error);
        } finally {
            setSaveInProgressCareers(prev => prev.filter(i => i !== index));
        }
    };

    /**
     * Saves all unsaved careers for the student.
     *
     * This function:
     * 1. Identifies careers in `careerList` that are not yet saved, by comparing their indexes with `savedCareers`.
     * 2. Closes the "Save All" confirmation dialog.
     * 3. Sets a global `isSaveAllInProgress` flag to show a loading indicator.
     * 4. Constructs a payload from the unsaved careers, including metadata like title, description, roles, match score, and recommendations.
     * 5. Sends the payload to the backend via `postData`.
     * 6. Updates the `savedCareers` list with newly saved career indexes.
     * 7. Handles any errors during the save process and ensures the loading state is cleared in the `finally` block.
     *
     * This implementation avoids showing individual loaders per career item and instead shows a global loader.
     *
     * @async
     * @function handleSaveAllCareers
     * @returns {Promise<void>}
     */
    const handleSaveAllCareers = async () => {
        sessionStorage.setItem('hasCareerRecommendations', 'true');
        toggleIsSaveAllDialog();
        toggleIsSaveAllInProgress();
        try {
            const {unsavedCareers, savingIndexes} = careerList.reduce(
                (acc, career, index) => {
                    if (!savedCareers.includes(index)) {
                        acc.unsavedCareers.push(career);
                        acc.savingIndexes.push(index);
                    }
                    return acc;
                },
                {unsavedCareers: [], savingIndexes: []}
            );

            const payload = unsavedCareers.map(career => ({
                careerPlanName: career.title,
                careerPlanDescription: career.description,
                rolesAndResponsibilities: career.roles,
                match: career.match,
                careerRecommendations: career.careerRecommendations
            }));

            await careerRecommendationsService.saveAllCareers(
                studentId,
                payload
            );

            setSavedCareers(prev => [...prev, ...savingIndexes]);
        } catch (error) {
            console.error('Failed to save all careers:', error);
        } finally {
            toggleIsSaveAllInProgress();
        }
    };

    return (
        <Stack
            className={styles.infinize__careerRecommendationsContainer}
            mt={3}
        >
            <Box
                className={
                    styles.infinize__careerRecommendationsContainerHeading
                }
            >
                <Typography variant="h2" color="primary">
                    Career recommendations
                </Typography>
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={3}
                >
                    <Button
                        className={styles.infinize__viewRationale}
                        onClick={e => {
                            e.preventDefault();
                            toggleIsRationaleDialog();
                        }}
                    >
                        View Rationale
                    </Button>
                    <Button
                        variant="contained"
                        className="infinize__button"
                        onClick={toggleIsSaveAllDialog}
                    >
                        Save All
                    </Button>
                    <InfinizeTooltip title="Restart">
                        <IconButton
                            onClick={onRestart}
                            sx={{
                                border: `2px solid ${theme.palette.primary.main}`,
                                borderRadius: '8px'
                            }}
                        >
                            <Image
                                src="/img/restart.svg"
                                width={30}
                                height={30}
                                alt="regenarate-icon"
                            />
                        </IconButton>
                    </InfinizeTooltip>
                </Box>
            </Box>

            <Stack
                direction={{md: 'column', lg: 'row'}}
                padding="20px 30px"
                gap={3}
            >
                <CareersList
                    careers={careerList}
                    selectedCareerIndex={selectedCareerIndex}
                    onCareerSelect={setSelectedCareerIndex}
                    isSaved={index => savedCareers.includes(index)}
                    isSaving={index => saveInProgressCareers.includes(index)}
                    onSave={(career, index) => handleSaveCareer(career, index)}
                />

                {selectedCareerIndex !== null &&
                    careerList[selectedCareerIndex] && (
                        <CareerDetails
                            career={careerList[selectedCareerIndex]}
                            isSaved={savedCareers.includes(selectedCareerIndex)}
                            isSaving={saveInProgressCareers.includes(
                                selectedCareerIndex
                            )}
                            onSave={() =>
                                handleSaveCareer(
                                    careerList[selectedCareerIndex],
                                    selectedCareerIndex
                                )
                            }
                            isEditable={true}
                        />
                    )}
                {isRationaleDialogOpen && (
                    <RationaleDialog
                        isOpen={isRationaleDialogOpen}
                        onClose={toggleIsRationaleDialog}
                        title="AI rationale for generated career recommendations"
                        contentUrl="/careerRecommendations/rationaleContent.md"
                    />
                )}
            </Stack>
            {isSaveAllInProgress && <Loader isOpen={isSaveAllInProgress} />}
            {isSaveAllDialogOpen && (
                <SaveAllConfirmationDialog
                    isOpen={isSaveAllDialogOpen}
                    onClose={toggleIsSaveAllDialog}
                    onConfirm={handleSaveAllCareers}
                    careersCount={careersCount}
                />
            )}
        </Stack>
    );
}
