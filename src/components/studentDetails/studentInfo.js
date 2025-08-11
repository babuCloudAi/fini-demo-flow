'use client';
import {Box, Stack, Typography} from '@mui/material';
import classes from './studentDetails.module.css';
import Link from 'next/link';
import {useParams} from 'next/navigation';

export default function StudentInfo({studentInfo, isMini = false}) {
    const {studentId} = useParams();

    return (
        <Stack
            direction={{sm: 'column', md: 'row'}}
            spacing={{xs: 2, sm: 4, md: 6, lg: 8}}
        >
            <Stack>
                {isMini && (
                    <>
                        <Link href={`/student/${studentId}`} passHref>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color="primary"
                            >
                                {studentInfo.name}
                            </Typography>
                        </Link>

                        <Typography variant="body1">
                            <span>ID: </span> {studentInfo.studentId}
                        </Typography>
                    </>
                )}
                {!isMini && (
                    <>
                        <Typography variant="h4" fontWeight="bold">
                            ID
                        </Typography>
                        <Typography variant="body1">
                            {studentInfo.studentId}
                        </Typography>
                    </>
                )}
            </Stack>
            {isMini && (
                <Box className={classes.infinize__studentDetailsBR}></Box>
            )}
            <Stack>
                <Typography variant="h4" fontWeight="bold">
                    Phone:
                </Typography>
                <Typography variant="body1">{studentInfo.phone}</Typography>
            </Stack>
            {isMini && (
                <Box className={classes.infinize__studentDetailsBR}></Box>
            )}
            <Stack>
                <Typography variant="h4" fontWeight="bold">
                    Email:
                </Typography>
                <Typography variant="body1">{studentInfo.email}</Typography>
            </Stack>
            {isMini && (
                <Box className={classes.infinize__studentDetailsBR}></Box>
            )}
            <Stack>
                <Typography variant="h4" fontWeight="bold">
                    Major:
                </Typography>
                <Typography variant="body1">{studentInfo.major}</Typography>
            </Stack>
            {isMini && (
                <Box className={classes.infinize__studentDetailsBR}></Box>
            )}
            <Stack>
                <Typography variant="h4" fontWeight="bold">
                    Level:
                </Typography>
                <Typography variant="body1">{studentInfo.level}</Typography>
            </Stack>
        </Stack>
    );
}
