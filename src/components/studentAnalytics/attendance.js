'use client';
import {Box} from '@mui/material';
import classes from './studentAnalytics.module.css';
import React, {useState} from 'react';
import chartContent from '@/data/studentAnalytics/attendance.json';
import {InfinizePieChart} from '../common';
import {LEGEND_PLACEMENT} from '@/config/constants';

export default function Attendance() {
    const [attendanceData, setAttendanceData] = useState(chartContent.data);

    const attendenceLabels = {
        tardy: 'Tardy',
        present: 'Present',
        absent: 'Absent'
    };

    return (
        <Box className={classes.infinize__analyticsSubSection}>
            <InfinizePieChart
                data={attendanceData}
                legendPlacement={LEGEND_PLACEMENT.BELOW}
                title="Attendance"
                labelMap={attendenceLabels}
            />
        </Box>
    );
}
