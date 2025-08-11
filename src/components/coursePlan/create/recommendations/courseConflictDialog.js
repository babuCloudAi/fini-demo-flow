'use client';
import {useState} from 'react';
import {Typography, Box} from '@mui/material';
import {InfinizeDialog} from '@/components/common';
import {RadioGroupField} from '@/components/common/form';
import styles from '../../coursePlan.module.css';

export default function CourseConflictDialog({
    onClose,
    conflictData,
    onSubmit
}) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const course = conflictData?.course;
    const conflictingTerms = conflictData?.conflictingTerms;

    if (!course || !conflictingTerms) {
        return;
    }

    return (
        <InfinizeDialog
            isOpen
            onClose={onClose}
            title="Course Conflict!"
            contentText={
                <>
                    <Typography component="span" fontWeight={500}>
                        {course.subject} {course.courseNumber} -{' '}
                        {course.courseTitle}
                    </Typography>{' '}
                    is currently scheduled in multiple terms, which creates a
                    conflict.
                </>
            }
            primaryButtonLabel="Continue"
            onPrimaryButtonClick={() => {
                onSubmit(selectedCourse); // selectedCourse will be one of the terms
            }}
            isPrimaryButtonDisabled={!selectedCourse}
            maxWidth="sm"
        >
            <Box>
                <Typography
                    className={`${styles.infinize__coursePlanDialogInputHeading} ${styles.noMargin}`}
                >
                    Which term would you like to keep this course in?
                </Typography>
                <Typography
                    fontSize={14}
                    mb={1}
                    className={styles.infinize__coursePlanDialogSpan}
                >
                    Selecting one term will remove this course from all other
                    scheduled terms.
                </Typography>
                <RadioGroupField
                    id="course"
                    name="course"
                    value={selectedCourse}
                    options={conflictingTerms.map(term => ({
                        value: term.code,
                        label: term.name
                    }))}
                    labelProps={{
                        className: styles.infinize__coursePlanDialogLabel
                    }}
                    onChange={setSelectedCourse}
                    direction="column"
                />
            </Box>
        </InfinizeDialog>
    );
}
