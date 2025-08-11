'use client';
import {useState, useRef, useEffect} from 'react';
import {Box, Stack, Typography, Tooltip, useTheme, Button} from '@mui/material';
import {formatDate, InfinizeDialog, InfinizeIcon} from '@/components/common';
import NudgeDialog from '../nudgeDialog';
import KudosDialog from '../kudosDialog';
import AlertMenu from './menu';
import {EST_TIME_ZONE, ALERT_TYPE} from '@/config/constants';
import alertClasses from '../alertsAndNudges.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import classes from '@/components/common/common.module.css';
import {getAlertActionText} from '../utils';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AlertCard({alert}) {
    const theme = useTheme();
    const [isNudgeDialogOpen, setIsNudgeDialogOpen] = useState(false);
    const [isKudosDialogOpen, setIsKudosDialogOpen] = useState(false);
    const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);
    const descriptionRef = useRef(null);
    const [isAlertDetailsDialogOpen, setIsAlertDetailsDialogOpen] =
        useState(false);

    const toggleIsAlertDetailsDialogOpen = () => {
        setIsAlertDetailsDialogOpen(prev => !prev);
    };
    const toggleIsNudgeDialogOpen = () => {
        setIsNudgeDialogOpen(prev => !prev);
    };

    const toggleIsKudosDialogOpen = () => {
        setIsKudosDialogOpen(prev => !prev);
    };

    const handleNudgeSubmit = () => {
        toggleIsNudgeDialogOpen();
    };

    const handleKudosSubmit = () => {
        toggleIsKudosDialogOpen();
    };

    // Check if description is actually truncated
    useEffect(() => {
        const checkTruncation = () => {
            if (descriptionRef.current) {
                const {scrollHeight, clientHeight} = descriptionRef.current;
                setIsDescriptionTruncated(scrollHeight > clientHeight);
            }
        };

        const raf = requestAnimationFrame(() => {
            setTimeout(checkTruncation, 10);
        });

        window.addEventListener('resize', checkTruncation);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', checkTruncation);
        };
    }, [alert.description]);

    return (
        <>
            <Box
                className={classes.infinize__widgetCard}
                sx={{
                    minWidth: 0,
                    width: '100%',
                    maxWidth: '100%'
                }}
            >
                <Box className={classes.infinize__widgetCardContent}>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="start"
                        pt={2}
                    >
                        <InfinizeIcon
                            icon={
                                alert.type === ALERT_TYPE.ALERT
                                    ? 'fluent:alert-on-24-filled'
                                    : 'stash:trophy-solid'
                            }
                            style={{color: theme.palette.primary.main}}
                            className={classes.infinize__nudgeIcon}
                        />

                        <Stack spacing={1}>
                            <Tooltip title={alert.title}>
                                <Typography
                                    className={
                                        alert.status
                                            ? alertClasses.infinize__nudgeTitle
                                            : alertClasses.infinize__nudgeTitle_bold
                                    }
                                >
                                    {alert.title}
                                </Typography>
                            </Tooltip>

                            <Typography variant="body2">
                                {formatDate(alert.date, EST_TIME_ZONE)}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box>
                        <Typography
                            variant="body1"
                            className={alertClasses.infinize__alertDescription}
                            ref={descriptionRef}
                        >
                            {alert.description}
                        </Typography>
                        {/* Show "Read More" only if text is truncated */}
                        {isDescriptionTruncated && (
                            <Button
                                onClick={toggleIsAlertDetailsDialogOpen}
                                className={alertClasses.infinize__linkButton}
                            >
                                Read more
                            </Button>
                        )}
                    </Box>
                    {alert.status && (
                        <Typography variant="body2">
                            {getAlertActionText(alert)}
                        </Typography>
                    )}
                    {!alert.status && (
                        <AlertMenu
                            onGenerateNudge={toggleIsNudgeDialogOpen}
                            onSendKudos={toggleIsKudosDialogOpen}
                            alertType={alert.type}
                        />
                    )}
                </Box>
            </Box>
            {isNudgeDialogOpen && (
                <NudgeDialog
                    isOpen={isNudgeDialogOpen}
                    onClose={toggleIsNudgeDialogOpen}
                    onSend={handleNudgeSubmit}
                />
            )}
            {isKudosDialogOpen && (
                <KudosDialog
                    isOpen={isKudosDialogOpen}
                    onClose={toggleIsKudosDialogOpen}
                    onSend={handleKudosSubmit}
                />
            )}
            {isAlertDetailsDialogOpen && (
                <InfinizeDialog
                    isOpen={isAlertDetailsDialogOpen}
                    onClose={toggleIsAlertDetailsDialogOpen}
                    isClosable={true}
                    title={alert.title}
                    children={
                        <Typography variant="body1">
                            {alert.description}
                        </Typography>
                    }
                    maxWidth="sm"
                />
            )}
        </>
    );
}
