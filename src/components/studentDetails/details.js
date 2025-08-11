'use client';
import {Box, Skeleton, Typography} from '@mui/material';
import Image from 'next/image';
import StudentInfo from './studentInfo';
export default function Details({studentInfo, isLoading}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 3,
                width: '100%',
                borderRight: '1px solid #EBF2FD',
                pr: 2
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="primary">
                Student Details
            </Typography>
            {isLoading && <Skeleton width="100%" height={98} />}
            {!isLoading && studentInfo && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Image
                        src={studentInfo.photo}
                        alt="Student Profile"
                        width={95}
                        height={95}
                    />
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary"
                            mb={2}
                        >
                            {studentInfo.name}
                        </Typography>
                        <StudentInfo studentInfo={studentInfo} />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
