'use client';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Stack,
    IconButton,
    useTheme
} from '@mui/material';
import {InfinizeIcon} from '../../../common';
import classes from '../../coursePlan.module.css';
import {useState, useEffect, useCallback} from 'react';
import AddCourse from './addCourse';
import CourseAccordion from './courseAccordion';
import {
    checkScheduleConflict,
    getCourseKey,
    getTotalCredits,
    useHighlightCourses
} from './utils';
import DeleteTermDialog from './deleteTermDialog';
import {
    validateScheduleConflicts,
    validateTotalPlanCredits
} from './validations';
import {CONFLICT_TYPE} from '@/config/constants';
export default function TermsAccordion({
    coursePlan,
    term,
    termIndex,
    expanded,
    setExpanded,
    toggleAccordion,
    termsList,
    addBannerToQueue,
    highlightedCourses,
    setHighlightedCourses,
    totalCredits,
    courseMap,
    termMap,
    coursesList,
    termsToBeHidden,
    isEditMode,
    onPlanChange,
    setCourseToResolve,
    bannerQueue,
    setBannerQueue,
    highlightedTermCodes,
    setHighlightedTermCodes,
    resetHighlightedCourses
}) {
    const theme = useTheme();
    const [isAddCourseSectionOpen, setIsAddCourseSectionOpen] = useState(false);
    const [selectedNewCourse, setSelectedNewCourse] = useState(null);
    const [isTermDeleteDialogOpen, setIsTermDeleteDialogOpen] = useState(false);
    const [termToDelete, setTermToDelete] = useState('');

    const highlightCourses = useHighlightCourses(
        setHighlightedCourses,
        setHighlightedTermCodes
    );
    const processed = {
        creditConflicts: new Set()
    };

    const toggleIsAddCourseSectionOpen = () => {
        setIsAddCourseSectionOpen(prev => !prev);
    };

    const toggleIsTermDeleteDialogOpen = () => {
        setIsTermDeleteDialogOpen(prev => !prev);
    };

    const handleTermDelete = (event, term) => {
        event.stopPropagation();
        toggleIsTermDeleteDialogOpen();
        setTermToDelete(term.code);
    };

    /**
     * Confirm deletion of a term from the plan.
     *
     * - Removes the selected term from the list.
     * - Updates the total plan credits.
     * - If the new total credits are below the minimum required,
     *   validates and shows a warning banner (if not already shown).
     * - Calls the parent callback to update the plan.
     * - Closes the delete confirmation dialog.
     * - Clears the term-to-delete state.
     *
     * @function handleTermDeleteConfirmation
     */
    const handleTermDeleteConfirmation = () => {
        // Close the delete confirmation dialog immediately
        toggleIsTermDeleteDialogOpen();
        setSelectedNewCourse(null);
        toggleIsAddCourseSectionOpen();
        // Initialize the updated total credits and minimum requirement
        let updatedTotalCredits = totalCredits;
        let minimumTotalCredits = coursePlan.minimumTotalCredits;
        const updatedTerms = [];

        // Rebuild the terms list without the term to delete,
        // and adjust total credits accordingly
        for (const term of termsList) {
            if (term.code === termToDelete) {
                updatedTotalCredits -= term.termCredits ?? 0;
            } else {
                updatedTerms.push(term);
            }
        }

        // Call the parent callback to update the plan with new terms and credits
        onPlanChange({
            terms: updatedTerms,
            totalCredits: updatedTotalCredits,
            isOriginalAiRecommendation: false
        });

        // Validate if total credits fall below the minimum and show a banner if needed
        const totalCreditsBanner = validateTotalPlanCredits(
            updatedTotalCredits,
            minimumTotalCredits,
            processed.creditConflicts
        );

        // Add the low credits banner to the queue only if it's not already processed
        if (
            totalCreditsBanner &&
            !processed.creditConflicts.has(totalCreditsBanner.id)
        ) {
            addBannerToQueue(totalCreditsBanner);
            processed.creditConflicts.add(totalCreditsBanner.id);
        }

        // Reset the term-to-delete state
        setTermToDelete('');
    };

    const removeBannersByConflictKeys = conflictKeys => {
        setBannerQueue(prevQueue =>
            prevQueue.filter(
                banner =>
                    !banner.data?.conflictKeys?.some(key =>
                        conflictKeys.includes(key)
                    )
            )
        );
    };

    /**
     * Handles adding a newly selected course to a specific term in the course plan.
     *
     * This function performs the following steps:
     *
     * 1. Builds a new course object based on the `selectedNewCourse` state.
     * 2. Appends the new course to the corresponding term (matching `selectedTermCode`)
     *    and updates that term’s credit count.
     * 3. Recalculates the total plan credits after the addition.
     * 4. Updates the full course plan state by invoking `onPlanChange`.
     * 5. Validates schedule conflicts for the newly added course:
     *    - If any direct or fully connected group conflicts are detected,
     *      appropriate conflict banners are generated.
     *    - If a fully connected conflict group is detected (e.g., A–B–C),
     *      any existing pairwise conflict banners (e.g., A–B, B–C) are removed
     *      and replaced with the group-level banner.
     *    - Conflict banners are queued with relevant click/resolve handlers.
     * 6. Resets the new course input and closes the course addition UI section.
     *
     * @param {Object} selectedCourse - The course selected by the user (unused in logic, but included for consistency).
     * @param {string} selectedTermCode - The term code of the term to which the course should be added.
     */

    const handleAddCourse = (selectedCourse, selectedTermCode) => {
        if (!selectedCourse) return;

        // Build the new course object using selectedNewCourse
        const newCourse = {
            subject: selectedNewCourse.subject,
            courseNumber: selectedNewCourse.courseNumber,
            courseTitle: selectedNewCourse.courseTitle,
            credits: selectedNewCourse.credits,
            description: selectedNewCourse.description,
            schedule: selectedNewCourse.schedule
        };

        // Add the course to the selected term and update its credits
        const updatedTerms = termsList.map(term => {
            if (term.code === selectedTermCode) {
                const updatedCourses = [...(term.courses ?? []), newCourse];
                const updatedTermCredits =
                    (term.termCredits ?? 0) + newCourse.credits;

                return {
                    ...term,
                    courses: updatedCourses,
                    termCredits: updatedTermCredits
                };
            }
            return term;
        });

        // Recalculate total credits for the updated plan
        const updatedTotalCredits = getTotalCredits(updatedTerms);

        // Immediately update the plan state
        onPlanChange({
            terms: updatedTerms,
            totalCredits: updatedTotalCredits,
            isOriginalAiRecommendation: false
        });

        // Check for schedule conflicts in the updated plan
        const targetTerm = updatedTerms.find(
            term => term.code === selectedTermCode
        );
        const processed = {
            scheduleConflicts: new Set()
        };

        const scheduleBanners = validateScheduleConflicts(
            newCourse,
            targetTerm.courses,
            processed.scheduleConflicts,
            targetTerm
        );

        if (scheduleBanners) {
            for (const scheduleBanner of scheduleBanners) {
                // 🔁 Remove old conflicting pairwise banners if upgrading to a full group
                if (scheduleBanner.replaceConflictKeys) {
                    removeBannersByConflictKeys(
                        scheduleBanner.replaceConflictKeys
                    );
                }
                const conflictData = {
                    course: newCourse,
                    conflictingCourses: scheduleBanner.data.conflictingCourses,
                    termName: targetTerm.name,
                    termCode: targetTerm.code
                };

                scheduleBanner.onResolve = () => {
                    setCourseToResolve({
                        type: CONFLICT_TYPE.SCHEDULE_CONFLICT,
                        data: conflictData,
                        bannerId: scheduleBanner.id
                    });
                };

                scheduleBanner.onClick = () => {
                    resetHighlightedCourses();
                    highlightCourses(
                        conflictData.conflictingCourses.map(courseObj => ({
                            ...courseObj,
                            termCode: targetTerm.code
                        })),
                        [targetTerm.code]
                    );
                };

                addBannerToQueue(scheduleBanner);

                scheduleBanner.data.conflictKeys?.forEach(key =>
                    processed.scheduleConflicts.add(key)
                );
            }
        }

        // Reset input and close add course UI
        setSelectedNewCourse(null);
        toggleIsAddCourseSectionOpen();
    };

    /**
     * Expands the term accordions that correspond to highlighted courses.
     *
     * This effect runs whenever `highlightedTermCodes` or `termsList` change.
     * It updates the `expanded` state to ensure that accordions for terms
     * included in `highlightedTermCodes` are open.
     *
     * Each term is identified by its `code` and index, and the corresponding
     * expanded key is set to `true` if it matches a highlighted term.
     *
     * The previous expanded state is preserved for other terms (i.e., manual expansion),
     * and the state is only updated if there is an actual change in the expanded map.
     */
    useEffect(() => {
        const flatTermCodes =
            highlightedTermCodes.flat?.() ?? highlightedTermCodes;

        if (!flatTermCodes?.length) return;

        const updatedExpanded = {...expanded};

        flatTermCodes.forEach(code => {
            const termIndex = termsList.findIndex(term => term.code === code);
            if (termIndex !== -1) {
                updatedExpanded[`${code}_${termIndex}`] = true;
            }
        });

        setExpanded(prev => {
            const changed =
                JSON.stringify(prev) !== JSON.stringify(updatedExpanded);
            return changed ? updatedExpanded : prev;
        });
    }, [highlightedTermCodes, termsList]);

    return (
        <Accordion
            expanded={expanded[`${term.code}_${termIndex}`] ?? false}
            onChange={() => toggleAccordion(term.code, termIndex)}
            disableGutters
            sx={{
                mt: 1,
                width: '100%',
                boxShadow: 'none'
            }}
        >
            <AccordionSummary
                expandIcon={
                    <InfinizeIcon
                        icon={
                            expanded[`${term.code}_${termIndex}`]
                                ? 'lucide-circle-minus'
                                : 'lucide-circle-plus'
                        }
                        style={{color: theme.palette.primary.main}}
                        aria-hidden="true"
                    />
                }
                aria-controls={`term_content_${term.code}_${termIndex}`}
                id={`coursePlan__term_accordion_${termIndex}`}
                className={classes.infinize__coursePlanCardAccordion}
                tabIndex={0}
            >
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    justifyContent="space-between"
                    alignItems={{xs: 'flex-start', sm: 'center'}}
                    width="97%"
                >
                    <Typography
                        color="primary"
                        className={
                            classes.infinize__coursePlanCardAccordionTermName
                        }
                    >
                        {term.name}
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography
                            color="primary"
                            fontSize={12}
                            fontWeight={500}
                        >
                            {term.termCredits ?? 0} Credits
                        </Typography>
                        <IconButton
                            component="span"
                            onClick={event => handleTermDelete(event, term)}
                        >
                            <InfinizeIcon
                                icon="fluent-delete-24-filled"
                                style={{color: theme.palette.primary.main}}
                                width={'20px'}
                                height={'20px'}
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </AccordionSummary>

            <AccordionDetails
                id={`term_content_${term.code}_${termIndex}`}
                className={classes.infinize__coursePlanCardAccordionDetails}
                sx={{boxShadow: 'none'}}
            >
                {term?.courses?.map((course, courseIndex) => (
                    <CourseAccordion
                        key={courseIndex}
                        coursePlan={coursePlan}
                        course={course}
                        courseIndex={courseIndex}
                        term={term}
                        termIndex={termIndex}
                        termsList={termsList}
                        courseMap={courseMap}
                        termMap={termMap}
                        onPlanChange={onPlanChange}
                        highlightedCourses={highlightedCourses}
                        setHighlightedCourses={setHighlightedCourses}
                        addBannerToQueue={addBannerToQueue}
                        setCourseToResolve={setCourseToResolve}
                        highlightedTermCodes={highlightedTermCodes}
                        setHighlightedTermCodes={setHighlightedTermCodes}
                        resetHighlightedCourses={resetHighlightedCourses}
                        setBannerQueue={setBannerQueue}
                    />
                ))}

                {isAddCourseSectionOpen ? (
                    <AddCourse
                        courses={coursesList}
                        onCourseSelect={setSelectedNewCourse}
                        onAdd={() =>
                            handleAddCourse(selectedNewCourse, term.code)
                        }
                        onClose={toggleIsAddCourseSectionOpen}
                        selectedTerm={term}
                        termsList={termsList}
                        addBannerToQueue={addBannerToQueue}
                        termsToBeHidden={termsToBeHidden}
                        isEditMode={isEditMode}
                        setHighlightedCourses={setHighlightedCourses}
                        highlightedTermCodes={highlightedTermCodes}
                        setHighlightedTermCodes={setHighlightedTermCodes}
                        resetHighlightedCourses={resetHighlightedCourses}
                        setBannerQueue={setBannerQueue}
                        totalCredits={totalCredits}
                        coursePlan={coursePlan}
                    />
                ) : (
                    <Button
                        variant="text"
                        fullWidth
                        onClick={toggleIsAddCourseSectionOpen}
                        className={classes.infinize__coursePlanAddButton}
                    >
                        + Add
                    </Button>
                )}
            </AccordionDetails>

            {/* Delete Term Dailog */}
            {isTermDeleteDialogOpen && (
                <DeleteTermDialog
                    isOpen={isTermDeleteDialogOpen}
                    onClose={toggleIsTermDeleteDialogOpen}
                    onConfirm={handleTermDeleteConfirmation}
                    termName={termMap.get(termToDelete)?.name}
                />
            )}
        </Accordion>
    );
}
