'use client';
import {useState} from 'react';
import {InfinizeDialog} from '@/components/common';
import {RadioGroupField} from '@/components/common/form';
import {Typography, Box, Stack} from '@mui/material';
import styles from '../../coursePlan.module.css';
import {getCourseKey} from './utils';

export default function ScheduleConflictDialog({
    onClose,
    conflictedCourses,
    onSubmit
}) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const courses = conflictedCourses?.conflictingCourses;

    if (!courses) {
        return null;
    }
    return (
        <InfinizeDialog
            isOpen
            onClose={onClose}
            maxWidth="sm"
            title="Course Schedule Conflict"
            contentText={
                <>
                    The course{' '}
                    {courses.length > 0 && (
                        <Typography component="span" fontSize={14}>
                            <Typography component="span" fontWeight={500}>
                                {courses[0].subject} {courses[0].courseNumber} -{' '}
                                {courses[0].courseTitle}
                            </Typography>
                        </Typography>
                    )}{' '}
                    has a scheduling conflict in{' '}
                    <Typography component="span" fontWeight={500}>
                        {conflictedCourses.termName}
                    </Typography>
                </>
            }
            primaryButtonLabel="Continue"
            onPrimaryButtonClick={() => onSubmit(selectedCourse)}
            isPrimaryButtonDisabled={!selectedCourse}
        >
            <Box width="100%">
                <Typography
                    className={styles.infinize__coursePlanDialogInputHeading}
                >
                    Please select one course to keep.
                </Typography>
                <RadioGroupField
                    id="course"
                    name="course"
                    value={selectedCourse}
                    direction="column"
                    options={courses.map((conflict, index) => {
                        return {
                            value: getCourseKey(conflict),
                            label: (
                                <Stack pb={2}>
                                    <Typography
                                        className={
                                            styles.infinize__coursePlanDialogLabel
                                        }
                                    >
                                        {conflict.subject}{' '}
                                        {conflict.courseNumber}-
                                        {conflict.courseTitle}
                                    </Typography>
                                    <Typography
                                        className={
                                            styles.infinize__coursePlanDialogSpan
                                        }
                                        fontSize={12}
                                    >
                                        ({' '}
                                        {conflict.schedule
                                            .map(
                                                schedule =>
                                                    `${schedule.days} ${schedule.time}`
                                            )
                                            .join(', ')}
                                        )
                                    </Typography>
                                </Stack>
                            )
                        };
                    })}
                    onChange={setSelectedCourse}
                    radioProps={{
                        className: styles.infinize__coursePlanDialogRadio
                    }}
                    labelProps={{
                        className: styles.infinize__coursePlanDialogControlLabel
                    }}
                />
            </Box>
        </InfinizeDialog>
    );
}
