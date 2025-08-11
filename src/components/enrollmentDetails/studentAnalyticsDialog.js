import React from 'react';
import {InfinizeDialog} from '../common';
import StudentAnalytics from '../studentAnalytics';

export default function StudentAnalyticsDialog({
    isOpen,
    onClose,
    selectedCourse
}) {
    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="lg"
            title={"Student's Course Analytics"}
        >
            <StudentAnalytics selectedCourse={selectedCourse} />
        </InfinizeDialog>
    );
}
