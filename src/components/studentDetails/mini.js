'use client';
import {Box, Skeleton, Stack} from '@mui/material';
import classes from './studentDetails.module.css';
import Image from 'next/image';
import StudentInfo from './studentInfo';

export default function MiniStudentDetails({studentInfo, isLoading}) {
    return (
        <Stack
            className={classes.infinize__studentDetails}
            spacing={2}
            alignItems={{xs: 'center', sm: 'start'}}
        >
            {isLoading && <Skeleton width="100%" height={98} />}
            {!isLoading && studentInfo && (
                <Box
                    display={{sm: 'block', md: 'flex'}}
                    alignItems={'center'}
                    gap={2}
                >
                    <Image
                        src={studentInfo.photo}
                        alt="Sutentimg"
                        width={50}
                        height={50}
                    />
                    <Stack
                        spacing={3}
                        direction={'column'}
                        alignItems={{xs: 'center', sm: 'start'}}
                    >
                        <StudentInfo studentInfo={studentInfo} isMini={true} />
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}
