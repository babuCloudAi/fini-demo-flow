'use client';
import {useState, useEffect} from 'react';
import {Typography, Box, Stack, useTheme, Button} from '@mui/material';
import {
    InfinizeIcon,
    RationaleDialog,
    InfinizeConfirmation,
    TextInput
} from '../../../common';
import classes from '../../coursePlan.module.css';
import TermsAccordion from './termsAccordion';
import CoursePlanMenu from './coursePlanMenu';
import AddTermDialog from './addTermDialog';

export default function CoursePlan({
    coursePlan = {},
    onRestart,
    onReset,
    addBannerToQueue,
    termsList,
    setTermsList,
    highlightedCourses,
    setHighlightedCourses,
    totalCredits,
    setTotalCredits,
    isOriginalAiRecommendation,
    setIsOriginalAiRecommendation,
    isEditMode,
    courseMap,
    termMap,
    coursesList,
    coursePlanName,
    setCoursePlanName,
    termsToBeHidden,
    onPlanChange,
    courseToResolve,
    setCourseToResolve,
    bannerQueue,
    setBannerQueue,
    highlightedTermCodes,
    setHighlightedTermCodes,
    resetHighlightedCourses
}) {
    const theme = useTheme();

    const [expanded, setExpanded] = useState({});
    const [isRationaleDialogOpen, setIsRationaleDialogOpen] = useState(false);
    const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [isAddTermDialogOpen, setIsAddTermDialogOpen] = useState(false);

    const toggleIsRationaleDialogOpen = () => {
        setIsRationaleDialogOpen(prev => !prev);
    };

    const toggleExpanded = termKey => {
        setExpanded(prev => ({
            ...prev,
            [termKey]: !prev[termKey]
        }));
    };

    const toggleIsRestartDialogOpen = () => {
        setIsRestartDialogOpen(prev => !prev);
    };

    const toggleIsResetDialogOpen = () => {
        setIsResetDialogOpen(prev => !prev);
    };

    const toggleIsAddTermDialogOpen = () => {
        setIsAddTermDialogOpen(prev => !prev);
    };

    const toggleAccordion = (term, termIndex) => {
        toggleExpanded(`${term}_${termIndex}`);
    };

    const expandAll = () => {
        const newExpandedState = {};
        termsList.forEach((term, termIndex) => {
            newExpandedState[`${term.code}_${termIndex}`] = true;
        });
        setExpanded(newExpandedState);
    };

    const collapseAll = () => {
        const newExpandedState = {};
        termsList.forEach((term, termIndex) => {
            newExpandedState[`${term.code}_${termIndex}`] = false;
        });
        setExpanded(newExpandedState);
    };

    const handleResetConfirmation = () => {
        toggleIsResetDialogOpen();
        onReset();
    };

    const handleRestartConfirmation = () => {
        toggleIsRestartDialogOpen();
        onRestart();
    };

    const handleTermAdd = term => {
        toggleIsAddTermDialogOpen();
        const newTerm = {
            ...term,
            courses: [] // Initialize with empty courses array
        };
        setTermsList(prev => [...prev, newTerm]);
        setIsOriginalAiRecommendation(false);
    };

    useEffect(() => {
        const terms = termsList ?? [];
        if (terms.length > 0) {
            const key = `${terms[0].code}_0`;
            setExpanded({[key]: true});
        }
    }, [coursePlan]);

    return (
        <Box className={classes.infinize__coursePlanCard}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className={classes.infinize__coursePlanCardMenu}
            >
                {!isEditMode && (
                    <Button
                        onClick={e => {
                            e.preventDefault();
                            toggleIsRationaleDialogOpen();
                        }}
                        className={
                            classes.infinize__coursePlanCardRationaleLink
                        }
                    >
                        View Rationale
                    </Button>
                )}

                <CoursePlanMenu
                    onExpandAll={expandAll}
                    onCollapseAll={collapseAll}
                    onAddTerm={toggleIsAddTermDialogOpen}
                    onReset={toggleIsResetDialogOpen}
                    onRestart={toggleIsRestartDialogOpen}
                    isEditMode={isEditMode}
                />
            </Stack>

            <Box className="infinize__IconOuter">
                <InfinizeIcon
                    icon="fluent:hat-graduation-sparkle-24-filled"
                    style={{color: theme.palette.primary.main}}
                />
            </Box>

            {isEditMode && (
                <Box sx={{margin: '20px 0'}}>
                    <TextInput
                        name="planName"
                        label="Enter Plan Name"
                        value={coursePlanName}
                        onChange={setCoursePlanName}
                    />
                </Box>
            )}
            {!isEditMode && (
                <Typography variant="h2" color="primary">
                    Plan
                </Typography>
            )}

            <Typography className={classes.infinize__coursePlanTotalCredits}>
                Total Credits: {totalCredits}
            </Typography>

            {termsList.map((term, termIndex) => (
                <TermsAccordion
                    key={termIndex}
                    term={term}
                    termIndex={termIndex}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    toggleAccordion={toggleAccordion}
                    termsList={termsList}
                    setTermsList={setTermsList}
                    addBannerToQueue={addBannerToQueue}
                    coursePlan={coursePlan}
                    highlightedCourses={highlightedCourses}
                    setHighlightedCourses={setHighlightedCourses}
                    totalCredits={totalCredits}
                    setTotalCredits={setTotalCredits}
                    isOriginalAiRecommendation={isOriginalAiRecommendation}
                    setIsOriginalAiRecommendation={
                        setIsOriginalAiRecommendation
                    }
                    courseMap={courseMap}
                    termMap={termMap}
                    coursesList={coursesList}
                    termsToBeHidden={termsToBeHidden}
                    isEditMode={isEditMode}
                    onPlanChange={onPlanChange}
                    courseToResolve={courseToResolve}
                    setCourseToResolve={setCourseToResolve}
                    setBannerQueue={setBannerQueue}
                    highlightedTermCodes={highlightedTermCodes}
                    setHighlightedTermCodes={setHighlightedTermCodes}
                    resetHighlightedCourses={resetHighlightedCourses}
                    bannerQueue={bannerQueue}
                />
            ))}

            {isRationaleDialogOpen && (
                <RationaleDialog
                    isOpen={isRationaleDialogOpen}
                    onClose={() => toggleIsRationaleDialogOpen()}
                    title="AI rationale for generated course plan"
                    contentUrl="/coursePlan/rationaleContent.md"
                    isOriginalAiRecommendation={isOriginalAiRecommendation}
                />
            )}

            {/* Reset Dialog */}
            {isResetDialogOpen && (
                <InfinizeConfirmation
                    isOpen
                    onClose={toggleIsResetDialogOpen}
                    onConfirm={handleResetConfirmation}
                    primaryButtonLabel="Reset"
                    title="Confirm Reset"
                    content="All changes made so far will be permanently lost. Are you sure you want to reset?"
                />
            )}

            {/* Restart Dialog */}
            {isRestartDialogOpen && (
                <InfinizeConfirmation
                    isOpen
                    onClose={toggleIsRestartDialogOpen}
                    primaryButtonLabel="Continue"
                    onConfirm={handleRestartConfirmation}
                    title="Restart Course Plan"
                    content="To provide an updated course plan, you will be taken back to the preferences page to adjust your inputs. All changes made so far will be lost. Do you wish to continue?"
                />
            )}

            {/* Add Term Dialog */}
            {isAddTermDialogOpen && (
                <AddTermDialog
                    isOpen
                    onClose={toggleIsAddTermDialogOpen}
                    onAddTerm={handleTermAdd}
                    termMap={termMap}
                />
            )}
        </Box>
    );
}
