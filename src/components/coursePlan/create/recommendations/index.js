'use client';
import {useState, useEffect, useMemo} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {Box, Stack, Typography} from '@mui/material';
import CoursePlanCard from './coursePlanCard';
import AdditionalRecommendations from './additionalRecommendations';
import classes from '../../coursePlan.module.css';
import CoursePlanData from '@/data/coursePlan/aiGeneratedCoursePlan.json';
import Recommendationsdata from '@/data/coursePlan/recommendations.json';
import CourseData from '@/data/coursePlan/courses.json';
import ActionButtons from './actionButtons';
import {Loader} from '@/components/common';
import {
    COURSE_PLAN_MAX_LIMIT,
    CONFLICT_TYPE,
    COURSE_HIGHLIGHT_TIMEOUT
} from '@/config/constants';
import ReplacePlanDialog from './replacePlanDialog';
import SavePlanDialog from './savePlanDialog';
import CourseUnavailableDialog from './courseUnavailableDialog';
import CourseConflictDialog from './courseConflictDialog';
import ScheduleConflictDialog from './scheduleConflictDialog';
import {
    validateCourseAvailability,
    validateCourseConflict,
    validateScheduleConflicts,
    validateTotalTermCredits,
    validateTotalPlanCredits
} from './validations';
import {
    getCourseKey,
    isSameCourse,
    useHighlightCourses,
    getTotalCredits,
    updateTermsWithMovedCourse
} from './utils';
import BannersList from './bannersList';

export default function CoursePlanRecommendations({
    onRestart,
    isEditMode,
    openEditPlanDialog,
    termsToBeHidden
}) {
    const {studentId} = useParams();
    const router = useRouter();
    const studentProfilePath = `/student/${studentId}`;

    const [coursePlan, setCoursePlan] = useState({});
    const [additionalRecommendations, setAdditionalRecommendations] = useState(
        {}
    );
    const [coursesList, setCoursesList] = useState([]);
    const [isSaveInProgress, setIsSaveInProgress] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false);
    const [bannerQueue, setBannerQueue] = useState([]);
    const [courseToResolve, setCourseToResolve] = useState(null);
    const [termsList, setTermsList] = useState([]);
    const [totalCredits, setTotalCredits] = useState(0);
    const [highlightedCourses, setHighlightedCourses] = useState([]);
    const [highlightedTermCodes, setHighlightedTermCodes] = useState([]);
    const [isOriginalAiRecommendation, setIsOriginalAiRecommendation] =
        useState(true);
    const [courseMap, setCourseMap] = useState(new Map());
    const [coursePlanName, setCoursePlanName] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);

    const highlightCourses = useHighlightCourses(
        setHighlightedCourses,
        setHighlightedTermCodes
    );

    const toggleIsSaveDialogOpen = () => {
        setIsSaveDialogOpen(prev => !prev);
    };

    const toggleIsReplaceDialogOpen = () => {
        setIsReplaceDialogOpen(prev => !prev);
    };

    const toggleIsSaveInProgress = () => {
        setIsSaveInProgress(prev => !prev);
    };

    const resetHighlightedCourses = () => {
        setHighlightedCourses([]);
    };

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    /**
     * Initializes the Course Plan state on component mount:
     *
     * - Scrolls to the top of the page.
     * - Loads course plan data from `CoursePlanData`:
     *    - Sets course plan object, total credits, and AI recommendation flag.
     *    - Extracts and sets terms and their courses.
     * - Constructs a `courseMap` from all available course data for fast lookup.
     * - Generates and sets conflict/warning banners using the initialized terms and course map.
     * - Sets additional course recommendations and the full course list.
     * - Triggers a loading spinner delay to simulate API latency.
     */
    const getFilteredTerms = termsList => {
        if (!Array.isArray(termsList)) return [];
        return isEditMode
            ? termsList.filter(term => !termsToBeHidden.includes(term.code))
            : termsList;
    };

    useEffect(() => {
        scrollToTop();

        if (CoursePlanData) {
            setCoursePlan(CoursePlanData);
            setIsOriginalAiRecommendation(
                CoursePlanData.isOriginalAiRecommendation
            );

            const initializedTerms = CoursePlanData.terms.map(term => ({
                ...term,
                courses: [...term.courses]
            }));
            setTermsList(initializedTerms);
            setTotalCredits(CoursePlanData.totalCredits);

            // Generate and set courseMap
            const generatedMap = new Map();
            CourseData.Courses.forEach(course => {
                const key = getCourseKey(course);
                generatedMap.set(key, course);
            });
            setCourseMap(generatedMap);

            // Defer banner generation until courseMap is available
            const banners = generateAllBanners(initializedTerms, generatedMap);
            setBannerQueue(banners);
            if (CoursePlanData.terms) {
                //  If edit mode: only include future terms
                const filteredTerms = getFilteredTerms(CoursePlanData.terms);

                setTermsList(
                    filteredTerms.map(term => ({
                        ...term,
                        courses: [...term.courses]
                    }))
                );
            }

            setTotalCredits(CoursePlanData.totalCredits);
            setCoursePlanName(CoursePlanData.name);
        }

        setAdditionalRecommendations(Recommendationsdata.recommendations);
        setCoursesList(CourseData.Courses);

        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    /**
     * Automatically resets highlighted courses after a timeout (e.g., 30s)
     * - Useful for visually flashing conflicting courses temporarily
     */
    useEffect(() => {
        if (highlightedCourses?.length > 0) {
            const timeout = setTimeout(() => {
                resetHighlightedCourses();
            }, COURSE_HIGHLIGHT_TIMEOUT);

            return () => clearTimeout(timeout);
        }
    }, [highlightedCourses]);

    /**
     * Ensures that any newly loaded banners (e.g., credit/schedule warnings) are visible
     * - Triggers scroll to top only once loading is complete
     */
    useEffect(() => {
        if (bannerQueue.length > 0 && !isLoading) {
            scrollToTop();
        }
    }, [bannerQueue, isLoading]);

    const termMap = useMemo(() => {
        const map = new Map();
        termsList.forEach(term => {
            map.set(term.code, term);
        });
        return map;
    }, [termsList]);

    const handleCancel = () => {
        router.back();
    };

    const handleSave = updatedCoursePlanName => {
        sessionStorage.setItem('hasCoursePlan', 'true'); // session storage
        toggleIsSaveDialogOpen();

        toggleIsSaveInProgress();
        setTimeout(() => {
            toggleIsSaveInProgress();
            console.log('Saved Plan Name:', updatedCoursePlanName); // TODO: After API integration update the course plan name
            router.push(studentProfilePath);
        }, 2000); // TODO remove this logic after API integration.
    };

    const addBannerToQueue = banner => {
        setBannerQueue(prev => [...prev, banner]);
    };

    /**
     * Safely dismisses a banner by checking both its index and id.
     * Prevents accidental removal when the banner queue has shifted.
     *
     * @param {number} indexToRemove - Index of the banner to dismiss
     * @param {string} expectedId - Unique id of the banner to remove
     */
    const dismissBanner = (indexToRemove, expectedId) => {
        setBannerQueue(prev =>
            prev.filter(
                (banner, index) =>
                    !(index === indexToRemove && banner.id === expectedId)
            )
        );
    };

    const handleCourseUnavailableResolution = (
        conflictingCourse,
        sourceTermCode,
        destinationTermCode
    ) => {
        setTermsList(prevTerms => {
            const updatedTerms = prevTerms.map(term => {
                const isSourceTerm = term.code === sourceTermCode;
                const isDestinationTerm = term.code === destinationTermCode;

                if (isSourceTerm) {
                    // Remove course from the source (unavailable) term
                    const updatedCourses = term.courses.filter(
                        course => !isSameCourse(course, conflictingCourse)
                    );

                    return {
                        ...term,
                        courses: updatedCourses,
                        termCredits: Math.max(
                            0,
                            term.termCredits - conflictingCourse.credits
                        )
                    };
                }

                if (isDestinationTerm) {
                    // Always add the course (no merging logic)
                    return {
                        ...term,
                        courses: [...term.courses, conflictingCourse],
                        termCredits:
                            term.termCredits + conflictingCourse.credits
                    };
                }

                return term; // Unaffected terms
            });

            const updatedBanners = generateAllBanners(updatedTerms, courseMap);
            setBannerQueue(updatedBanners);

            return updatedTerms;
        });

        // Remove the resolved banner and reset highlights
        setBannerQueue(prev =>
            prev.filter(banner => banner.id !== courseToResolve.bannerId)
        );
        resetHighlightedCourses();
    };

    const handleScheduleConflictResolution = selectedCourseKey => {
        if (!courseToResolve?.data) {
            return;
        }

        const {conflictingCourses, termCode} = courseToResolve.data;

        setTermsList(prevTerms => {
            const updatedTerms = prevTerms.map(term => {
                if (term.code !== termCode) {
                    return term;
                }

                const updatedCourses = term.courses.filter(courseItem => {
                    const itemKey = getCourseKey(courseItem);

                    const isConflictingCourse = conflictingCourses.some(
                        conflict => isSameCourse(conflict, courseItem)
                    );

                    // Keep the selected course, remove others in the conflict group
                    if (isConflictingCourse) {
                        return itemKey === selectedCourseKey;
                    }

                    return true;
                });

                const updatedCredits = updatedCourses.reduce(
                    (sum, course) => sum + course.credits,
                    0
                );

                return {
                    ...term,
                    courses: updatedCourses,
                    termCredits: updatedCredits
                };
            });

            const updatedTotalCredits = getTotalCredits(updatedTerms);
            setTotalCredits(updatedTotalCredits);

            // REGENERATE BANNERS for fresh state
            const updatedBanners = generateAllBanners(updatedTerms, courseMap);
            setBannerQueue(updatedBanners);

            return updatedTerms;
        });

        // Remove the specific conflict banner
        setBannerQueue(prev =>
            prev.filter(banner => banner.id !== courseToResolve.bannerId)
        );

        resetHighlightedCourses();
    };

    const handleCourseConflictResolution = selectedTermCode => {
        if (!courseToResolve?.data) return;

        const {course, conflictingTerms} = courseToResolve.data;

        setTermsList(prevTerms => {
            const {updatedTerms, updatedTotalCredits} =
                updateTermsWithMovedCourse(
                    prevTerms,
                    course,
                    conflictingTerms,
                    conflictingTerms.find(
                        term => term.code === selectedTermCode
                    ),
                    true // skipAddingToDestination, because the chosen term already has the course
                );

            setTotalCredits(updatedTotalCredits);

            // REGENERATE BANNERS for fresh state
            const updatedBanners = generateAllBanners(updatedTerms, courseMap);
            setBannerQueue(updatedBanners);

            return updatedTerms;
        });

        // Remove the resolved banner & cleanup
        setBannerQueue(prev =>
            prev.filter(banner => banner.id !== courseToResolve.bannerId)
        );
        setCourseToResolve(null);
        resetHighlightedCourses();
    };

    const handleReplacePlan = () => {
        toggleIsReplaceDialogOpen();
        toggleIsSaveDialogOpen();
    };

    const generateAllBanners = (termsList, courseMap) => {
        const banners = [];
        const processed = {
            unavailableConflicts: new Set(),
            courseConflicts: new Set(),
            scheduleConflicts: new Set(),
            creditConflicts: new Set()
        };

        for (const term of termsList) {
            const {courses = []} = term;

            for (const course of courses) {
                const courseKey = getCourseKey(course);

                /**
                 * Adds a banner if the course is unavailable (e.g., not offered in the current term).
                 * Prevents duplicate banners using `processed.unavailableConflicts`.
                 */
                const courseData = courseMap.get(courseKey);
                const availableTerms = courseData?.availableTerms ?? [];
                const unavailableBanner = validateCourseAvailability(
                    course,
                    term,
                    processed.unavailableConflicts,
                    availableTerms
                );

                if (unavailableBanner) {
                    unavailableBanner.onResolve = () => {
                        setCourseToResolve({
                            type: CONFLICT_TYPE.COURSE_UNAVAILABLE,
                            data: {
                                course,
                                termName: term.name,
                                termCode: term.code,
                                availableTerms: availableTerms
                            },
                            bannerId: unavailableBanner.id
                        });
                    };

                    unavailableBanner.onClick = () => {
                        resetHighlightedCourses();
                        const courseWithTerm = {...course, termCode: term.code};
                        highlightCourses([courseWithTerm], [term.code]);
                    };

                    banners.push(unavailableBanner);
                    processed.unavailableConflicts.add(unavailableBanner.id);

                    /**
                     * If the course is unavailable in the current term, we skip checking for
                     * other conflicts (duplicate courses, schedule clashes, etc.) for this course.
                     * This avoids showing redundant or misleading conflict messages for a course
                     * that shouldn't be planned in the current term at all.
                     */
                    continue;
                }

                /**
                 * Adds a banner if the course appears more than once across terms.
                 * Prevents duplicate banners using `processed.courseConflicts`.
                 */

                const courseConflictBanner = validateCourseConflict(
                    course,
                    termsList,
                    processed.courseConflicts,
                    term
                );

                if (courseConflictBanner) {
                    courseConflictBanner.onResolve = () => {
                        setCourseToResolve({
                            type: CONFLICT_TYPE.COURSE_CONFLICT,
                            data: {
                                course,
                                conflictingTerms:
                                    courseConflictBanner.data.conflictingTerms
                            },
                            bannerId: courseConflictBanner.id
                        });
                    };

                    courseConflictBanner.onClick = () => {
                        resetHighlightedCourses();

                        const matchingCourses = [];
                        const termCodesToExpand = [];

                        courseConflictBanner.data.conflictingTerms.forEach(
                            term => {
                                matchingCourses.push({
                                    subject: course.subject,
                                    courseNumber: course.courseNumber,
                                    courseTitle: course.courseTitle,
                                    termCode: term.code
                                });
                                termCodesToExpand.push(term.code);
                            }
                        );

                        highlightCourses(matchingCourses, termCodesToExpand);
                    };

                    banners.push(courseConflictBanner);
                    courseConflictBanner.data.courseConflictKeys.forEach(key =>
                        processed.courseConflicts.add(key)
                    );
                }

                /**
                 * Adds a banner if there is a scheduling conflict with other courses in the same term.
                 * Prevents duplicate banners using `processed.scheduleConflicts`.
                 */
                const scheduleBanners = validateScheduleConflicts(
                    course,
                    term.courses,
                    processed.scheduleConflicts,
                    term
                );

                if (scheduleBanners) {
                    for (const scheduleBanner of scheduleBanners) {
                        scheduleBanner.onResolve = () => {
                            setCourseToResolve({
                                type: CONFLICT_TYPE.SCHEDULE_CONFLICT,
                                data: {
                                    course,
                                    conflictingCourses:
                                        scheduleBanner.data.conflictingCourses.map(
                                            conflictCourse =>
                                                term.courses.find(
                                                    c =>
                                                        c.subject ===
                                                            conflictCourse.subject &&
                                                        c.courseNumber ===
                                                            conflictCourse.courseNumber
                                                )
                                        ),
                                    termName: term.name,
                                    termCode: term.code
                                },
                                bannerId: scheduleBanner.id
                            });
                        };

                        scheduleBanner.onClick = () => {
                            resetHighlightedCourses();

                            const coursesWithTerm = [];
                            const termCodesSet = new Set();

                            for (const conflictCourse of scheduleBanner.data
                                .conflictingCourses) {
                                coursesWithTerm.push({
                                    ...conflictCourse,
                                    termCode: term.code
                                });
                                termCodesSet.add(term.code);
                            }

                            highlightCourses(
                                coursesWithTerm,
                                Array.from(termCodesSet)
                            );
                        };

                        banners.push(scheduleBanner);

                        scheduleBanner.data.conflictKeys.forEach(key =>
                            processed.scheduleConflicts.add(key)
                        );
                    }
                }
            }

            /**
             * Adds a banner if the term's credit count is below the minimum required.
             * Prevents duplicate banners using `processed.creditConflicts`.
             */
            const termCreditBanner = validateTotalTermCredits(
                term,
                processed.creditConflicts,
                term.termCredits
            );

            if (termCreditBanner) {
                banners.push(termCreditBanner);
                processed.creditConflicts.add(termCreditBanner.id);
            }
        }

        /**
         * Adds a banner if the total plan credits are below the program's minimum requirement.
         * Prevents duplicate banners using `processed.creditConflicts`.
         */
        const totalCreditsBanner = validateTotalPlanCredits(
            totalCredits,
            coursePlan.minimumTotalCredits,
            processed.creditConflicts
        );

        if (totalCreditsBanner) {
            banners.push(totalCreditsBanner);
            processed.creditConflicts.add(totalCreditsBanner.id);
        }

        return banners;
    };

    const handleReset = () => {
        // If edit mode: only include future terms
        const filteredTerms = getFilteredTerms(CoursePlanData.terms);

        setTermsList(filteredTerms ?? []);
        setTotalCredits(coursePlan?.totalCredits || 0);
        setBannerQueue([]);
        setIsOriginalAiRecommendation(true);
    };

    const handlePlanChange = ({
        terms,
        totalCredits,
        isOriginalAiRecommendation
    }) => {
        setTermsList(terms);
        setTotalCredits(totalCredits);
        setIsOriginalAiRecommendation(isOriginalAiRecommendation);
    };

    return (
        <Box
            className={
                isEditMode
                    ? classes.infinize__coursePlanEditPage
                    : classes.infinize__coursePlanRecommendationsPage
            }
        >
            {!isEditMode && (
                <Typography variant="h2" color="primary">
                    Course Plan Recommendations
                </Typography>
            )}
            {!isLoading && (
                <BannersList
                    bannerQueue={bannerQueue}
                    dismissBanner={dismissBanner}
                    resetHighlightedCourses={resetHighlightedCourses}
                    isEditMode={isEditMode}
                />
            )}

            <Box
                className={classes.infinize__coursePlanRecommendationsAlignment}
            >
                <Stack
                    direction={{sm: 'column', md: 'row'}}
                    spacing={2}
                    width="100%"
                >
                    <CoursePlanCard
                        coursePlan={coursePlan}
                        isLoading={isLoading}
                        onRestart={onRestart}
                        onReset={handleReset}
                        addBannerToQueue={addBannerToQueue}
                        bannerQueue={bannerQueue}
                        setBannerQueue={setBannerQueue}
                        termsList={termsList}
                        setTermsList={setTermsList}
                        highlightedCourses={highlightedCourses}
                        setHighlightedCourses={setHighlightedCourses}
                        totalCredits={totalCredits}
                        setTotalCredits={setTotalCredits}
                        isOriginalAiRecommendation={isOriginalAiRecommendation}
                        setIsOriginalAiRecommendation={
                            setIsOriginalAiRecommendation
                        }
                        isEditMode={isEditMode}
                        termsToBeHidden={termsToBeHidden}
                        courseMap={courseMap}
                        termMap={termMap}
                        resetHighlightedCourses={resetHighlightedCourses}
                        coursesList={coursesList}
                        coursePlanName={coursePlanName}
                        setCoursePlanName={setCoursePlanName}
                        onPlanChange={handlePlanChange}
                        courseToResolve={courseToResolve}
                        setCourseToResolve={setCourseToResolve}
                        highlightedTermCodes={highlightedTermCodes}
                        setHighlightedTermCodes={setHighlightedTermCodes}
                    />
                    {!isEditMode && (
                        <AdditionalRecommendations
                            additionalRecommendations={
                                additionalRecommendations
                            }
                            isEditMode={true}
                            isLoading={isLoading}
                        />
                    )}
                </Stack>
            </Box>
            {!isLoading && (
                <Box className={classes.infinize__coursePlanCardButtons}>
                    <ActionButtons
                        onSave={() => {
                            if (isEditMode) {
                                openEditPlanDialog();
                            } else {
                                if (
                                    CoursePlanData.coursePlans?.length ===
                                    COURSE_PLAN_MAX_LIMIT
                                ) {
                                    toggleIsReplaceDialogOpen();
                                } else {
                                    toggleIsSaveDialogOpen();
                                }
                            }
                        }}
                        onCancel={handleCancel}
                        isEditMode={isEditMode}
                        bannerQueue={bannerQueue}
                        coursePlanName={coursePlanName}
                    />
                </Box>
            )}
            {isSaveInProgress && <Loader isOpen={isSaveInProgress} />}

            {/* Save Dialog */}
            {isSaveDialogOpen && (
                <SavePlanDialog
                    isOpen={isSaveDialogOpen}
                    onClose={toggleIsSaveDialogOpen}
                    onSave={handleSave}
                />
            )}

            {/* Replace Paln Dialog */}
            {isReplaceDialogOpen && (
                <ReplacePlanDialog
                    isOpen={isReplaceDialogOpen}
                    onClose={toggleIsReplaceDialogOpen}
                    onReplace={handleReplacePlan}
                    existingPlans={CoursePlanData.coursePlans}
                />
            )}

            {courseToResolve?.type === CONFLICT_TYPE.SCHEDULE_CONFLICT && (
                <ScheduleConflictDialog
                    onClose={() => {
                        setCourseToResolve(null);
                        resetHighlightedCourses();
                    }}
                    conflictedCourses={courseToResolve.data}
                    onSubmit={selectedOption => {
                        handleScheduleConflictResolution(selectedOption);
                        setCourseToResolve(null);
                    }}
                />
            )}

            {courseToResolve?.type === CONFLICT_TYPE.COURSE_UNAVAILABLE && (
                <CourseUnavailableDialog
                    onClose={() => {
                        setCourseToResolve(null);
                        resetHighlightedCourses();
                    }}
                    courseInfo={courseToResolve.data}
                    availableTermsList={courseToResolve.data.availableTerms?.reduce(
                        (termOptions, termCode) => {
                            const term = termMap.get(termCode);
                            if (term) {
                                termOptions.push({
                                    label: term.name,
                                    value: term.code
                                });
                            }
                            return termOptions;
                        },
                        []
                    )}
                    onSubmit={selectedTermCode => {
                        handleCourseUnavailableResolution(
                            courseToResolve.data.course,
                            courseToResolve.data.termCode,
                            selectedTermCode
                        );
                        setCourseToResolve(null);
                    }}
                />
            )}
            {courseToResolve?.type === CONFLICT_TYPE.COURSE_CONFLICT && (
                <CourseConflictDialog
                    onClose={() => {
                        setCourseToResolve(null);
                        resetHighlightedCourses();
                    }}
                    conflictData={courseToResolve.data}
                    onSubmit={selectedTerm => {
                        handleCourseConflictResolution(selectedTerm);
                        setCourseToResolve(null);
                    }}
                />
            )}
        </Box>
    );
}
