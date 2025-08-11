'use client';
import React, {useState, useEffect} from 'react';
import {Box, Tabs, Tab, Skeleton} from '@mui/material';
import classes from './viewAllAlerts.module.css';
import alertsData from '@/data/alertsAndNudges/nudge.json';
import {ALERT_TYPE} from '@/config/constants';
import AlertsList from './alertsList';

export default function ViewAllAlerts() {
    const [activeTab, setActiveTab] = useState(0);
    const [alertsWithIds, setAlertsWithIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alerts, setAlerts] = useState([]);
    const [accomplishments, setAccomplishments] = useState([]);

    //  Build alertsWithIds from alertsData
    useEffect(() => {
        if (alertsData?.alerts?.length) {
            const enrichedAlerts = alertsData.alerts.map((alert, index) => ({
                ...alert,
                id: `${index}`
            }));
            setAlertsWithIds(enrichedAlerts);
        }
    }, [alertsData]);

    //  Filter alerts and accomplishments from alertsWithIds
    useEffect(() => {
        const alertTypeFiltered = alertsWithIds.filter(
            alert => alert.type === ALERT_TYPE.ALERT
        );
        const successTypeFiltered = alertsWithIds.filter(
            alert => alert.type === ALERT_TYPE.ACCOMPLISHMENT
        );

        setAlerts(alertTypeFiltered);
        setAccomplishments(successTypeFiltered);
    }, [alertsWithIds]);

    const handleTabChange = (event, newValue) => setActiveTab(newValue);

    const toggleIsLoading = isLoading => {
        setIsLoading(isLoading);
    };

    useEffect(() => {
        toggleIsLoading(true); // start loading immediately
        const timer = setTimeout(() => {
            toggleIsLoading(false); // stop loading after 2 seconds
        }, 2000);

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
        <Box
            sx={{width: '100%'}}
            className={classes.infinize__viewAllAlertsContainer}
        >
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                className={classes.infinize__viewAllAlertsTabsBorder}
            >
                <Tab
                    label="Alerts"
                    className={classes.infinize__viewAllAlertsTab}
                />
                <Tab
                    label="Accomplishments"
                    className={classes.infinize__viewAllAlertsTab}
                />
            </Tabs>

            {activeTab === 0 && (
                <>
                    <AlertsList
                        alertsList={alerts}
                        alertType={ALERT_TYPE.ALERT}
                        isLoading={isLoading}
                    />
                </>
            )}
            {activeTab === 1 && (
                <>
                    <AlertsList
                        alertsList={accomplishments}
                        alertType={ALERT_TYPE.ACCOMPLISHMENT}
                        isLoading={isLoading}
                    />
                </>
            )}
        </Box>
    );
}
