'use client';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import React, {useState} from 'react';
import chartContent from '@/data/studentAnalytics/assignmentSubmissions.json';
import {InfinizePieChart} from '../common';
import {LEGEND_PLACEMENT} from '@/config/constants';

export default function AssignmentSubmissions() {
    const [assignmentSubmissions, setAssignmentSubmissions] =
        useState(chartContent);

    const lateSubmissionsLabels = {
        onTime: 'On-Time',
        late: 'Late',
        missed: 'Missed'
    };

    return (
        <Box className={classes.infinize__analyticsSubSection}>
            <InfinizePieChart
                data={assignmentSubmissions}
                legendPlacement={LEGEND_PLACEMENT.BELOW}
                title="Assignment Submissions"
                labelMap={lateSubmissionsLabels}
            />
        </Box>
    );
}
