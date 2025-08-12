'use client';
import React, {useState} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Stack,
    Checkbox,
    Box,
    IconButton,
    Badge
} from '@mui/material';
import {InfinizeIcon, SelectAllCheckbox} from '@/components/common';
import classes from './alerts.module.css';

export default function AlertAccordion({
    children,
    alert,
    isChecked,
    onChange,
    isIndeterminate
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <Accordion
            expanded={isExpanded}
            onChange={toggleIsExpanded}
            disableGutters
            className={classes.infinize__alertAccordion}
        >
            <AccordionSummary
                component="div"
                aria-expanded={isExpanded}
                aria-controls="widget_content"
                tabIndex={0}
                expandIcon={<InfinizeIcon icon="si:expand-more-duotone" />}
                className={
                    isExpanded
                        ? classes.infinize__alertAccordionSummaryExpanded
                        : ''
                }
            >
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{py: 1}}
                    >
                        <Box display="flex" alignItems="center" minWidth={180}>
                            <SelectAllCheckbox
                                isChecked={isChecked || false}
                                onChange={onChange}
                                isIndeterminate={isIndeterminate}
                                label={false}
                            />
                            <Typography fontWeight={600} fontSize={16}>
                                {alert.name}
                            </Typography>
                        </Box>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <Typography
                                className={
                                    classes.infinize__alertAccordionSecondaryText
                                }
                            >
                                ID:
                            </Typography>
                            <Typography
                                className={
                                    classes.infinize__alertAccordionPrimaryText
                                }
                                noWrap
                            >
                                {alert.id}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <Typography
                                className={
                                    classes.infinize__alertAccordionSecondaryText
                                }
                            >
                                Email:
                            </Typography>
                            <Typography
                                className={
                                    classes.infinize__alertAccordionPrimaryText
                                }
                                noWrap
                                sx={{
                                    maxWidth: 200,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {alert.email}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <Typography
                                className={
                                    classes.infinize__alertAccordionSecondaryText
                                }
                            >
                                Major:
                            </Typography>
                            <Typography
                                className={
                                    classes.infinize__alertAccordionPrimaryText
                                }
                                noWrap
                            >
                                {alert.major}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <Typography
                                className={
                                    classes.infinize__alertAccordionSecondaryText
                                }
                            >
                                Level:
                            </Typography>
                            <Typography
                                className={
                                    classes.infinize__alertAccordionPrimaryText
                                }
                                noWrap
                            >
                                {alert.level}
                            </Typography>
                        </Stack>
                    </Stack>

                    <IconButton size="small">
                        <Badge
                            badgeContent={3}
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: 'primary.main',
                                    color: '#fff'
                                }
                            }}
                        >
                            <InfinizeIcon
                                width={20}
                                height={20}
                                icon="octicon:bell-16"
                                style={{color: '#333333'}}
                            />
                        </Badge>
                    </IconButton>
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{p: 3}}>{children}</AccordionDetails>
        </Accordion>
    );
}
