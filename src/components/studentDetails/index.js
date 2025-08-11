'use client';
import {useParams, usePathname} from 'next/navigation';
import Details from './details';
import MiniStudentDetails from './mini';
import student from '@/data/studentDetails/studentInfo.json';
import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import classes from './studentDetails.module.css';
import Credits from './credits';

export default function StudentDetails() {
    const {studentId} = useParams();
    const pathname = usePathname();

    // Checking if the URL ends with studentId (no extra segments)
    const isBasePath = pathname.endsWith(`/${studentId}`);

    const [studentInfo, setStudentInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setStudentInfo(student);
        setIsLoading(false); // TODO: Remove this on API integration
    }, []);

    return (
        <div>
            {isBasePath && (
                <Box
                    className={classes.infinize__studentDetails}
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        gap: 3
                    }}
                >
                    <Details isLoading={isLoading} studentInfo={studentInfo} />
                    <Box
                        sx={{
                            minWidth: 180,
                            margin: 'auto'
                        }}
                    >
                        <Credits />
                    </Box>
                </Box>
            )}
            {!isBasePath && (
                <MiniStudentDetails
                    isLoading={isLoading}
                    studentInfo={studentInfo}
                />
            )}
        </div>
    );
}
