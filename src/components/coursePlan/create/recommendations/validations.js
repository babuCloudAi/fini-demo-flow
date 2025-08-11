import {BANNER_TYPE, CONFLICT_TYPE} from '@/config/constants';
import {getCourseKey, checkScheduleConflict, isSameCourse} from './utils';

/**
 * Validates if a course is unavailable in the given term based on available term codes.
 *
 * If the course is not offered in the given term and has not already been processed,
 * it returns a banner object indicating that the course is unavailable. Otherwise, it returns null.
 *
 * @param {Object} course - The course object being validated.
 * @param {Object} term - The term object in which the course is being checked.
 * @param {string} courseKey - Unique identifier for the course (e.g., subject-courseNumber).
 * @param {Set} processedSet - Set used to track processed validation keys to avoid duplicate banners.
 * @param {string[]} availableTerms - List of term codes in which the course is available.
 * @returns {Object} - Returns a banner object if the course is unavailable in the current term.
 */

export function validateCourseAvailability(
    course,
    term,
    processedSet,
    availableTerms
) {
    const courseKey = getCourseKey(course);
    const key = `course_unvailable_${courseKey}_${term.code}`;

    if (!processedSet.has(key) && !availableTerms.includes(term.code)) {
        return {
            id: key,
            type: BANNER_TYPE.ERROR,
            title: 'Course Unavailable!',
            reason: CONFLICT_TYPE.COURSE_UNAVAILABLE,
            data: {
                course: {
                    subject: course.subject,
                    courseNumber: course.courseNumber,
                    courseTitle: course.courseTitle
                },
                termName: term.name
            },
            isClosable: false
        };
    }
}

/**
 * Validates if a course appears in more than one term, including the current term.
 *
 * This function checks for duplication of a given course across all terms.
 * It always includes the current term (`currentTerm`) in the list of conflicting terms,
 * and scans other terms for duplicates using `isSameCourse`.
 *
 * If the course is found in more than one term, it generates a conflict banner.
 *
 * To prevent duplicate banners, it uses `processedSet` to track course-term combinations
 * (stored as `course_conflict_<courseKey>_<termCode>`), and skips if already processed.
 *
 * @param {Object} course - The course to check for duplication across terms.
 * @param {Array<Object>} termsList - Array of all academic terms with their course lists.
 * @param {Set<string>} processedSet - Set of conflict keys already handled to avoid duplication.
 * @param {Object} currentTerm - The term object where the course is currently being validated.
 *   Must contain `code` and `name` fields.
 *
 * @returns {Object} Returns a conflict banner object if a duplicate is found and not yet processed;
 *   otherwise returns `undefined`.
 */
export function validateCourseConflict(
    course,
    termsList,
    processedSet,
    currentTerm
) {
    const conflictingTerms = [{code: currentTerm.code, name: currentTerm.name}]; // Include current term directly

    for (const term of termsList) {
        if (term.code === currentTerm.code) {
            continue;
        }

        for (const item of term.courses) {
            if (isSameCourse(item, course)) {
                conflictingTerms.push({code: term.code, name: term.name});
                break;
            }
        }
    }

    if (conflictingTerms.length > 1) {
        const courseKey = getCourseKey(course);
        const courseConflictKeys = conflictingTerms.map(
            term => `course_conflict_${courseKey}_${term.code}`
        );

        const alreadyProcessed = courseConflictKeys.some(key =>
            processedSet.has(key)
        );

        if (!alreadyProcessed) {
            return {
                id: `course_conflict_${courseKey}`,
                type: BANNER_TYPE.ERROR,
                title: 'Course Conflict!',
                reason: CONFLICT_TYPE.COURSE_CONFLICT,
                data: {
                    subject: course.subject,
                    courseNumber: course.courseNumber,
                    courseTitle: course.courseTitle,
                    conflictingTerms,
                    courseConflictKeys
                },
                isClosable: false
            };
        }
    }
}

/**
 * Validates schedule conflicts for a given course within a term.
 *
 * This function identifies if the given course has direct schedule conflicts with any other courses
 * in the same academic term. It supports two scenarios:
 *
 * 1. **Fully Connected Conflict Group (Case 1)**:
 *    If the course and all directly conflicting courses also conflict with each other (i.e., every pair
 *    in the group has a direct conflict), a **single combined banner** is created for the group.
 *
 * 2. **Partially Connected Conflicts (Case 2)**:
 *    If the course has direct conflicts with multiple others, but those others don't all conflict with
 *    each other, then **individual pairwise banners** are created (e.g., A-B and B-C but not A-C).
 *
 * All detected conflicts are tracked using a `processedSet` to avoid duplicate banners for
 * the same course pairs.
 *
 * @param {Object} course - The course to evaluate for schedule conflicts.
 * @param {Object[]} allCourses - The list of all courses in the same term.
 * @param {Set<string>} processedSet - A set of unique keys representing already processed course pairs.
 * @param {Object} term - The academic term object (should include `name` and `code`).
 *
 * @returns {Object[]|null} An array of conflict banner objects (with conflict details), or null if no conflicts are found.
 */

export function validateScheduleConflicts(
    course,
    allCourses,
    processedSet,
    term
) {
    const courseKey = getCourseKey(course);
    const directConflicts = [];

    for (const other of allCourses) {
        if (other === course) {
            continue;
        }

        const otherKey = getCourseKey(other);
        const pairKey = `schedule_conflict_${courseKey}_${otherKey}_${term.code}`;
        const reversePairKey = `schedule_conflict_${otherKey}_${courseKey}_${term.code}`;

        if (processedSet.has(pairKey) ?? processedSet.has(reversePairKey)) {
            continue;
        }

        const conflict = checkScheduleConflict(course, other);

        if (conflict.conflict) {
            directConflicts.push(other);
        }
    }

    if (directConflicts.length > 0) {
        const conflictGroup = [course, ...directConflicts];

        const isFullyConnected = group => {
            for (let i = 0; i < group.length; i++) {
                for (let j = i + 1; j < group.length; j++) {
                    if (!checkScheduleConflict(group[i], group[j]).conflict) {
                        return false;
                    }
                }
            }
            return true;
        };

        const banners = [];

        if (isFullyConnected(conflictGroup)) {
            const keys = conflictGroup.map(getCourseKey).sort();
            const bannerId = `schedule_${keys.join('_')}_${term.code}`;

            const allKeys = [];

            for (let i = 0; i < conflictGroup.length; i++) {
                for (let j = i + 1; j < conflictGroup.length; j++) {
                    const key1 = `schedule_conflict_${getCourseKey(
                        conflictGroup[i]
                    )}_${getCourseKey(conflictGroup[j])}_${term.code}`;
                    const key2 = `schedule_conflict_${getCourseKey(
                        conflictGroup[j]
                    )}_${getCourseKey(conflictGroup[i])}_${term.code}`;
                    processedSet.add(key1);
                    processedSet.add(key2);
                    allKeys.push(key1, key2);
                }
            }

            banners.push({
                id: bannerId,
                type: BANNER_TYPE.ERROR,
                title: 'Course Schedule Conflict!',
                reason: CONFLICT_TYPE.SCHEDULE_CONFLICT,
                data: {
                    conflictingCourses: conflictGroup,
                    termName: term.name,
                    conflictKeys: allKeys
                },
                isClosable: false,
                replaceConflictKeys: allKeys
            });
        } else {
            for (const other of directConflicts) {
                const key1 = `schedule_conflict_${courseKey}_${getCourseKey(
                    other
                )}_${term.code}`;
                const key2 = `schedule_conflict_${getCourseKey(
                    other
                )}_${courseKey}_${term.code}`;

                if (processedSet.has(key1) ?? processedSet.has(key2)) continue;

                processedSet.add(key1);
                processedSet.add(key2);

                const sortedKeys = [courseKey, getCourseKey(other)].sort();
                const bannerId = `schedule_${sortedKeys.join('_')}_${
                    term.code
                }`;

                banners.push({
                    id: bannerId,
                    type: BANNER_TYPE.ERROR,
                    title: 'Course Schedule Conflict!',
                    reason: CONFLICT_TYPE.SCHEDULE_CONFLICT,
                    data: {
                        conflictingCourses: [course, other],
                        termName: term.name,
                        conflictKeys: [key1, key2]
                    },
                    isClosable: false
                });
            }
        }

        return banners.length > 0 ? banners : null;
    }

    return null;
}

/**
 * Validates if a term has fewer credits than required.
 *
 * This function checks if the `termCredits` in a term are less than the `minimumTermCredits`.
 * If so, and if the validation has not already been processed (checked via `processedSet`),
 * it returns a warning banner object indicating the credit shortfall.
 *
 * @param {Object} term - The term object to check.
 * @param {Set} processedSet - Set to track processed credit conflict keys.
 * @param {number} credits - The total number of credits currently assigned to the term.
 * @returns {Object} - Returns a banner object if conflict found.
 */

export function validateTotalTermCredits(term, processedSet, credits) {
    const key = `low_credits_term_${term.code}`;
    const creditsRequired = term.minimumTermCredits - credits;

    if (!processedSet.has(key) && creditsRequired > 0) {
        return {
            id: key,
            type: BANNER_TYPE.WARNING,
            title: 'Low Credits!',
            reason: CONFLICT_TYPE.TERM_LOW_CREDITS,
            data: {
                termName: term.name,
                credits: creditsRequired
            }
        };
    }
}

/**
 * Validates whether the total credits in the course plan are below the minimum required.
 *
 * This function checks if the cumulative `totalCredits` across all terms is less than
 * the `minimumTotalCredits` required for the academic plan. If so, and if the warning has not
 * already been processed (checked via `processedSet`), it returns a closable warning banner object.
 *
 * @param {number} totalCredits - The total number of credits across all terms in the plan.
 * @param {number} minimumTotalCredits - The minimum number of credits required for the plan.
 * @param {Set} processedSet - A set of previously processed validation keys.
 * @returns {Object} - Returns a banner message object if credits are below minimum.
 */
export function validateTotalPlanCredits(
    totalCredits,
    minimumTotalCredits,
    processedSet
) {
    const key = 'low_plan_credits';

    if (!processedSet.has(key) && totalCredits < minimumTotalCredits) {
        return {
            id: key,
            type: BANNER_TYPE.WARNING,
            title: 'Low Credits!',
            reason: CONFLICT_TYPE.PLAN_LOW_CREDITS
        };
    }
}

/**
 * Checks if the course being added already exists in any other term.
 *
 * This validation prevents adding a duplicate course across multiple terms,
 * which is not allowed. It scans all terms (excluding the one currently being
 * added to) and identifies if the course already exists elsewhere. If a conflict
 * is found and hasn't already been processed, it returns a structured banner
 * object for error display.
 *
 * @param {Object} course - The course object to validate.
 * @param {Array} termsList - Array of term objects, each containing a list of courses.
 * @param {Set} processedSet - A set of previously handled conflict keys to avoid duplicates.
 * @param {string} currentTermCode - The code of the term the course is being added to.
 *
 * @returns {Object|undefined} A banner object if a new conflict is detected; otherwise, undefined.
 *
 */

export function validateAddCourseConflict(
    course,
    termsList,
    processedSet,
    currentTermCode
) {
    const conflictingTerms = termsList.reduce((acc, term) => {
        // ✅ Strictly skip the term where we're trying to add
        if (term.code === currentTermCode) return acc;

        // ✅ Check if same course exists in this term
        for (const item of term.courses) {
            if (isSameCourse(item, course)) {
                acc.push({code: term.code, name: term.name});
                break;
            }
        }

        return acc;
    }, []);

    if (conflictingTerms.length > 0) {
        const courseKey = getCourseKey(course);
        const courseConflictKeys = conflictingTerms.map(
            term => `course_conflict_${courseKey}_${term.code}`
        );

        const alreadyProcessed = courseConflictKeys.some(key =>
            processedSet.has(key)
        );

        if (!alreadyProcessed) {
            return {
                id: `course_conflict_on_add_${courseKey}`,
                type: BANNER_TYPE.ERROR,
                title: 'Course Conflict!',
                reason: CONFLICT_TYPE.COURSE_CONFLICT_ON_ADD,
                data: {
                    course: {
                        subject: course.subject,
                        courseNumber: course.courseNumber,
                        courseTitle: course.courseTitle
                    },
                    conflictingTerms,
                    currentTermCode,
                    currentTermName: termsList.find(
                        t => t.code === currentTermCode
                    )?.name,
                    courseConflictKeys
                },
                isClosable: true
            };
        }
    }
}
