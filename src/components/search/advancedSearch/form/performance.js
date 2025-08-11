import React, {useEffect, useState} from 'react';
import {Box, Grid, Skeleton, Typography} from '@mui/material';
import {
    SelectField,
    MultiSelectField,
    NumberRangeField,
    formUtils
} from '@/components/common';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {advancedSearchService} from '@/dataAccess';

export default function Performance({
    performanceFilter,
    onFilterChange,
    filterChips
}) {
    const PERFORMANCE = ADVANCED_SEARCH_SECTIONS.PERFORMANCE;
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [academicStandingOptions, setAcademicStandingOptions] = useState([]);

    const [isLoadingSemester, setIsLoadingSemester] = useState(true);
    const [isLoadingAcademicStanding, setIsLoadingAcademicStanding] =
        useState(true);

    const loadSemester = async () => {
        try {
            const res = await advancedSearchService.fetchSemesters();

            setSemesterOptions(
                res.data.map(item => ({
                    label: item.SEMESTER,
                    value: item.SEMESTER_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading semester lookup:', err);
        } finally {
            setIsLoadingSemester(false);
        }
    };

    const loadAcademicStanding = async () => {
        try {
            const res = await advancedSearchService.fetchAcademicStanding();
            setAcademicStandingOptions(
                res.data.map(item => ({
                    label: item.LABEL,
                    value: item.VALUE
                }))
            );
        } catch (err) {
            console.error('Error loading semester lookup:', err);
        } finally {
            setIsLoadingAcademicStanding(false);
        }
    };
    const loadSectionData = async () => {
        try {
            // TODO to move the response to redux on its integration
            await Promise.all([loadSemester(), loadAcademicStanding()]);
        } catch (err) {
            console.error('Error loading page data:', err);
        } finally {
            setIsDataFetched(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadSectionData();
        }
    }, [isExpanded]);

    const handleChange = (field, value) => {
        onFilterChange(
            PERFORMANCE,
            formUtils.getUpdatedFormData(performanceFilter, field, value)
        );
    };
    return (
        <SectionAccordion
            title="Performance"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Grid container spacing={3} mt={1}>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Semester
                    </Typography>
                    {isLoadingSemester && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingSemester && (
                        <SelectField
                            name="semester"
                            label="Semester"
                            value={performanceFilter?.semester}
                            options={semesterOptions}
                            onChange={value => handleChange('semester', value)}
                            helperText="You must select at least one other criterion."
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <NumberRangeField
                        name="cumulativeGPA"
                        label="Cumulative GPA"
                        value={performanceFilter?.cumulativeGPA || {}}
                        onChange={value => handleChange('cumulativeGPA', value)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <NumberRangeField
                        name="termGPA"
                        label="Term GPA"
                        value={performanceFilter?.termGPA || {}}
                        onChange={value => handleChange('termGPA', value)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <NumberRangeField
                        name="totalCreditsEarned"
                        label="Total Credits Earned"
                        value={performanceFilter?.totalCreditsEarned || {}}
                        onChange={value =>
                            handleChange('totalCreditsEarned', value)
                        }
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <NumberRangeField
                        name="totalCreditsAttempted"
                        label="Total Credits Attempted"
                        value={performanceFilter?.totalCreditsAttempted || {}}
                        onChange={value =>
                            handleChange('totalCreditsAttempted', value)
                        }
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <NumberRangeField
                        name="highSchoolGPA"
                        label="High School GPA"
                        value={performanceFilter?.highSchoolGPA || {}}
                        onChange={value => handleChange('highSchoolGPA', value)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Academic Standing
                    </Typography>
                    {isLoadingAcademicStanding && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingAcademicStanding && (
                        <MultiSelectField
                            name="academicStanding"
                            label="Academic Standing"
                            value={performanceFilter?.academicStanding}
                            options={academicStandingOptions}
                            onChange={value =>
                                handleChange('academicStanding', value)
                            }
                        />
                    )}
                </Grid>
            </Grid>
        </SectionAccordion>
    );
}
