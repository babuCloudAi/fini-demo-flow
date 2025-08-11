'use client';

import {useState, useMemo, useEffect} from 'react';
import {Stack, Box, IconButton, Button, Typography} from '@mui/material';
import {InfinizeIcon} from '../../../common';
import classes from '../../coursePlan.module.css';
import {AutoCompleteSelect} from '../../../common';
import {
    isSameCourse,
    isSameCourseWithSameSchedule,
    useHighlightCourses
} from './utils';
import {
    validateAddCourseConflict,
    validateTotalPlanCredits,
    validateTotalTermCredits
} from './validations';

export default function AddCourse({
    courses,
    onCourseSelect,
    onAdd,
    onClose,
    selectedTerm,
    termsList,
    addBannerToQueue,
    termsToBeHidden,
    isEditMode,
    setHighlightedCourses,
    setHighlightedTermCodes,
    resetHighlightedCourses,
    setBannerQueue,
    totalCredits,
    coursePlan
}) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const highlightCourses = useHighlightCourses(
        setHighlightedCourses,
        setHighlightedTermCodes
    );
    const handleChange = value => {
        setSelectedCourse(value); // Store the entire course object
        onCourseSelect(value);
    };

    // Simplified getOptionLabel to return a plain string
    const getOptionLabel = option => {
        if (!option) {
            return '';
        }
        return `${option.subject} - ${option.courseNumber} ${option.courseTitle}`;
    };

    // Function to check equality between selected and available options
    const isOptionEqualToValue = (option, value) =>
        isSameCourseWithSameSchedule(option, value);

    const options = useMemo(() => {
        if (!selectedTerm) return [];

        // 1️⃣ Get hidden courses only if edit mode
        let hiddenCourses = [];
        if (isEditMode) {
            const hiddenTerms = termsList.filter(term =>
                termsToBeHidden.includes(term.code)
            );
            hiddenCourses = hiddenTerms.flatMap(term => term.courses ?? []);
        }

        return courses.filter(
            course =>
                // Must be available in selected term
                course.availableTerms.includes(selectedTerm.code) &&
                // Not already in selected term
                !selectedTerm.courses?.some(existing =>
                    isSameCourseWithSameSchedule(existing, course)
                ) &&
                // Not in hidden terms (only if edit mode)
                (isEditMode
                    ? !hiddenCourses.some(existing =>
                          isSameCourseWithSameSchedule(existing, course)
                      )
                    : true)
        );
    }, [courses, selectedTerm, termsList, termsToBeHidden, isEditMode]);

    /**
     * Validates and adds a selected course to the specified term.
     *
     * Workflow:
     * 1. Validates input parameters.
     * 2. Prepares a preview of terms with the course added.
     * 3. Calculates updated term and total credits.
     * 4. Validates course duplication conflict.
     * 5. Updates low term credit banner.
     * 6. Updates low total plan credit banner.
     * 7. If all checks pass, invokes `onAdd` to persist the change.
     *
     * @param {Object} course - The course object to be added.
     * @param {string} termCode - The code of the term to which the course will be added.
     */
    const handleAddCourseWithValidation = (course, termCode) => {
        if (!course ?? !termCode) return;

        // Find the target term by code
        const targetTerm = termsList.find(term => term.code === termCode);
        if (!targetTerm) return;

        // Create preview terms with the new course added
        const updatedTerms = termsList.map(term =>
            term.code === termCode
                ? {...term, courses: [...term.courses, course]}
                : term
        );

        // Calculate updated term credits
        const updatedTargetTerm = updatedTerms.find(
            term => term.code === termCode
        );
        const updatedTermCredits = updatedTargetTerm.courses.reduce(
            (sum, course) => sum + (course.credits ?? 0),
            0
        );

        // Calculate updated total plan credits
        const updatedTotalCredits = totalCredits + (course.credits ?? 0);

        //  Prepare processed set from current banner queue
        const newProcessed = {
            courseConflicts: new Set(),
            creditConflicts: new Set()
        };

        // Check for course conflict
        const conflictBanner = validateAddCourseConflict(
            course,
            updatedTerms,
            newProcessed.courseConflicts,
            termCode
        );

        if (conflictBanner) {
            const conflictingTerms = updatedTerms.filter(term =>
                term.courses.some(termCourse =>
                    isSameCourse(termCourse, course)
                )
            );

            conflictBanner.data = {
                ...conflictBanner.data,
                course,
                conflictingTerms
            };

            conflictBanner.onClick = () => {
                resetHighlightedCourses();
                const highlightedCourses = conflictingTerms.flatMap(term =>
                    term.courses
                        .filter(termCourse => isSameCourse(termCourse, course))
                        .map(termCourse => ({
                            ...termCourse,
                            termCode: term.code
                        }))
                );
                const termCodes = conflictingTerms.map(term => term.code);
                highlightCourses(highlightedCourses, termCodes);
            };

            addBannerToQueue(conflictBanner);
            return;
        }

        // Handle term-level credit banner
        const termBannerId = `low_credits_term_${termCode}`;
        setBannerQueue(prev => prev.filter(b => b.id !== termBannerId));
        newProcessed.creditConflicts.delete(termBannerId);

        const termCreditBanner = validateTotalTermCredits(
            updatedTargetTerm,
            newProcessed.creditConflicts,
            updatedTermCredits
        );

        if (termCreditBanner) {
            setBannerQueue(prev => [...prev, termCreditBanner]);
            newProcessed.creditConflicts.add(termCreditBanner.id);
        }

        // Handle total-plan-level credit banner
        const totalPlanBannerId = 'low_plan_credits';

        // First, remove the old banner if it exists
        setBannerQueue(prev => prev.filter(b => b.id !== totalPlanBannerId));
        newProcessed.creditConflicts.delete(totalPlanBannerId);

        // Then validate again with updated credits
        const totalPlanBanner = validateTotalPlanCredits(
            updatedTotalCredits,
            coursePlan.minimumTotalCredits,
            newProcessed.creditConflicts
        );

        // Add new banner if needed
        if (totalPlanBanner) {
            setBannerQueue(prev => [...prev, totalPlanBanner]);
            newProcessed.creditConflicts.add(totalPlanBanner.id);
        }

        // Finally, add the course
        onAdd(course, termCode);
    };

    /**
     * Handles the confirmation click to add the selected course to the selected term.
     */
    const handleAddConfirmation = () => {
        handleAddCourseWithValidation(selectedCourse, selectedTerm?.code);
    };

    return (
        <Box sx={{position: 'relative', width: '100%'}}>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                alignItems="start"
                spacing={1}
            >
                <AutoCompleteSelect
                    name="course"
                    label="Select Course"
                    options={options}
                    value={selectedCourse}
                    onChange={handleChange}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    minFilterLength={1}
                    customRenderOption={(props, option, {index}) => {
                        const {key, ...rest} = props;
                        return (
                            <Stack
                                key={`${key}_${index}`}
                                {...rest}
                                spacing={1}
                                className={
                                    classes.infinize__coursePlanAddCourseMenu
                                }
                            >
                                <Typography>{`${option.subject} - ${option.courseNumber} ${option.courseTitle}`}</Typography>
                                <Stack
                                    direction={{xs: 'column', sm: 'row'}}
                                    alignItems={{
                                        xs: 'flex-start',
                                        sm: 'center'
                                    }}
                                    justifyContent="space-between"
                                    className={
                                        classes.infinize__coursePlanSchedule
                                    }
                                    spacing={1}
                                >
                                    <Stack
                                        spacing={{md: 1, lg: 2}}
                                        pt={0.5}
                                        direction={{
                                            md: 'column',
                                            lg: 'row'
                                        }}
                                    >
                                        {option.schedule.map((slot, i) => (
                                            <Stack
                                                key={`schedule_${i}`}
                                                direction="row"
                                                spacing={0.5}
                                                alignItems="center"
                                                className={
                                                    classes.infinize__coursePlanSchedule
                                                }
                                            >
                                                <InfinizeIcon
                                                    icon="mingcute:time-line"
                                                    width="16px"
                                                    height="16px"
                                                    className="menuItemIcon"
                                                />
                                                <Typography variant="body2">
                                                    {slot.days}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {slot.time}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>

                                    <Typography fontSize={12}>
                                        {option.credits} Credits
                                    </Typography>
                                </Stack>
                            </Stack>
                        );
                    }}
                />

                <IconButton
                    onClick={onClose}
                    aria-label="remove-course"
                    className={classes.infinize__coursePlanCircleDelete}
                >
                    <InfinizeIcon
                        icon="mdi:minus-circle-outline"
                        className="menuItemIcon"
                    />
                </IconButton>
            </Stack>
            {selectedCourse && (
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleAddConfirmation}
                    className={classes.infinize__coursePlanDoneButton}
                >
                    Done
                </Button>
            )}
        </Box>
    );
}
