import {useCallback} from 'react';
/**
 * Checks if two courses are the same based on subject, course number, and course title.
 *
 * @param {Object} existingCourse
 * @param {Object} newCourse
 * @returns {boolean} True if subject, courseNumber, and courseTitle match.
 */
export function isSameCourse(existingCourse, newCourse) {
    return (
        existingCourse.subject === newCourse.subject &&
        existingCourse.courseNumber === newCourse.courseNumber &&
        existingCourse.courseTitle === newCourse.courseTitle
    );
}

/**
 * Checks if two courses are the same including overlapping schedule.
 *
 * @param {Object} existingCourse
 * @param {Object} newCourse
 * @returns {boolean} True if subject, courseNumber, courseTitle match and schedules overlap.
 */
export function isSameCourseWithSameSchedule(existingCourse, newCourse) {
    if (!isSameCourse(existingCourse, newCourse)) {
        return false;
    }

    const currentSchedules = Array.isArray(existingCourse.schedule)
        ? existingCourse.schedule
        : [existingCourse.schedule];

    const newSchedules = Array.isArray(newCourse.schedule)
        ? newCourse.schedule
        : [newCourse.schedule];

    return currentSchedules.some(currentSchedule =>
        newSchedules.some(
            newSchedule =>
                currentSchedule.days === newSchedule.days &&
                currentSchedule.time === newSchedule.time
        )
    );
}

/**
 * Generates a unique key string for a course using its subject, course number, and course title.
 * The course title is included without spaces to ensure uniqueness.
 *
 * @param {Object} course - The course object.
 * @param {string} course.subject - The subject code of the course (e.g., "CS").
 * @param {string} course.courseNumber - The course number (e.g., "101").
 * @param {string} course.courseTitle - The full course title (e.g., "Introduction to Programming").
 * @returns {string} A unique course key in the format "subject_courseNumber_courseTitleWithoutSpaces"
 *                   (e.g., "CS_101_IntroductiontoProgramming").
 */
export function getCourseKey(course) {
    const courseTitleNoSpaces = course.courseTitle.replace(/\s+/g, '');
    return `${course.subject}_${course.courseNumber}_${courseTitleNoSpaces}`;
}

/**
 * Generates a unique list of highlightable DOM element IDs for the given course(s).
 *
 * @param {Object[]} courses - A single course object or an array of course objects.
 * @param {string} courses[].subject - The subject of the course (e.g., "CS").
 * @param {string} courses[].courseNumber - The course number (e.g., "101").
 * @param {string} courses[].termName - The term in which the course is planned (e.g., "202410").
 * @returns {string[]} An array of unique course element IDs in the format: `course_<subject>_<courseNumber>_<termName>`.
 */
export function getCourseIdsToHighlight(courses) {
    if (!courses ?? courses.length === 0) return [];

    return [
        ...new Set(
            courses.map(
                course => `course_${getCourseKey(course)}_${course.termCode}`
            )
        )
    ];
}

/**
 * React hook to highlight and scroll to specific course elements in the DOM.
 *
 * @param {Function} setHighlightedCourses - State setter function for updating highlighted course IDs.
 * @returns {(courses: Object|Object[]) => void} A callback function that takes one or more course objects,
 * generates highlight IDs, updates the highlight state, and scrolls each course element into view.
 */

export function useHighlightCourses(
    setHighlightedCourses,
    setHighlightedTermCodes
) {
    return useCallback(
        (courses, termCodes = []) => {
            const ids = getCourseIdsToHighlight(courses);
            setHighlightedCourses(ids);
            setHighlightedTermCodes(termCodes);

            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({behavior: 'smooth', block: 'center'});
                }
            });
        },
        [setHighlightedCourses, setHighlightedTermCodes]
    );
}

/**
 * Converts a time range string (e.g., "10:00 AM - 11:30 AM") into numeric start and end times in minutes.
 * Handles both standard dash and variations like en dash (–) or em dash (—).
 *
 * @param {string} timeStr - A time range string in the format "HH:MM AM/PM - HH:MM AM/PM".
 *
 * @returns {Object} Object containing:
 * - `start` {number} — Start time in minutes since midnight.
 * - `end` {number} — End time in minutes since midnight.
 *
 * @example
 * const { start, end } = convertToMinutesRange("10:00 AM - 11:30 AM");
 * console.log(start); // 600
 * console.log(end);   // 690
 */

export function convertToMinutesRange(timeStr) {
    if (!timeStr ?? typeof timeStr !== 'string') {
        return {start: 0, end: 0};
    }
    const [start, end] = timeStr.split('–').map(time => time.trim());

    if (!start ?? !end) {
        return {start: 0, end: 0};
    }

    const toMinutes = time => {
        const [timePart, modifier] = time.split(' ');
        if (!timePart ?? !modifier) {
            return 0;
        }

        let [hours, minutes] = timePart.split(':').map(Number);
        if (modifier.toUpperCase() === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (modifier.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    };

    return {
        start: toMinutes(start),
        end: toMinutes(end)
    };
}

/**
 * Checks if a new course conflicts with an existing course based on overlapping days and times.
 *
 * @param {Object} newCourse - The course being added or evaluated.
 * @param {Object} existingCourse - An existing course in the same term to compare against.
 *
 * @returns {Object} Result object:
 * - `conflict` {boolean} — True if a conflict exists, otherwise false.
 * - `conflictingCourse` {Object} — The existing course that conflicts with the new course, only present if `conflict` is true.
 *
 * @example
 * const result = checkScheduleConflict(newCourse, existingCourse);
 * if (result.conflict) {
 *   console.log(`Conflict with: ${result.conflictingCourse.courseTitle}`);
 * }
 */
export function checkScheduleConflict(newCourse, existingCourse) {
    const newCourseSchedules = newCourse.schedule ?? [];
    const existingCourseSchedules = existingCourse.schedule ?? [];

    for (const newSchedule of newCourseSchedules) {
        for (const existingSchedule of existingCourseSchedules) {
            const newDays = Array.from(newSchedule.days);
            const existingDays = Array.from(existingSchedule.days);

            const daysOverlap = newDays.some(day => existingDays.includes(day));
            if (!daysOverlap) continue;

            const {start: newStart, end: newEnd} = convertToMinutesRange(
                newSchedule.time
            );
            const {start: existingStart, end: existingEnd} =
                convertToMinutesRange(existingSchedule.time);

            const timeOverlap =
                newStart < existingEnd && newEnd > existingStart;
            if (timeOverlap) {
                return {
                    conflictingCourse: existingCourse,
                    conflict: true
                };
            }
        }
    }

    return {conflict: false};
}

/**
 * Calculates the total credits from a list of terms.
 *
 * @param {Array<Object>} terms - An array of term objects. Each term should have a `termCredits` field.
 * @returns {number} The sum of credits across all terms.
 */
export function getTotalCredits(terms) {
    return terms.reduce((sum, term) => sum + (term.termCredits ?? 0), 0);
}

/**
 * Updates terms by removing a course from source terms and adding it to a destination term (if given).
 *
 * @param {Array} termsList - Current terms list.
 * @param {Object} course - The course to move.
 * @param {Array} sourceTerms - Array of source term objects to remove the course from.
 * @param {Object|null} destinationTerm - Term object or code to add the course to. Pass null to skip adding.
 * @returns {{ updatedTerms: Array, updatedTotalCredits: number }}
 */
export function updateTermsWithMovedCourse(
    termsList,
    course,
    sourceTerms,
    destinationTerm,
    skipAddingToDestination = false
) {
    const updatedTerms = termsList.map(term => {
        const isSource = sourceTerms.some(source => source.code === term.code);
        const isDestination =
            destinationTerm && term.code === destinationTerm.code;

        if (isSource && !isDestination) {
            // Remove course from source terms
            const updatedCourses = term.courses.filter(
                courseObj => !isSameCourse(courseObj, course)
            );
            return {
                ...term,
                courses: updatedCourses,
                termCredits: updatedCourses.reduce(
                    (total, course) => total + course.credits,
                    0
                )
            };
        }

        if (isDestination) {
            if (skipAddingToDestination) {
                // Do NOT re-add; keep courses unchanged
                const updatedCourses = term.courses;
                return {
                    ...term,
                    courses: updatedCourses,
                    termCredits: updatedCourses.reduce(
                        (total, course) => total + course.credits,
                        0
                    )
                };
            } else {
                // Add course to destination
                const updatedCourses = [...term.courses, course];
                return {
                    ...term,
                    courses: updatedCourses,
                    termCredits: updatedCourses.reduce(
                        (total, course) => total + course.credits,
                        0
                    )
                };
            }
        }

        return term;
    });

    const updatedTotalCredits = getTotalCredits(updatedTerms);

    return {updatedTerms, updatedTotalCredits};
}
