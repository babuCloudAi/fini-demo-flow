import {InfinizeTable, Widget} from '@/components/common';
import React, {useEffect, useState} from 'react';
import housingData from '@/data/studentProfile/housing.json';
import {columns} from './columns';
import {Box, Skeleton} from '@mui/material';
import classes from '../studentProfile/studentProfile.module.css';

export default function Housing() {
    const [expanded, setExpanded] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [housing, setHousing] = useState([]);

    useEffect(() => {
        setIsLoading(false); // TODO: Remove this on API integration
        setHousing(housingData);
    }, []);

    const handleAccordionChange = () => {
        setExpanded(prev => !prev);
    };

    return (
        <Widget
            title="Housing"
            expanded={expanded}
            onChange={handleAccordionChange}
        >
            {isLoading && (
                <Box px={2}>
                    <Skeleton width="100%" height={120} />
                </Box>
            )}
            {!isLoading && (
                <Box className={classes.infinize__table}>
                    <InfinizeTable
                        columns={columns}
                        rows={housing}
                        customClassName={classes.infinize__profileDataGrid}
                    />
                </Box>
            )}
        </Widget>
    );
}
