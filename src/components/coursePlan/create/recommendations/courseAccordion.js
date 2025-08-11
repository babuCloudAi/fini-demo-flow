'use client';

import {useState, useEffect} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    Typography
} from '@mui/material';
import {InfinizeIcon, InfinizeConfirmation} from '../../../common';
import classes from '../../coursePlan.module.css';
import CourseMenu from './courseMenu';
import {
    getCourseKey,
    getTotalCredits,
    useHighlightCourses,
    updateTermsWithMovedCourse
} from './utils';
import {
    validateScheduleConflicts,
    validateTotalPlanCredits,
    validateTotalTermCredits
} from './validations';
import {CONFLICT_TYPE} from '@/config/constants';

export default function CourseAccordion({
    coursePlan,
    course,
    courseIndex,
    term,
    termIndex,
    termsList,
    highlightedCourses,
    courseMap,
    termMap,
    onPlanChange,
    addBannerToQueue,
    setHighlightedCourses,
    setCourseToResolve,
    setHighlightedTermCodes,
    resetHighlightedCourses,
    setBannerQueue
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [availableMoveOptions, setAvailableMoveOptions] = useState([]);

    const highlightCourses = useHighlightCourses(
        setHighlightedCourses,
        setHighlightedTermCodes
    );

    const processed = {
        scheduleConflicts: new Set(),
        creditConflicts: new Set()
    };

    const highlightId = `course_${getCourseKey(course)}_${term.code}`;
    const isHighlighted = highlightedCourses?.includes(highlightId);

    /**
     * Updates the list of available terms where the given course can be moved.
     * Filters out the current term and ensures only valid terms from termMap are included.
     * Sets the availableMoveOptions state with these terms for UI selection.
     *
     * Dependencies:
     * - course: The currently selected course object.
     * - courseMap: Memoized map of course keys to course details.
     * - term.code: The current term code to exclude from options.
     * - termMap: Memoized map of term codes to term details.
     */
    useEffect(() => {
        if (!course) {
            return setAvailableMoveOptions([]);
        }

        const courseObj = courseMap.get(getCourseKey(course));

        if (courseObj?.availableTerms?.length > 0) {
            const availableTermOptions = courseObj.availableTerms.reduce(
                (termOptions, availableTermCode) => {
                    const isNotSourceTerm = availableTermCode !== term.code;
                    const termInCoursePlan = termMap.has(availableTermCode);
                    const targetTerm = termMap.get(availableTermCode);

                    if (isNotSourceTerm && termInCoursePlan) {
                        termOptions.push({
                            label: targetTerm.name,
                            value: availableTermCode,
                            termCode: targetTerm.code
                        });
                    }

                    return termOptions;
                },
                []
            );

            setAvailableMoveOptions(availableTermOptions);
        } else {
            setAvailableMoveOptions([]);
        }
    }, [course, courseMap, term.code, termMap]);

    const toggleIsDeleteDialogOpen = () => {
        setIsDeleteDialogOpen(prev => !prev);
    };

    const toggleIsExpanded = () => {
        setIsExpanded(prev => !prev);
    };

    /**
     * Handles deletion of a course from a specific term.
     *
     * - Updates the course list and credit count for the term.
     * - Recalculates total plan credits.
     * - Removes and revalidates banners for:
     *   - Low credits in a term
     *   - Total plan credits
     * - Updates the course plan state.
     *
     */
    const handleDeleteCourse = () => {
        const updatedTerms = termsList.map((term, index) => {
            if (index !== termIndex) return term;

            const updatedCourses = [...term.courses];
            const [removedCourse] = updatedCourses.splice(courseIndex, 1);
            const removedCredits = removedCourse?.credits ?? 0;
            const newTermCredits = Math.max(
                0,
                (term.termCredits ?? 0) - removedCredits
            );

            return {
                ...term,
                courses: updatedCourses,
                termCredits: newTermCredits
            };
        });

        const updatedTotalCredits = getTotalCredits(updatedTerms);
        const updatedTerm = updatedTerms[termIndex];
        const updatedTermCredits = updatedTerm.termCredits;

        // Remove existing low-credits banner for this term if present
        const termCreditsBannerId = `low_credits_term_${updatedTerm.code}`;
        setBannerQueue(prev => prev.filter(b => b.id !== termCreditsBannerId));
        processed.creditConflicts.delete(termCreditsBannerId);

        // Add new low-credit banner if needed
        const termCreditsBanner = validateTotalTermCredits(
            updatedTerm,
            processed.creditConflicts,
            updatedTermCredits
        );
        if (termCreditsBanner) {
            addBannerToQueue(termCreditsBanner);
            processed.creditConflicts.add(termCreditsBanner.id);
        }

        // Remove existing total plan banner if needed
        const totalPlanBanner = validateTotalPlanCredits(
            updatedTotalCredits,
            coursePlan.minimumTotalCredits,
            processed.creditConflicts
        );
        const totalPlanBannerId = totalPlanBanner?.id;
        if (totalPlanBannerId) {
            setBannerQueue(prev =>
                prev.filter(b => b.id !== totalPlanBannerId)
            );
            processed.creditConflicts.delete(totalPlanBannerId);
        }

        // Add new total plan banner if needed
        if (totalPlanBanner) {
            addBannerToQueue(totalPlanBanner);
            processed.creditConflicts.add(totalPlanBanner.id);
        }

        // Final state update
        onPlanChange({
            terms: updatedTerms,
            totalCredits: updatedTotalCredits,
            isOriginalAiRecommendation: false
        });
    };

    /**
     * Moves a course between terms, updates term & plan credits,
     * validates total plan credits, per-term credits,
     * and schedule conflicts for the destination term.
     */
    const handleMoveCourse = (
        selectedCourse,
        sourceTerm,
        destinationTermCode
    ) => {
        if (!selectedCourse ?? !sourceTerm ?? !destinationTermCode) return;

        const destinationTermObj = termsList.find(
            term => term.code === destinationTermCode
        );

        const {updatedTerms, updatedTotalCredits} = updateTermsWithMovedCourse(
            termsList,
            selectedCourse,
            [sourceTerm],
            destinationTermObj
        );

        const updatedSourceTerm = updatedTerms.find(
            term => term.code === sourceTerm.code
        );
        const updatedDestinationTerm = updatedTerms.find(
            term => term.code === destinationTermCode
        );

        // --- Handle and refresh source term low-credit banner ---
        const sourceBannerId = `low_credits_term_${updatedSourceTerm.code}`;
        setBannerQueue(prev => prev.filter(b => b.id !== sourceBannerId));
        processed.creditConflicts.delete(sourceBannerId);

        const sourceTermBanner = validateTotalTermCredits(
            updatedSourceTerm,
            processed.creditConflicts,
            updatedSourceTerm.termCredits
        );
        if (sourceTermBanner) {
            addBannerToQueue(sourceTermBanner);
            processed.creditConflicts.add(sourceTermBanner.id);
        }

        // --- Handle and refresh destination term low-credit banner ---
        const destinationBannerId = `low_credits_term_${updatedDestinationTerm.code}`;
        setBannerQueue(prev => prev.filter(b => b.id !== destinationBannerId));
        processed.creditConflicts.delete(destinationBannerId);

        const destinationTermBanner = validateTotalTermCredits(
            updatedDestinationTerm,
            processed.creditConflicts,
            updatedDestinationTerm.termCredits
        );
        if (destinationTermBanner) {
            addBannerToQueue(destinationTermBanner);
            processed.creditConflicts.add(destinationTermBanner.id);
        }

        // --- Validate schedule conflicts ---
        const scheduleBanners = validateScheduleConflicts(
            selectedCourse,
            updatedDestinationTerm.courses,
            processed.scheduleConflicts,
            updatedDestinationTerm
        );

        if (scheduleBanners) {
            for (const scheduleBanner of scheduleBanners) {
                // Map back to actual course objects
                const conflictingCourses =
                    scheduleBanner.data.conflictingCourses
                        .map(conflictCourse => {
                            const key = getCourseKey(conflictCourse);
                            return updatedDestinationTerm.courses.find(
                                c => getCourseKey(c) === key
                            );
                        })
                        .filter(Boolean);

                // Attach resolution logic and highlight behavior
                scheduleBanner.data = {
                    ...scheduleBanner.data,
                    conflictingCourses
                };

                scheduleBanner.onResolve = () => {
                    setCourseToResolve({
                        type: CONFLICT_TYPE.SCHEDULE_CONFLICT,
                        data: {
                            course: selectedCourse,
                            conflictingCourses,
                            termName: updatedDestinationTerm.name,
                            termCode: updatedDestinationTerm.code
                        },
                        bannerId: scheduleBanner.id
                    });
                };

                scheduleBanner.onClick = () => {
                    resetHighlightedCourses();
                    highlightCourses(
                        conflictingCourses.map(courseObj => ({
                            ...courseObj,
                            termCode: updatedDestinationTerm.code
                        })),
                        [updatedDestinationTerm.code]
                    );
                };

                addBannerToQueue(scheduleBanner);
                scheduleBanner.data.conflictKeys.forEach(key =>
                    processed.scheduleConflicts.add(key)
                );
            }
        }

        // --- Handle and refresh total plan credit banner ---
        const totalPlanBanner = validateTotalPlanCredits(
            updatedTotalCredits,
            coursePlan.minimumTotalCredits,
            processed.creditConflicts
        );
        const totalPlanBannerId = totalPlanBanner?.id;

        if (totalPlanBannerId) {
            setBannerQueue(prev =>
                prev.filter(b => b.id !== totalPlanBannerId)
            );
            processed.creditConflicts.delete(totalPlanBannerId);
        }

        if (totalPlanBanner) {
            addBannerToQueue(totalPlanBanner);
            processed.creditConflicts.add(totalPlanBanner.id);
        }

        // --- Final state update ---
        onPlanChange({
            terms: updatedTerms,
            totalCredits: updatedTotalCredits,
            isOriginalAiRecommendation: false
        });
    };

    return (
        <>
            <Accordion
                expanded={isExpanded}
                onChange={toggleIsExpanded}
                disableGutters
                className={`${classes.infinize__courseAccordion} ${
                    isHighlighted
                        ? classes.infinize__courseAccordionHighlighted
                        : ''
                }`}
                id={highlightId}
            >
                <AccordionSummary
                    component="div"
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls="course_content"
                    expandIcon={
                        <InfinizeIcon
                            icon="mdi:expand-more"
                            className="menuItemIcon"
                        />
                    }
                    tabIndex={0}
                >
                    <Stack
                        className={classes.infinize__courseAccordionSummary}
                        direction={'row'}
                        width="100%"
                    >
                        <Stack
                            direction={{xs: 'column', sm: 'row'}}
                            justifyContent={'space-between'}
                            alignItems={{xs: 'flex-start', sm: 'center'}}
                            width="100%"
                            spacing={2}
                        >
                            <Stack flexGrow={1}>
                                <Typography textAlign="left">
                                    {`${course.subject} ${course.courseNumber} ${course.courseTitle}`}
                                </Typography>

                                <Stack
                                    direction={{sm: 'column', md: 'row'}}
                                    flexWrap={'wrap'}
                                    gap={1}
                                >
                                    {course.schedule.map((entry, index) => (
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            alignItems="center"
                                            key={index}
                                            pt={0.5}
                                            fontSize={12}
                                        >
                                            <InfinizeIcon
                                                icon="mingcute:time-line"
                                                width={'16px'}
                                                height={'16px'}
                                                className="menuItemIcon"
                                            />
                                            <Typography
                                                className={
                                                    classes.infinize__coursePlanSchedule
                                                }
                                            >
                                                {entry.days}
                                            </Typography>
                                            <Typography
                                                className={
                                                    classes.infinize__coursePlanSchedule
                                                }
                                            >
                                                {entry.time}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                            <Typography fontSize={12} fontWeight={500}>
                                {course.credits} Credits
                            </Typography>
                        </Stack>
                        <CourseMenu
                            course={course}
                            term={term}
                            onDelete={toggleIsDeleteDialogOpen}
                            onMove={handleMoveCourse}
                            availableMoveOptions={availableMoveOptions}
                        />
                    </Stack>
                </AccordionSummary>

                <AccordionDetails id="course-content">
                    <Typography
                        className={classes.infinize__coursePlanDescription}
                    >
                        {course.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {isDeleteDialogOpen && (
                <InfinizeConfirmation
                    isOpen
                    onClose={toggleIsDeleteDialogOpen}
                    onConfirm={() => {
                        toggleIsDeleteDialogOpen();
                        handleDeleteCourse();
                    }}
                    primaryButtonLabel="Continue"
                    title="Confirm Course  Deletion"
                    content={
                        <>
                            Are you sure you want to delete the course{' '}
                            <Typography fontWeight={500} component="span">
                                "{course.subject} {course.courseNumber}
                                {course.courseTitle}"?
                            </Typography>
                        </>
                    }
                />
            )}
        </>
    );
}
