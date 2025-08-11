'use client';
import React, {useState, useEffect} from 'react';
import {Box, Skeleton} from '@mui/material';
import {NoResults, SelectAllCheckbox} from '@/components/common';
import {ALERT_STATUS} from '@/config/constants';
import AlertAccordion from './alertAccordion';
import {getNoResultMessage} from './alertMessages';
import AlertsHeader from './alertsHeader';
import AlertsFooter from './alertsFooter';
import classes from './viewAllAlerts.module.css';

export default function AlertsList({alertsList = [], alertType, isLoading}) {
    // State to store alerts filtered by status (e.g., unread, dismissed)
    const [filteredAlerts, setFilteredAlerts] = useState([]);

    // Currently selected filter (e.g., unread)
    const [selectedFilter, setSelectedFilter] = useState(ALERT_STATUS.UNREAD);

    // Map to track selected alerts for bulk actions (key: alert ID, value: alert object)
    const [selectedAlertsMap, setSelectedAlertsMap] = useState(new Map());

    // Pagination state
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10; // Fixed page size

    // Compute the start and end index for current page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex);
    const totalNumberOfPages = Math.ceil(filteredAlerts.length / pageSize);

    // Apply filtering whenever the filter or list changes
    useEffect(() => {
        const filtered = !selectedFilter
            ? alertsList
            : alertsList.filter(alert => {
                  if (selectedFilter === ALERT_STATUS.UNREAD) {
                      return (
                          !alert.status || alert.status === ALERT_STATUS.UNREAD
                      );
                  }
                  return alert.status === selectedFilter;
              });

        setFilteredAlerts(filtered);
        setPageNumber(1);
        setSelectedAlertsMap(new Map()); // Clear selection on filter change
    }, [selectedFilter, alertsList]);

    // Handler for pagination
    const handlePageChange = (event, newPage) => {
        setPageNumber(newPage);
        setSelectedAlertsMap(new Map()); // Clear selection on page change
    };

    // Bulk action handler (placeholder for API integration)
    const handleBulkAction = () => {
        const selectedAlertObjects = Array.from(selectedAlertsMap.values());
        console.log('Performing bulk action for:', selectedAlertObjects);
        // TODO: Call API with selectedAlertObjects
    };

    // Check if all alerts on current page are selected
    const isAllPaginatedSelected = () => {
        return (
            paginatedAlerts.length > 0 &&
            paginatedAlerts.length === selectedAlertsMap.size
        );
    };

    const isSomePaginatedSelected = () => {
        return (
            selectedAlertsMap.size > 0 &&
            selectedAlertsMap.size < paginatedAlerts.length &&
            !isAllPaginatedSelected()
        );
    };

    // Handle Select All / Deselect All on current page
    const handleSelectAllChange = () => {
        setSelectedAlertsMap(prev => {
            const newMap = new Map(prev);

            if (isAllPaginatedSelected() || isSomePaginatedSelected()) {
                // Deselect all
                return new Map();
            } else {
                // Select all
                paginatedAlerts.forEach(alert => newMap.set(alert.id, alert));
            }
            return newMap;
        });
    };

    // Toggle selection for individual alert
    const handleAlertSelection = alert => {
        setSelectedAlertsMap(prev => {
            const newMap = new Map(prev);
            if (newMap.has(alert.id)) {
                newMap.delete(alert.id); // Deselect
            } else {
                newMap.set(alert.id, alert); // Select
            }
            return newMap;
        });
    };

    return (
        <Box mt={3}>
            {/* Header with title, unread chip, and filters */}
            <AlertsHeader
                alertType={alertType}
                selectedFilter={selectedFilter}
                alertsList={alertsList}
                filteredAlerts={filteredAlerts}
                isLoading={isLoading}
                selectedAlertsMap={selectedAlertsMap}
                setSelectedFilter={setSelectedFilter}
                handleBulkAction={handleBulkAction}
            />

            {/* No results message */}
            {!isLoading && filteredAlerts.length === 0 && (
                <NoResults
                    {...getNoResultMessage(
                        selectedFilter,
                        alertType,
                        alertsList
                    )}
                />
            )}

            {/* Render alerts */}
            {!isLoading && filteredAlerts.length > 0 && (
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                    {/* Select All checkbox for unread filter */}
                    {selectedFilter === ALERT_STATUS.UNREAD && (
                        <Box
                            px={2}
                            className={classes.infinize__nudgeSelectAll}
                        >
                            <SelectAllCheckbox
                                isChecked={isAllPaginatedSelected()}
                                onChange={handleSelectAllChange}
                                isIndeterminate={isSomePaginatedSelected()}
                            />
                        </Box>
                    )}

                    {/* List of alerts */}
                    {paginatedAlerts.map(alert => (
                        <Box
                            key={alert.id}
                            display="flex"
                            alignItems="flex-start"
                            width="100%"
                        >
                            <AlertAccordion
                                isBulkActionAllowed={
                                    selectedFilter === ALERT_STATUS.UNREAD
                                }
                                isBulkActionEnabled={selectedAlertsMap.size > 0}
                                alert={alert}
                                isChecked={selectedAlertsMap.has(alert.id)}
                                onChange={() => handleAlertSelection(alert)}
                            />
                        </Box>
                    ))}

                    {/* Footer: bulk action summary and pagination */}
                    <AlertsFooter
                        selectedAlertsMap={selectedAlertsMap}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalCount={filteredAlerts.length}
                        pageNumber={pageNumber}
                        totalPages={totalNumberOfPages}
                        handlePageChange={handlePageChange}
                    />
                </Box>
            )}

            {/* Skeletons during loading */}
            {isLoading && (
                <Box display="flex" flexDirection="column" gap={2}>
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={`skeleton_${index}`}
                                variant="rectangular"
                                height={100}
                            />
                        ))}
                </Box>
            )}
        </Box>
    );
}
