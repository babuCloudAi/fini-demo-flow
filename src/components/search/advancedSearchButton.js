import React from 'react';
import {Button, Stack} from '@mui/material';
import Link from 'next/link';
import {useTheme} from '@mui/material/styles';
import classes from './search.module.css';
import {InfinizeIcon} from '../common';

const AdvancedSearchButton = ({isAdvancedSearch, onClick, isResultsPage}) => {
    const theme = useTheme();

    return (
        <Stack>
            {isAdvancedSearch && (
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        alignItems: 'end'
                    }}
                    className={classes.infinize__advanceSearch}
                    aria-label="Advanced search"
                    onClick={onClick}
                    startIcon={
                        <InfinizeIcon
                            icon="iconamoon:search"
                            width={20}
                            height={20}
                            style={{color: 'white'}}
                        />
                    }
                >
                    Advanced Search
                </Button>
            )}
            {!isAdvancedSearch && !isResultsPage && (
                <Link
                    sx={{alignSelf: 'end'}}
                    className={classes.infinize__advancedSearchLink}
                    aria-label="Advanced search"
                    href="/search/advanced"
                >
                    Advanced Search
                </Link>
            )}
            {!isAdvancedSearch && isResultsPage && (
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        alignSelf: 'end'
                    }}
                    className={classes.infinize__advanceSearch}
                    aria-label="Advanced search"
                    component={Link}
                    href="/search/advanced"
                >
                    Advanced Search
                </Button>
            )}
        </Stack>
    );
};

export default AdvancedSearchButton;
