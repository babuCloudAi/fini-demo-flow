import {Box, Skeleton} from '@mui/material';
import classes from '../../coursePlan.module.css';
import CoursePlan from './coursePlan';

export default function CoursePlanCard({
    isLoading,
    coursePlan,
    onRestart,
    onReset,
    addBannerToQueue,
    bannerQueue,
    setBannerQueue,
    termsList,
    setTermsList,
    highlightedCourses,
    setHighlightedCourses,
    totalCredits,
    setTotalCredits,
    isOriginalAiRecommendation,
    setIsOriginalAiRecommendation,
    isEditMode,
    termCodesToDisable,
    courseMap,
    termMap,
    resetHighlightedCourses,
    coursesList,
    coursePlanName,
    setCoursePlanName,
    termsToBeHidden,
    onPlanChange,
    courseToResolve,
    setCourseToResolve,
    highlightedTermCodes,
    setHighlightedTermCodes
}) {
    return (
        <Box
            className={classes.infinize__coursePlanCards}
            width={isEditMode ? '100%' : {md: '66%', sm: '100%'}}
        >
            <Box
                className={classes.infinize__coursePlanCardWithButtons}
                height={isEditMode ? 'auto' : '700px'}
            >
                {isLoading && (
                    <Box width="100%" padding={2}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={100}
                        />
                        <Box mt={2} />

                        <Skeleton variant="heading" width="100%" height={30} />
                        <Box mt={2} />

                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <Skeleton
                                    key={`section1_text_${index}`}
                                    variant="text"
                                    width="100%"
                                    height={40}
                                />
                            ))}

                        <Box mt={2} />
                        <Skeleton variant="heading" width="100%" height={30} />
                        <Box mt={2} />

                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <Skeleton
                                    key={`section2_text_${index}`}
                                    variant="text"
                                    width="100%"
                                    height={40}
                                />
                            ))}

                        <Box mt={2} />
                        <Skeleton variant="heading" width="100%" height={30} />
                        <Box mt={2} />

                        <Skeleton variant="text" width="100%" height={40} />
                    </Box>
                )}
                {!isLoading && coursePlan && (
                    <CoursePlan
                        coursePlan={coursePlan}
                        onRestart={onRestart}
                        onReset={onReset}
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
                        termCodesToDisable={termCodesToDisable}
                        courseMap={courseMap}
                        termMap={termMap}
                        resetHighlightedCourses={resetHighlightedCourses}
                        coursesList={coursesList}
                        coursePlanName={coursePlanName}
                        setCoursePlanName={setCoursePlanName}
                        termsToBeHidden={termsToBeHidden}
                        onPlanChange={onPlanChange}
                        courseToResolve={courseToResolve}
                        setCourseToResolve={setCourseToResolve}
                        highlightedTermCodes={highlightedTermCodes}
                        setHighlightedTermCodes={setHighlightedTermCodes}
                    />
                )}
            </Box>
        </Box>
    );
}
