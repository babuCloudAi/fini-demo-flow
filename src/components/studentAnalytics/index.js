import {Box, Grid} from '@mui/material';
import GradeTrend from './gradeTrend';
import Attendance from './attendance';
import AssignmentGradeDistribution from './assignmentGradeDistribution';
import DiscussionBoardActivity from './discussionBoardActivity';
import CourseResourceAccess from './courseResourceAccess';
import PageViews from './pageViews';
import CourseModuleCompletion from './courseModuleCompletion';
import classes from './studentAnalytics.module.css';
import AssignmentSubmissions from './assignmentSubmissions';

export default function StudentAnalytics({selectedCourse}) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={3}
            className={classes.infinize__analyticsContainer}
        >
            <CourseModuleCompletion selectedCourse={selectedCourse} />
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 5}}>
                    <GradeTrend />
                </Grid>
                <Grid size={{xs: 12, md: 7}}>
                    <Grid container spacing={3} height={'100%'}>
                        <Grid size={{xs: 12, md: 6}}>
                            <Attendance />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <AssignmentSubmissions />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 5}}>
                    <AssignmentGradeDistribution />
                </Grid>
                <Grid size={{xs: 12, md: 7}}>
                    <CourseResourceAccess />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 5}}>
                    <PageViews />
                </Grid>
                <Grid size={{xs: 12, md: 7}}>
                    <DiscussionBoardActivity />
                </Grid>
            </Grid>
        </Box>
    );
}
