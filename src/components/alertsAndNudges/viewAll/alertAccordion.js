'use client';
import React, {useState} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Box,
    useTheme,
    Stack,
    Checkbox
} from '@mui/material';
import {formatDate, InfinizeIcon} from '@/components/common';
import classes from './viewAllAlerts.module.css';
import NudgeDialog from '../nudgeDialog';
import KudosDialog from '../kudosDialog';
import AlertMenu from '../widget/menu';
import {ALERT_STATUS, EST_TIME_ZONE, ALERT_TYPE} from '@/config/constants';
import RevertDialog from './revertDialog';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {getAlertActionText} from '../utils';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AlertAccordion({
    alert,
    isChecked,
    onChange,
    isBulkActionAllowed,
    isBulkActionEnabled
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();
    const [isNudgeDialogOpen, setIsNudgeDialogOpen] = useState(false);
    const [isKudosDialogOpen, setIsKudosDialogOpen] = useState(false);
    const [isRevertDialogOpen, setIsRevertDialogOpen] = useState(false);
    const [revertAlert, setRevertAlert] = useState(null);

    const toggleIsNudgeDialogOpen = () => {
        setIsNudgeDialogOpen(prev => !prev);
    };

    const toggleIsKudosDialogOpen = () => {
        setIsKudosDialogOpen(prev => !prev);
    };

    const toggleIsRevertDialogOpen = () => {
        setIsRevertDialogOpen(prev => !prev);
    };
    const toggleIsExpanded = () => {
        setIsExpanded(prev => !prev);
    };

    const handleNudgeSubmit = () => {
        toggleIsNudgeDialogOpen();
    };

    const handleKudosSubmit = () => {
        toggleIsKudosDialogOpen();
    };

    const handleRevertSubmit = e => {
        e.stopPropagation();
        setRevertAlert(alert);
        toggleIsRevertDialogOpen();
    };
    return (
        <>
            <Accordion
                expanded={isExpanded}
                onChange={toggleIsExpanded}
                disableGutters
                className={classes.infinize__nudgeAccordian}
            >
                <AccordionSummary
                    component="div"
                    aria-expanded={isExpanded}
                    aria-controls="widget_content"
                    tabIndex={0}
                    expandIcon={
                        <InfinizeIcon icon={'si:expand-more-duotone'} />
                    }
                    className={`${
                        isExpanded
                            ? classes.infinize__accordionSummaryExpanded
                            : ''
                    }`}
                >
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        justifyContent="space-between"
                        alignItems={{xs: 'flex-start', sm: 'center'}}
                        width="100%"
                        spacing={2}
                    >
                        <Stack direction="row" spacing={2} alignItems="start">
                            {isBulkActionAllowed && (
                                <Checkbox
                                    color="primary"
                                    checked={isChecked || false}
                                    onClick={e => e.stopPropagation()}
                                    onChange={onChange}
                                    className="customCheckbox"
                                />
                            )}

                            <InfinizeIcon
                                icon={
                                    alert?.type === ALERT_TYPE.ALERT
                                        ? 'fluent:alert-on-24-filled'
                                        : 'stash:trophy-solid'
                                }
                                style={{color: theme.palette.primary.main}}
                                className={classes.infinize__nudgeIcon}
                            />
                            <Stack spacing={0.5}>
                                <Typography
                                    className={
                                        alert.status
                                            ? classes.infinize__nudgeTitle
                                            : classes.infinize__nudgeTitle_bold
                                    }
                                >
                                    {alert.title}
                                </Typography>

                                <Typography
                                    className={classes.infinize__alertDate}
                                >
                                    {formatDate(alert.date, EST_TIME_ZONE)}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Box
                            display="flex"
                            flexDirection={{xs: 'column', sm: 'row'}}
                            justifyContent="space-between"
                            alignItems={{xs: 'flex-start', sm: 'center'}}
                            gap={1}
                        >
                            {alert.status && (
                                <Typography variant="body2">
                                    {getAlertActionText(alert)}
                                </Typography>
                            )}
                            {!alert.status && !isBulkActionEnabled && (
                                <AlertMenu
                                    onGenerateNudge={handleNudgeSubmit}
                                    onSendKudos={handleKudosSubmit}
                                    alertType={alert.type}
                                    customClassName={
                                        classes.infinize__alertsMenu
                                    }
                                />
                            )}
                            {alert.status === ALERT_STATUS.DISMISSED && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        alignSelf: {
                                            xs: 'flex-start',
                                            sm: 'flex-end'
                                        }
                                    }}
                                    className="infinize__button"
                                    onClick={handleRevertSubmit}
                                >
                                    <InfinizeIcon
                                        icon="hugeicons:return-request"
                                        width="18px"
                                        style={{marginRight: '8px'}}
                                    />
                                    Revert
                                </Button>
                            )}
                        </Box>
                    </Stack>
                </AccordionSummary>

                <AccordionDetails sx={{p: 3}}>
                    <Typography variant="body1">{alert.description}</Typography>
                </AccordionDetails>
            </Accordion>
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
            {isRevertDialogOpen && (
                <RevertDialog
                    isOpen={isRevertDialogOpen}
                    onClose={toggleIsRevertDialogOpen}
                    onSend={handleRevertSubmit}
                    alert={revertAlert}
                />
            )}
        </>
    );
}
