'use client';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import React, {useState} from 'react';
import chartContent from '@/data/studentAnalytics/discussionBoardActivity.json';
import {InfinizeGroupedBarChart} from '../common';

export default function DiscussionBoardActivity() {
    const [discussionData, setDiscussionData] = useState(
        chartContent.data || []
    );

    const discussionActivityLabels = {
        studentPosts: 'Posts by Student',
        studentReplies: 'Replies by Student',
        courseAvgPosts: 'Avg Posts in Course',
        courseAvgReplies: 'Avg Replies in Course'
    };

    return (
        <Box className={classes.infinize__analyticsSubSection}>
            <InfinizeGroupedBarChart
                data={discussionData}
                title="Discussion Board Activity Time"
                labelMap={discussionActivityLabels}
            />
        </Box>
    );
}
