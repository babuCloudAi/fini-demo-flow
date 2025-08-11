'use client';
import {useState, useEffect} from 'react';
import {Grid, Button, Skeleton, Stack, Box} from '@mui/material';
import {NoResults, Widget} from '@/components/common';
import nudgeData from '@/data/alertsAndNudges/nudge.json';
import styles from '../alertsAndNudges.module.css';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import {ALERTS_ON_DASHBOARD_MAX_LIMIT} from '@/config/constants';
import UnreadCountChip from '../unreadCountChip';
import AlertCard from './alertCard';

export default function AlertsAndNudges() {
    const {studentId} = useParams();
    const [isExpanded, setIsExpanded] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        //  TODO  display unread items on the top on the dashboard
        setAlerts(nudgeData.alerts);

        setTimeout(() => setIsLoading(false), 2000); // TODO remove this logic after API integration.
    }, []);

    const toggleIsExpanded = () => {
        setIsExpanded(prev => !prev);
    };
    return (
        <Widget
            expanded={isExpanded}
            onChange={toggleIsExpanded}
            title="Alerts & Nudges"
            titleAdornment={
                !isLoading &&
                alerts.length > 0 && <UnreadCountChip alerts={alerts} />
            }
            actions={
                !isLoading &&
                alerts.length > ALERTS_ON_DASHBOARD_MAX_LIMIT && (
                    <Button
                        variant="outlined"
                        onClick={e => e.stopPropagation()}
                        component={Link}
                        className="infinize__button"
                        href={`/student/${studentId}/alerts`}
                    >
                        View All
                    </Button>
                )
            }
        >
            {isLoading && (
                <Stack direction="row" gap={2} p={2}>
                    {Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} width="33%" height={200} />
                        ))}
                </Stack>
            )}
            {!isLoading && alerts.length > 0 && (
                <Grid
                    className={styles.infinize__nudgesCards}
                    container
                    spacing={2}
                >
                    {alerts
                        .slice(0, ALERTS_ON_DASHBOARD_MAX_LIMIT)
                        .map((alert, index) => (
                            <Grid key={`alert_${index}`} size={{xs: 12, md: 4}}>
                                <AlertCard alert={alert} />
                            </Grid>
                        ))}
                </Grid>
            )}

            {!isLoading && alerts.length === 0 && (
                <Box display={'flex'} justifyContent={'center'}>
                    <NoResults
                        title={'No Alerts Yet'}
                        description={'There are no alerts at the moment.'}
                    />
                </Box>
            )}
        </Widget>
    );
}
