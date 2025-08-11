import React, {useEffect, useState} from 'react';
import {Box, Grid, Skeleton, Typography} from '@mui/material';
import {
    formUtils,
    MultiSelectField,
    NumberRangeField
} from '@/components/common';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {advancedSearchService} from '@/dataAccess';

export default function RegistrationHistory({
    onFilterChange,
    registrationHistoryFilter,
    filterChips
}) {
    const REGISTRATION_HISTORY = ADVANCED_SEARCH_SECTIONS.REGISTRATION_HISTORY;
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const [registrationTermOptions, setRegistrationTermOptions] = useState([]);
    const [isLoadingRegistrationTerm, setIsLoadingRegistrationTerm] =
        useState(true);

    const loadRegistrationHistory = async () => {
        try {
            const res = await advancedSearchService.fetchTerms();

            setRegistrationTermOptions(
                res.data.map(item => ({
                    label: item.NAME,
                    value: item.TERM_ID
                }))
            );
        } catch (err) {
            console.error('Error loading semester lookup:', err);
        } finally {
            setIsLoadingRegistrationTerm(false);
            setIsDataFetched(true);
        }
    };
    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadRegistrationHistory();
        }
    }, [isExpanded]);

    const handleChange = (field, value) => {
        onFilterChange(
            REGISTRATION_HISTORY,
            formUtils.getUpdatedFormData(
                registrationHistoryFilter,
                field,
                value
            )
        );
    };
    return (
        <SectionAccordion
            title="Registration History"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Grid container spacing={2} mt={1}>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Registration Terms
                    </Typography>
                    {isLoadingRegistrationTerm && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingRegistrationTerm && (
                        <MultiSelectField
                            name="registrationTerms"
                            label="Registration Terms"
                            value={registrationHistoryFilter?.registrationTerms}
                            options={registrationTermOptions}
                            onChange={val =>
                                handleChange('registrationTerms', val)
                            }
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <NumberRangeField
                        name="numberofCreditsRegistered"
                        label="Number of Credits Registered"
                        value={
                            registrationHistoryFilter?.numberofCreditsRegistered ||
                            {}
                        }
                        onChange={value =>
                            handleChange('numberofCreditsRegistered', value)
                        }
                    />
                </Grid>
            </Grid>
        </SectionAccordion>
    );
}
