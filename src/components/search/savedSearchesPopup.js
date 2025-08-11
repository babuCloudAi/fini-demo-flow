'use client';
import React, {useState, useEffect} from 'react';
import {
    Popover,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider
} from '@mui/material';
import classes from './search.module.css';
import {InfinizeIcon} from '../common';
import SavedSearchesData from '@/data/search/savedSearches.json';

export default function SavedSearchesPopup({
    topAlignment = 'left',
    bottomAlignment = 'right',
    anchorVertical = 'top',
    transformVertical = 'bottom'
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [savedSearches, setSavedSearches] = useState([]);

    useEffect(() => {
        setSavedSearches(SavedSearchesData);
    }, []);

    // Open popover
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    // Close popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Delete a search entry
    const handleDelete = index => {
        setSavedSearches(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <IconButton
                component="div"
                onClick={handleClick}
                aria-label="Saved search filters"
            >
                <InfinizeIcon
                    icon="icon-park-outline:history-query"
                    alt="Saved search filters"
                />
            </IconButton>

            {/* Popover Component */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: anchorVertical,
                    horizontal: bottomAlignment
                }}
                transformOrigin={{
                    vertical: transformVertical,
                    horizontal: topAlignment
                }}
                elevation={0}
                aria-labelledby="saved-searches-title"
                role="dialog"
                sx={{
                    // mt: 4,
                    marginLeft: -1,
                    '& .MuiPopover-paper': {
                        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                        borderRadius: '16px'
                    }
                }}
            >
                <Box
                    className={classes.infinize__searchPopup}
                    role="region"
                    aria-label="Saved Searches"
                >
                    <Typography variant="h4" color="primary">
                        Saved Searches
                    </Typography>

                    <List component="ul">
                        {savedSearches.length === 0 ? (
                            <Typography variant="body2" tabIndex={0}>
                                No saved searches available.
                            </Typography>
                        ) : (
                            savedSearches.map((search, index) => (
                                <React.Fragment key={index}>
                                    {index >= 0 && <Divider sx={{mx: -2}} />}
                                    <ListItem
                                        component="li"
                                        sx={{py: 1, px: 0}}
                                    >
                                        <ListItemText primary={search} />
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDelete(index)}
                                            aria-label={`Delete saved search: ${search}`}
                                        >
                                            <InfinizeIcon
                                                icon="fluent:delete-24-filled"
                                                alt="Delete icon"
                                                width={20}
                                                height={20}
                                            />
                                        </IconButton>
                                    </ListItem>
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Box>
            </Popover>
        </>
    );
}
