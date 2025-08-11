import React, {useEffect, useState} from 'react';
import {Box, Skeleton, Typography} from '@mui/material';
import {getColumns} from './columns';
import currentEnrollmentData from '@/data/studentProfile/currentEnrollment.json';
import StudentAnalyticsDialog from './studentAnalyticsDialog';
import {InfinizeTable} from '../common';
import classes from '../studentProfile/studentProfile.module.css';

export default function CurrentEnrollment() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentEnrollment, setCurrentEnrollment] = useState();
    const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const toggleIsStatsDialogOpen = () => {
        setIsStatsDialogOpen(prev => !prev);
    };

    const toggleIsLoading = () => {
        setIsLoading(prev => !prev);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentEnrollment(currentEnrollmentData ?? []);
            toggleIsLoading(); // toggle *after* the data is set
        }, 200);

        // Cleanup
        return () => clearTimeout(timer);

        // TODO: Remove this on API integration
    }, []);

    const handleViewStats = (rowData = null) => {
        toggleIsStatsDialogOpen();
        setSelectedCourse(rowData);
    };

    return (
        <Box>
            {isLoading && (
                <Box px={2}>
                    <Skeleton width="100%" height={400} />
                </Box>
            )}
            {!isLoading && (
                <>
                    {currentEnrollment?.title && (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                my: 2,
                                ml: 2,
                                color: 'primary.main'
                            }}
                        >
                            {currentEnrollment?.title}
                        </Typography>
                    )}

                    <InfinizeTable
                        columns={getColumns(handleViewStats)}
                        rows={currentEnrollment?.currentEnrollment}
                        customClassName={classes.infinize__profileDataGrid}
                    />
                </>
            )}
            {isStatsDialogOpen && (
                <StudentAnalyticsDialog
                    isOpen={isStatsDialogOpen}
                    onClose={toggleIsStatsDialogOpen}
                    selectedCourse={selectedCourse}
                />
            )}
        </Box>
    );
}
