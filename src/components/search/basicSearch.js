'use client';
import {useState, useEffect} from 'react';
import {useMediaQuery, Stack, Input, IconButton, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import classes from './search.module.css';
import {InfinizeIcon} from '../common';
import SavedSearchesPopup from './savedSearchesPopup';
import AdvancedSearchButton from './advancedSearchButton';

export default function BasicSearch({
    direction = 'column',
    width = '70%',
    showSavedSearches = true,
    onSearch,
    inputValue,
    isResultsPage
}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [basicInputValue, setBasicInputValue] = useState(inputValue || '');
    const trimmedValue = basicInputValue?.trim();
    useEffect(() => {
        setBasicInputValue(inputValue);
    }, [inputValue]);

    const handleSearch = () => {
        if (!trimmedValue) return;
        onSearch(basicInputValue);
    };

    return (
        <Stack
            spacing={{xs: 2, md: 4}}
            direction={direction}
            alignItems="center"
            sx={{width: isSmallScreen ? '100%' : width}}
        >
            <Box
                role="search"
                aria-label="Student search input"
                className={classes.infinize__searchBox}
            >
                <Input
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search for student using Student Identifier or Last Name"
                    inputProps={{'aria-label': 'Search for students'}}
                    disableUnderline
                    value={basicInputValue || ''}
                    onChange={e => setBasicInputValue(e.target.value)}
                />
                <IconButton
                    type="submit"
                    sx={{
                        p: '10px',
                        backgroundColor: trimmedValue
                            ? theme.palette.primary.main
                            : '#D7D7D7',

                        '&:hover': {
                            backgroundColor: trimmedValue
                                ? theme.palette.primary.dark
                                : '#D7D7D7'
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#D7D7D7',
                            opacity: 1
                        }
                    }}
                    aria-label="Search"
                    onClick={handleSearch}
                    disabled={!trimmedValue}
                >
                    <InfinizeIcon
                        icon="material-symbols:search-rounded"
                        style={{
                            color: trimmedValue ? 'white' : '#5A6876'
                        }}
                    />
                </IconButton>
            </Box>
            {showSavedSearches ? (
                <Stack
                    direction={isSmallScreen ? 'column' : 'row'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    width={'100%'}
                    spacing={isSmallScreen ? 2 : 0}
                >
                    <Box className={classes.infinize__savedSearches}>
                        <SavedSearchesPopup />
                    </Box>
                    <AdvancedSearchButton />
                </Stack>
            ) : (
                <AdvancedSearchButton isResultsPage={isResultsPage} />
            )}
        </Stack>
    );
}
