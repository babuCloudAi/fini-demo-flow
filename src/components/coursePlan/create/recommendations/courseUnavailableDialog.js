'use client';
import {useState} from 'react';
import {InfinizeDialog} from '@/components/common';
import {SelectField} from '@/components/common/form';
import {Typography, Box} from '@mui/material';
import styles from '../../coursePlan.module.css';

export default function CourseUnavailableDialog({
    onClose,
    onSubmit,
    courseInfo,
    availableTermsList
}) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <InfinizeDialog
            isOpen
            onClose={onClose}
            maxWidth="sm"
            title="Course Unavailable!"
            contentText={
                courseInfo && (
                    <>
                        The Course{' '}
                        <Typography component="span" fontWeight={500}>
                            {courseInfo.course.subject}{' '}
                            {courseInfo.course.courseNumber} -{' '}
                            {courseInfo.course.courseTitle}
                        </Typography>{' '}
                        is not available in{' '}
                        <Typography component="span" fontWeight={500}>
                            {courseInfo.termName}.
                        </Typography>
                    </>
                )
            }
            primaryButtonLabel="Continue"
            onPrimaryButtonClick={() => {
                onSubmit(selectedCourse);
            }}
            isPrimaryButtonDisabled={!selectedCourse}
        >
            <Box width="100%">
                <Typography
                    className={styles.infinize__coursePlanDialogInputHeading}
                >
                    You can move this course to any of the following semesters.
                </Typography>
                <SelectField
                    id="targetTerm"
                    name="targetTerm"
                    value={selectedCourse}
                    options={availableTermsList}
                    onChange={setSelectedCourse}
                />
            </Box>
        </InfinizeDialog>
    );
}
