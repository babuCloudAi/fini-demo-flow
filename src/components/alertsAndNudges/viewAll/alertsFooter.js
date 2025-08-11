// AlertsFooter.js
'use client';
import React from 'react';
import {Box, Typography} from '@mui/material';
import {InfinizePagination} from '@/components/common';

export default function AlertsFooter({
    selectedAlertsMap,
    startIndex,
    endIndex,
    totalCount,
    pageNumber,
    totalPages,
    handlePageChange
}) {
    const displayRange = `${startIndex + 1} - ${Math.min(
        endIndex,
        totalCount
    )} of ${totalCount} items`;
    const selectedCount = selectedAlertsMap.size;

    return (
        <Box
            display="flex"
            justifyContent={selectedCount > 0 ? 'space-between' : 'flex-end'}
            alignItems="center"
            mt={2}
            px={2}
        >
            {/* Selected alerts count */}
            {selectedCount > 0 && (
                <Typography variant="body2">
                    {selectedCount} Item
                    {selectedCount > 1 ? 's' : ''} Selected
                </Typography>
            )}

            {/* Pagination */}
            <Box display="flex" gap={1} alignItems="center">
                <Typography variant="body2">{displayRange}</Typography>
                <InfinizePagination
                    count={totalPages}
                    page={pageNumber}
                    onPageChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
}
