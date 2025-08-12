import {formUtils} from '@/components/common';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {
    studentInfo,
    systemActivity,
    areaOfStudy,
    assignedTo,
    performance,
    registrationHistory
} from './form/filterChipLabels';

const filterChipLabels = {
    studentInfo,
    systemActivity,
    areaOfStudy,
    assignedTo,
    performance,
    registrationHistory,
    courseData: {},
    courseRequirements: {},
    testScores: {}
};

const getGenericFilterChips = (section, sectionFilters) => {
    return Object.entries(sectionFilters).reduce((chips, [key, value]) => {
        if (value) {
            const label = filterChipLabels[section]?.[key] ?? key;
            chips.push({key, label});
        }
        return chips;
    }, []);
};

export const isValidTestScoreFilter = score => {
    if (!score) {
        return false;
    }

    const {test, testFilter, testScore} = score;
    return !!(test && testFilter && testScore);
};

export const isValidCourseDataFilter = course => {
    return !!(course && course.subject && course.courseNumber);
};

export const sanitizeCourseDataFilters = courseData => {
    if (courseData?.courses?.length) {
        const filteredCourses = courseData.courses.reduce(
            (filtered, course) => {
                if (isValidCourseDataFilter(course)) {
                    const {subject, courseNumber, ...rest} = course;
                    filtered.push({subject, courseNumber, ...rest});
                }
                return filtered;
            },
            []
        );

        return {courses: formUtils.getUpdatedFormData(filteredCourses)};
    }
};

/**
 * Filters out invalid required and optional course entries
 * where the 'course' field is empty or missing.
 *
 * @param {Object} courseRequirements - Object with required and optional courses.
 * @returns {Object|undefined} - Filtered object or undefined if no valid data.
 */
export const sanitizeCourseRequirementsFilters = courseRequirements => {
    if (!courseRequirements) {
        return;
    }

    const filteredCourses = arr => (arr ? arr.filter(item => item.course) : []);

    const requiredCourses = filteredCourses(courseRequirements.required);
    const optionalCourses = filteredCourses(
        courseRequirements.optional?.courses
    );
    const totalMinimumCredits =
        courseRequirements.optional?.totalMinimumCredits;

    const hasOptionalCourses = optionalCourses.length > 0;
    const hasTotalMinimumCredits =
        totalMinimumCredits !== undefined && totalMinimumCredits !== '';

    const result = {};

    if (requiredCourses.length) {
        result.required = requiredCourses;
    }

    const optional = {};

    if (hasOptionalCourses) {
        optional.courses = optionalCourses;
    }

    if (hasTotalMinimumCredits) {
        optional.totalMinimumCredits = totalMinimumCredits;
    }

    if (hasOptionalCourses || hasTotalMinimumCredits) {
        result.optional = optional;
    }

    if (Object.keys(result).length > 0) {
        return result;
    }
};

/**
 * Filters testScores to include only those with all required fields: test, testFilter, and testScore,
 * and returns them along with their original indexes.
 *
 * @param {Array} testScores - Array of test score objects.
 * @returns {Array|undefined} - Array of valid entries as { index, entry } or undefined if none valid.
 */
export const sanitizeTestScoresFilters = testScores => {
    if (testScores) {
        const validTestScores = testScores.reduce((validScores, entry) => {
            const {test, testFilter, testScore} = entry;

            if (isValidTestScoreFilter(entry)) {
                validScores.push({test, testFilter, testScore});
            }

            return validScores;
        }, []);

        if (validTestScores.length) {
            return validTestScores;
        }
    }
};

export const isOnlyTermSelected = (section, formData) => {
    const filters = formData[section];
    if (!filters) {
        return false;
    }

    const keys = Object.keys(filters);

    return keys.length === 1 && keys[0] === 'semester';
};

/**
 * Utility to generate chip labels from formData for a given section.
 */
export const getFilterChips = (section, formData) => {
    const sectionFilters = formData[section];
    if (!sectionFilters) {
        return [];
    }

    switch (section) {
        case ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO: {
            const {assignType, name} = sectionFilters ?? {};
            if (assignType && name) {
                return [
                    {
                        label: assignType,
                        type: ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO
                    }
                ];
            }
            return [];
        }

        case ADVANCED_SEARCH_SECTIONS.TEST_SCORES: {
            if (sectionFilters.scores) {
                return sectionFilters.scores.reduce(
                    (validScores, score, index) => {
                        if (isValidTestScoreFilter(score)) {
                            validScores.push({
                                label: `${score.test} ${score.testFilter} ${score.testScore}`,
                                type: ADVANCED_SEARCH_SECTIONS.TEST_SCORES,
                                index
                            });
                        }
                        return validScores;
                    },
                    []
                );
            }
            return [];
        }

        case ADVANCED_SEARCH_SECTIONS.COURSE_DATA: {
            if (sectionFilters.courses) {
                return sectionFilters.courses.reduce(
                    (validCourses, course, index) => {
                        if (isValidCourseDataFilter(course)) {
                            validCourses.push({
                                label: `${course.subject} - ${course.courseNumber}`,
                                type: ADVANCED_SEARCH_SECTIONS.COURSE_DATA,
                                index
                            });
                        }
                        return validCourses;
                    },
                    []
                );
            }
            return [];
        }

        case ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS: {
            const chips = [];
            const formatCourse = ({SUBJECT, COURSE_NUMBER}) =>
                `${SUBJECT} - ${COURSE_NUMBER}`;
            const requiredCourses = sectionFilters.required ?? [];
            console.log(requiredCourses);

            requiredCourses.forEach((item, index) => {
                if (item.course) {
                    chips.push({
                        label: `Required: ${formatCourse(item.course)}`,
                        index,
                        type: ADVANCED_SEARCH_SECTIONS.REQUIRED
                    });
                }
            });

            const optionalCourses = sectionFilters.optional?.courses ?? [];
            optionalCourses.forEach((item, index) => {
                if (item.course) {
                    chips.push({
                        label: `Optional: ${formatCourse(item.course)}`,
                        index,
                        type: ADVANCED_SEARCH_SECTIONS.OPTIONAL
                    });
                }
            });

            return chips;
        }

        case ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY:
        case ADVANCED_SEARCH_SECTIONS.PERFORMANCE: {
            if (!sectionFilters) {
                return [];
            }

            if (isOnlyTermSelected(section, formData)) {
                return [];
            }

            return getGenericFilterChips(section, sectionFilters);
        }

        default: {
            if (!sectionFilters) {
                return [];
            }

            return getGenericFilterChips(section, sectionFilters);
        }
    }
};

/**
 * Utility to remove chip from formData based on section, index, and type.
 */
export const removeFilter = (section, index, type, formData) => {
    const updated = {...formData};

    switch (section) {
        case ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO: {
            delete updated.assignedTo;
            break;
        }

        case ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS: {
            const courseReq = updated.courseRequirements ?? {};
            const requiredCourses = [...(courseReq.required ?? [])];
            const optionalCourses = [...(courseReq.optional?.courses ?? [])];
            const totalMinimumCredits = courseReq.optional?.totalMinimumCredits;

            if (type === ADVANCED_SEARCH_SECTIONS.REQUIRED) {
                requiredCourses.splice(index, 1);
            } else if (type === ADVANCED_SEARCH_SECTIONS.OPTIONAL) {
                optionalCourses.splice(index, 1);
            }

            const sanitized = sanitizeCourseRequirementsFilters({
                required: requiredCourses,
                optional: {
                    courses: optionalCourses,
                    totalMinimumCredits
                }
            });

            if (sanitized) {
                updated.courseRequirements = sanitized;
            } else {
                delete updated.courseRequirements;
            }
            break;
        }

        case ADVANCED_SEARCH_SECTIONS.COURSE_DATA: {
            const courses = [...(updated.courseData?.courses ?? [])];
            courses.splice(index, 1);

            const sanitized = sanitizeCourseDataFilters({courses});
            if (sanitized) {
                updated.courseData = sanitized;
            } else {
                delete updated.courseData;
            }
            break;
        }

        case ADVANCED_SEARCH_SECTIONS.TEST_SCORES: {
            const scores = [...(updated.testScores?.scores ?? [])];
            scores.splice(index, 1);

            const sanitized = sanitizeTestScoresFilters(scores);
            if (sanitized) {
                updated.testScores = {scores: sanitized};
            } else {
                delete updated.testScores;
            }
            break;
        }

        default: {
            const sectionData = updated[section];
            if (sectionData) {
                const entries = Object.entries(sectionData);
                entries.splice(index, 1);

                if (entries.length) {
                    updated[section] = Object.fromEntries(entries);
                } else {
                    delete updated[section];
                }
            }
            break;
        }
    }

    return updated;
};
