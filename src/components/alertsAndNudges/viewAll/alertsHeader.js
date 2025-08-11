'use client';
import React from 'react';
import {Typography, Stack} from '@mui/material';
import {CustomChip} from '@/components/common';
import {ALERT_STATUS, ALERT_TYPE} from '@/config/constants';
import AlertMenu from '../widget/menu';
import Filter from './filter';
import UnreadCountChip from '../unreadCountChip';
import {getFilterLabel} from '../utils';
import classes from './viewAllAlerts.module.css';

export default function AlertsHeader({
    alertType,
    selectedFilter,
    alertsList,
    filteredAlerts,
    isLoading,
    selectedAlertsMap,
    setSelectedFilter,
    handleBulkAction
}) {
    return (
        <Stack
            direction={{xs: 'column', md: 'row'}}
            justifyContent="space-between"
            alignItems={{xs: 'flex-start', sm: 'flex-start'}}
            width="100%"
            px={2}
            spacing={2}
        >
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                alignItems="center"
                spacing={1.5}
            >
                <Typography
                    className={classes.infinize__viewAllAlertsTabHeading}
                >
                    {alertType === ALERT_TYPE.ALERT
                        ? 'Alerts'
                        : 'Accomplishments'}
                    {(!selectedFilter ||
                        (!isLoading && alertsList.length === 0)) &&
                        ' (All)'}
                </Typography>

                {/* Unread Chip */}
                {!isLoading &&
                    filteredAlerts.length > 0 &&
                    (!selectedFilter ||
                        selectedFilter === ALERT_STATUS.UNREAD) && (
                        <UnreadCountChip alerts={filteredAlerts} />
                    )}

                {/* Filter Chip */}
                {!isLoading && selectedFilter && alertsList.length > 0 && (
                    <CustomChip
                        label={getFilterLabel(selectedFilter)}
                        size="small"
                        onDelete={() => setSelectedFilter(null)}
                    />
                )}
            </Stack>

            {/* Right-side: Bulk Menu + Filter */}
            {!isLoading && alertsList.length > 0 && (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    flexWrap="wrap"
                >
                    {selectedAlertsMap.size > 0 && (
                        <AlertMenu
                            isBulkAction={true}
                            onGenerateNudge={handleBulkAction}
                            onSendKudos={handleBulkAction}
                            onDismiss={handleBulkAction}
                            alertType={alertType}
                        />
                    )}

                    <Filter
                        onFilterChange={setSelectedFilter}
                        selectedFilter={selectedFilter}
                        alertType={alertType}
                    />
                </Stack>
            )}
        </Stack>
    );
}
