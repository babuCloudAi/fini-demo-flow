'use client';
import {useState} from 'react';
import {Box, Stack, Typography, Button} from '@mui/material';
import {
    InfinizeConfirmation,
    InfinizeDialog,
    RationaleDialog
} from '../../common';
import TermCard from './termCard';
import AdditionalRecommendations from '../create/recommendations/additionalRecommendations';
import RecommendationsData from '@/data/coursePlan/recommendations.json';
import CoursePlanMenu from './coursePlanMenu';
import classes from '../coursePlan.module.css';
import {useTheme} from '@mui/material/styles';
import EditPlanDialog from './editPlanDialog';

export default function CoursePlan({plan, termsToBeHidden}) {
    const theme = useTheme();
    const [isRationaleDialogOpen, setIsRationaleDialogOpen] = useState(false);
    const [isRecommendationsDialogOpen, setIsRecommendationsDialogOpen] =
        useState(false);
    const [isRecommendationsLoading, setIsRecommendationsLoading] =
        useState(false);
    const [additionalRecommendations, setAdditionalRecommendations] =
        useState();

    const [isDeletePlanDialogOpen, setIsDeletePlanDialogOpen] = useState(false);
    const [isEditPlanDialogOpen, setIsEditPlanDialogOpen] = useState(false);

    const toggleIsRationaleDialogOpen = () =>
        setIsRationaleDialogOpen(prev => !prev);

    const toggleIsRecommendationsDialogOpen = () =>
        setIsRecommendationsDialogOpen(prev => !prev);

    const toggleIsRecommendationsLoading = () =>
        setIsRecommendationsLoading(prev => !prev);

    const toggleIsDeletePlanDialogOpen = () =>
        setIsDeletePlanDialogOpen(prev => !prev);

    const toggleIsEditPlanDialogOpen = () => {
        setIsEditPlanDialogOpen(prev => !prev);
    };

    const handleRecommendationsDialogOpen = async () => {
        toggleIsRecommendationsLoading();
        toggleIsRecommendationsDialogOpen();

        setTimeout(() => {
            setAdditionalRecommendations(RecommendationsData.recommendations);
            toggleIsRecommendationsLoading();
        }, 2000); // TODO remove this logic after API integration.
    };

    const handleDeletePlan = () => {
        toggleIsDeletePlanDialogOpen();
        // TODO: Add delete logic once API is available
    };

    return (
        <Box className={classes.infinize__coursePlanTermsContainer}>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                spacing={2}
                pt={2}
            >
                <Stack
                    width={'100%'}
                    direction={{sm: 'column', md: 'row'}}
                    alignItems={{
                        md: 'center',
                        sm: 'flex-start'
                    }}
                    justifyContent={'space-between'}
                    spacing={2}
                >
                    <Typography
                        flexGrow={1}
                        className={
                            classes.infinize__coursePlanTermsContainerTotalCredits
                        }
                    >
                        Total Credits: {plan.totalCredits}
                    </Typography>
                    <Button
                        style={{
                            color: theme.palette.primary.main
                        }}
                        onClick={() => toggleIsRationaleDialogOpen()}
                        className={classes.infinize__coursePlanTabButton}
                    >
                        View Rationale
                    </Button>

                    <Button
                        style={{
                            color: theme.palette.primary.main
                        }}
                        onClick={() => handleRecommendationsDialogOpen()}
                        className={classes.infinize__coursePlanTabButton}
                    >
                        Additional Recommendations
                    </Button>
                </Stack>

                <CoursePlanMenu
                    onDelete={handleDeletePlan}
                    onEdit={toggleIsEditPlanDialogOpen}
                />
            </Stack>

            <Box className={classes.infinize__coursePlanLandingCards}>
                {plan.terms
                    .filter(term => !termsToBeHidden.includes(term.code))
                    .map((term, idx) => (
                        <TermCard key={term.code} term={term} />
                    ))}
            </Box>

            {isRationaleDialogOpen && (
                <RationaleDialog
                    isOpen
                    onClose={toggleIsRationaleDialogOpen}
                    title="AI rationale for generated course plan"
                    contentUrl="/coursePlan/rationaleContent.md"
                    isOriginalAiRecommendation={plan.isOriginalAiRecommendation}
                />
            )}

            {isRecommendationsDialogOpen && (
                <InfinizeDialog
                    isOpen
                    onClose={toggleIsRecommendationsDialogOpen}
                    maxWidth="sm"
                >
                    <AdditionalRecommendations
                        customStyles={{width: '100%', height: '70vh'}}
                        isEditMode={false}
                        additionalRecommendations={additionalRecommendations}
                        isLoading={isRecommendationsLoading}
                    />
                </InfinizeDialog>
            )}

            {isDeletePlanDialogOpen && (
                <InfinizeConfirmation
                    isOpen
                    onClose={toggleIsDeletePlanDialogOpen}
                    onConfirm={handleDeletePlan}
                    primaryButtonLabel="Continue"
                    title="Confirm Course Plan Deletion"
                    content={
                        <>
                            Are you sure you want to delete the course plan
                            titled{' '}
                            <Typography component="span" fontWeight={500}>
                                "{plan.name}"?
                            </Typography>{' '}
                            This action is permanent and cannot be undone.
                        </>
                    }
                />
            )}

            {isEditPlanDialogOpen && (
                <EditPlanDialog
                    isOpen={isEditPlanDialogOpen}
                    onClose={toggleIsEditPlanDialogOpen}
                    isEditPlanDialogOpen={toggleIsEditPlanDialogOpen}
                    termsToBeHidden={termsToBeHidden}
                />
            )}
        </Box>
    );
}
