'use client';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import chartContent from '@/data/studentAnalytics/courseResourceAccess.json';
import React, {useState} from 'react';
import {InfinizeBarChart} from '../common';

export default function CourseResourceAccess() {
    const [courseResourceData, setCourseResourceData] = useState(chartContent);

    const courseResourceLabels = {
        lectureNotes: 'Lecture Notes',
        additionalReadings: 'Additional Readings'
    };

    return (
        <Box
            className={classes.infinize__analyticsSubSection}
            sx={{width: '100%', overflow: 'auto'}}
        >
            <InfinizeBarChart
                data={courseResourceData}
                title="Course Resource Access"
                labelMap={courseResourceLabels}
            />
        </Box>
    );
}
