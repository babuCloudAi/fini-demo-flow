'use client';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import React, {useState} from 'react';
import chartContent from '@/data/studentAnalytics/pageViews.json';
import {InfinizeBarChart} from '../common';

export default function PageViews() {
    const [pageViewsData, setPageViewsData] = useState(chartContent);

    const pageViewLabels = {
        week1: 'Week 1',
        week2: 'Week 2',
        week3: 'Week 3',
        week4: 'Week 4',
        week5: 'Week 5',
        week6: 'Week 6'
    };
    return (
        <Box className={classes.infinize__analyticsSubSection}>
            <InfinizeBarChart
                data={pageViewsData}
                title="Page Views"
                labelMap={pageViewLabels}
            />
        </Box>
    );
}
