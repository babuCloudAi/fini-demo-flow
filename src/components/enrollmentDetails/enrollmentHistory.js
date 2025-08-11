import React, {useEffect, useState} from 'react';
import {Box, IconButton, Skeleton, Typography} from '@mui/material';
import {getColumns} from './columns';
import {InfinizeIcon, InfinizeTable} from '@/components/common';
import enrollmentData from '@/data/studentProfile/enrollmentHistory.json';
import classes from './tabs.module.css';
import StudentAnalyticsDialog from './studentAnalyticsDialog';
import tableClasses from '../studentProfile/studentProfile.module.css';

export default function EnrollmentHistory() {
    const [selectedTermIndex, setSelectedTermIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [enrollmentHistory, setEnrollmentHistory] = useState();
    const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const toggleIsStatsDialogOpen = () => {
        setIsStatsDialogOpen(prev => !prev);
    };

    const handleViewStats = (rowData = null) => {
        toggleIsStatsDialogOpen();
        setSelectedCourse(rowData);
    };
    const toggleIsLoading = () => {
        setIsLoading(prev => !prev);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setEnrollmentHistory(enrollmentData || []);
            toggleIsLoading();
        }, 200);

        // Cleanup
        return () => clearTimeout(timer);

        // TODO: Remove this on API integration
    }, []);

    const handlePrevious = () => {
        if (selectedTermIndex > 0) {
            setSelectedTermIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (selectedTermIndex < enrollmentHistory.length - 1) {
            setSelectedTermIndex(prev => prev + 1);
        }
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
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={2}
                    >
                        {enrollmentHistory?.[selectedTermIndex]?.title && (
                            <Typography
                                variant="h6"
                                sx={{fontWeight: 'bold', color: 'primary.main'}}
                            >
                                {enrollmentHistory?.[selectedTermIndex]?.title}
                            </Typography>
                        )}

                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                                onClick={handlePrevious}
                                disabled={selectedTermIndex === 0}
                                className={classes.infinize__navButton}
                            >
                                <InfinizeIcon icon="ic:round-chevron-left" />
                            </IconButton>

                            <IconButton
                                onClick={handleNext}
                                disabled={
                                    enrollmentHistory?.length === 0 ||
                                    selectedTermIndex ===
                                        enrollmentHistory?.length - 1
                                }
                                className={classes.infinize__navButton}
                            >
                                <InfinizeIcon icon="majesticons:chevron-right" />
                            </IconButton>
                        </Box>
                    </Box>
                    <InfinizeTable
                        columns={getColumns(handleViewStats)}
                        customClassName={tableClasses.infinize__profileDataGrid}
                        rows={
                            enrollmentHistory?.[selectedTermIndex]
                                ?.enrolledCourses || []
                        }
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
