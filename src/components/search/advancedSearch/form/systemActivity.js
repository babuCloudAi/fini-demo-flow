import React, {useEffect, useState} from 'react';
import {Box, Grid, Skeleton, Typography} from '@mui/material';
import {
    MultiSelectField,
    CustomDateRangePicker,
    CustomCheckbox,
    formUtils
} from '../../../common';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {advancedSearchService} from '@/dataAccess';

export default function SystemActivity({
    onFilterChange,
    systemActivityFilter,
    filterChips
}) {
    const SYSTEM_ACTIVITY = ADVANCED_SEARCH_SECTIONS.SYSTEM_ACTIVITY;
    const [isExpanded, setIsExpanded] = useState(false);
    const [systemOptions, setSystemOptions] = useState([]);

    const [isLoadingSystem, setIsLoadingSystem] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const loadSystemActivityData = async () => {
        try {
            const res = await advancedSearchService.fetchSystemActivity();
            setSystemOptions(
                res.data.map(item => ({
                    label: item.SYSTEM_NAME,
                    value: item.SYSTEM_ID
                }))
            );
        } catch (err) {
            console.error('Error fetching system lookup:', err);
        } finally {
            setIsLoadingSystem(false);
            setIsDataFetched(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadSystemActivityData();
        }
    }, [isExpanded]);

    const handleFieldChange = (field, value) => {
        onFilterChange(
            SYSTEM_ACTIVITY,
            formUtils.getUpdatedFormData(systemActivityFilter, field, value)
        );
    };

    return (
        <SectionAccordion
            title="System Activity"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Grid container spacing={3} mt={1}>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        System
                    </Typography>
                    {isLoadingSystem && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingSystem && (
                        <MultiSelectField
                            name="system"
                            label="System"
                            value={systemActivityFilter?.system}
                            options={systemOptions}
                            onChange={val => handleFieldChange('system', val)}
                        />
                    )}
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Date Range
                    </Typography>

                    <CustomDateRangePicker
                        name="loginDate"
                        label="Date Range"
                        value={systemActivityFilter?.loginDate}
                        onChange={handleFieldChange}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <CustomCheckbox
                        name="noActivity"
                        label="No Activity"
                        value={systemActivityFilter?.noActivity}
                        onChange={val => handleFieldChange('noActivity', val)}
                    />
                </Grid>
            </Grid>
        </SectionAccordion>
    );
}
