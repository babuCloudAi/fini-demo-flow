'use client';
import React, {useState} from 'react';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import chartContent from '@/data/studentAnalytics/assignment.json';
import {InfinizePieChart} from '../common';
import {LEGEND_PLACEMENT} from '@/config/constants';

export default function AssignmentGradeDistribution() {
    const [assignmentData, setAssignmentData] = useState(chartContent);

    const assignmentLabels = {
        projects: 'Projects',
        exams: 'Exams',
        quizzes: 'Quizzes'
    };

    return (
        <Box className={classes.infinize__analyticsSubSection}>
            <InfinizePieChart
                data={assignmentData}
                legendPlacement={LEGEND_PLACEMENT.RIGHT}
                title="Assignment Grade Distribution"
                labelMap={assignmentLabels}
            />
        </Box>
    );
}
