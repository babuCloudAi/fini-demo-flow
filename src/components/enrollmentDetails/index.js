'use client';
import React, {useState} from 'react';
import {Box, Tabs, Tab} from '@mui/material';
import classes from './tabs.module.css';
import CurrentEnrollment from './currentEnrollment';
import EnrollmentHistory from './enrollmentHistory';

export default function EnrollmentDetails() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => setActiveTab(newValue);

    return (
        <Box
            sx={{width: '100%'}}
            className={classes.infinize__enrollmentTabsContainer}
        >
            <Tabs
                value={activeTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                className={classes.infinize__enrollmentTabsBorder}
            >
                <Tab
                    label="Current Enrollment"
                    className={classes.infinize__enrollmentTabs}
                />
                <Tab
                    label="Enrollment History"
                    className={classes.infinize__enrollmentTabs}
                />
            </Tabs>

            {activeTab === 0 && <CurrentEnrollment />}
            {activeTab === 1 && <EnrollmentHistory />}
        </Box>
    );
}
