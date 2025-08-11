'use client';
import {Box, Stack, Typography, useMediaQuery} from '@mui/material';
import {useState} from 'react';
import columns from './columns';
import students from '@/data/search/searchResults.json';
import classes from './search.module.css';
import {useTheme} from '@mui/material/styles';
import {InfinizeIcon, InfinizeTable} from '../common';
import AdvancedSearchButton from './advancedSearchButton';
import NoResultsPlaceholder from './noResultsPlaceholder ';
import FilterChipsGroup from './FilterChipsGroup';

export default function SearchResultsTable({
    query,
    isAdvancedSearch = false,
    onClick,
    appliedFilter
}) {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false); // TODO: remove this on API integration
    }, 2000);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    const FilterChipsContainer = () => (
        <Box
            display="flex"
            overflow="auto"
            alignItems="center"
            flex={2}
            sx={{
                gap: '8px',
                scrollbarWidth: 'none', // Firefox
                '&::-webkit-scrollbar': {
                    display: 'none' // Chrome, Safari
                }
            }}
        >
            <FilterChipsGroup appliedFilter={appliedFilter} />
        </Box>
    );

    return (
        <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'space-between'} gap={2}>
                {/* UX Justification:
                 * The width of 84.9% was suggested by the UX team to ensure optimal spacing between
                 * the filter chips and the action buttons. When more filters are added and chips wrap,
                 * this value maintains visual balance and avoids overlap or overcrowding.  */}
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={2}
                    width={'84.9%'}
                >
                    <Typography
                        className={classes.infinize__searchTitle}
                        color="primary.main"
                        display="flex"
                        alignItems="center"
                        gap="15px"
                    >
                        <InfinizeIcon
                            icon="fluent:people-search-24-regular"
                            className={classes.infinize__searchResultsIcon}
                            style={{
                                color: 'white'
                            }}
                        />
                        {isAdvancedSearch
                            ? 'Search Results'
                            : `Search Results for "${query}"`}
                    </Typography>
                    {!isSmall && isAdvancedSearch && <FilterChipsContainer />}
                </Box>
                <Box>
                    {isAdvancedSearch && (
                        <AdvancedSearchButton
                            isAdvancedSearch={true}
                            onClick={onClick}
                        />
                    )}
                </Box>
            </Box>
            {isSmall && isAdvancedSearch && <FilterChipsContainer />}
            <Box sx={{height: 600, width: '100%'}}>
                <InfinizeTable
                    rows={isLoading ? [] : students}
                    columns={columns}
                    slots={{noRowsOverlay: () => <NoResultsPlaceholder />}}
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: 10, page: 0}
                        }
                    }}
                    isLoading={isLoading}
                    pageSizeOptions={[10, 25, 50, 75, 100]}
                    disableRowSelectionOnClick
                    isRowSelectable={() => false}
                    customClassName={classes.infinize__dataGrid}
                />
            </Box>
        </Stack>
    );
}
