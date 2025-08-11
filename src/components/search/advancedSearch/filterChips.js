import React from 'react';
import {Box} from '@mui/material';
import {CustomChip} from '@/components/common';
import classes from './advancedSearch.module.css';
import {DATA_TYPE} from '@/config/constants';

export const FilterChips = ({filters, onRemove, section}) => {
    return (
        <Box display="flex" gap={1} flexWrap="wrap">
            {filters?.map((filter, index) => {
                const isString = typeof filter === DATA_TYPE.STRING;
                const key = isString
                    ? `${section}_${index}`
                    : `${section}_${filter.label}_${index}`;

                const label = isString ? filter : filter.label;

                const handleDelete = () => {
                    if (isString) {
                        onRemove(index);
                    } else {
                        onRemove(section, filter.index, filter.type);
                    }
                };

                return (
                    <CustomChip
                        key={key}
                        label={label}
                        onDelete={handleDelete}
                        color="primary"
                        variant="outlined"
                        classes={classes.infinize__chipStyle}
                    />
                );
            })}
        </Box>
    );
};
