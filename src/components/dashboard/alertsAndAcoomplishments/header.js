import React from 'react';
import {Box, Typography, InputBase, Stack, useTheme} from '@mui/material';
import AlertMenu from '../../alertsAndNudges/widget/menu';
import {InfinizeIcon, SelectAllCheckbox} from '../../common';
import classes from './alerts.module.css';

export default function Header({
    selectedAlertsMap,
    isChecked,
    onChange,
    isIndeterminate,
    title
}) {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            px={2}
            py={1}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <SelectAllCheckbox
                    isChecked={isChecked}
                    onChange={onChange}
                    isIndeterminate={isIndeterminate}
                    label={false}
                />
                <InfinizeIcon
                    icon={
                        title === 'alert'
                            ? 'fluent:alert-on-24-filled'
                            : 'stash:trophy-solid'
                    }
                    style={{color: theme.palette.primary.main}}
                    className={classes.infinize__headerIcon}
                />
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                >
                    {title === 'alert' ? 'Alerts to review' : 'Accomplishments'}
                </Typography>
            </Stack>
            <Box display={'flex'} gap={2}>
                {selectedAlertsMap.size > 0 && (
                    <AlertMenu isBulkAction={true} />
                )}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #C3D3E2',
                        borderRadius: '8px',
                        px: 1,
                        py: 0.5,
                        minWidth: '180px',
                        color: '#9e9e9e',
                        gap: '8px'
                    }}
                >
                    <InfinizeIcon icon="system-uicons:search" width="20px" />
                    {/* <SearchIcon sx={{mr: 1}} /> */}
                    <InputBase
                        placeholder="Student Search"
                        sx={{width: '100%', color: 'inherit'}}
                        inputProps={{'aria-label': 'search student'}}
                    />
                </Box>
            </Box>
        </Stack>
    );
}
