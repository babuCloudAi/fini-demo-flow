'use client';
import {CoursePlans} from '../coursePlan';
import {Box} from '@mui/material';
import Housing from '../housing';
import CreditsCompleted from '../creditsCompleted';
import Holds from '../holds';
import MajorChangeHistory from '../majorChangeHistory';
import EnrollmentDetails from '../enrollmentDetails';
import {CareerRecommendations} from '../careerRecommendations';
import {Notes} from '../notes';
import {AlertsAndNudges} from '../alertsAndNudges';

export default function Profile() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{overflow: 'hidden', width: '100%'}}
            mt={3}
        >
            <EnrollmentDetails />

            <AlertsAndNudges />

            <Notes />

            <Box
                display="flex"
                flexDirection={{xs: 'column', md: 'row'}}
                width="100%"
                gap={3}
                alignItems="stretch"
            >
                <Box
                    sx={{
                        width: {xs: '100%', md: '50%'}
                    }}
                >
                    <Holds />
                </Box>

                <Box
                    sx={{
                        width: {xs: '100%', md: '50%'}
                    }}
                >
                    <CreditsCompleted />
                </Box>
            </Box>

            <Box
                display="flex"
                flexDirection={{xs: 'column', md: 'row'}}
                width="100%"
                gap={3}
                alignItems="stretch"
            >
                <Box
                    sx={{
                        width: {xs: '100%', md: '50%'}
                    }}
                >
                    <Housing />
                </Box>

                <Box
                    sx={{
                        width: {xs: '100%', md: '50%'}
                    }}
                >
                    <MajorChangeHistory />
                </Box>
            </Box>

            <CoursePlans />

            <CareerRecommendations />
        </Box>
    );
}
