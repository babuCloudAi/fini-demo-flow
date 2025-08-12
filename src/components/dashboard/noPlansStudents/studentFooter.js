'use client';
import React from 'react';
import {Box, Typography} from '@mui/material';
import {InfinizePagination} from '@/components/common';

export default function StudentFooter({
    startIndex,
    endIndex,
    totalCount,
    pageNumber,
    totalPages,
    handlePageChange,
    selectedStudents
}) {
    const displayRange = `${startIndex + 1} - ${Math.min(
        endIndex,
        totalCount
    )} of ${totalCount}`;

    return (
        <Box
            display="flex"
            justifyContent={'space-between'}
            alignItems="center"
        >
            <Typography variant="body2" sx={{mt: 1, ml: 2}}>
                {selectedStudents.length} item
                {selectedStudents.length > 1 ? 's' : ''} selected
            </Typography>
            <Box display="flex" alignItems="center" p={2} gap={1}>
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
