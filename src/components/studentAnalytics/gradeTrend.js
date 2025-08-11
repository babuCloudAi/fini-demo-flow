'use client';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import React, {useState} from 'react';
import {InfinizeAreaChart} from '../common';
import chartContent from '@/data/studentAnalytics/gradeTrend.json';

export default function GradeTrend() {
    const [gradeTrendData, setGradeTrendData] = useState(chartContent || []);

    return (
        <Box className={classes.infinize__analyticsSubSection}>
            <InfinizeAreaChart
                data={gradeTrendData}
                title="Grade Trend"
                xDataKey="week"
                yDataKey="grade"
                isValueInPercentage={true}
            />
        </Box>
    );
}
