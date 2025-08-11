import React, {useState, useEffect} from 'react';
import {Skeleton, Typography, Grid} from '@mui/material';
import {formUtils, SelectField} from '@/components/common';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS, ASSIGN_TYPE} from '@/config/constants';
import {advancedSearchService} from '@/dataAccess';

export default function AssignedTo({
    assignedToFilter,
    onFilterChange,
    filterChips
}) {
    const ASSIGNED_TO = ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDataloaded, setIsDataloaded] = useState(false);
    const [coachOptions, setCoachOptions] = useState([]);
    const [advisorOptions, setAdvisorOptions] = useState([]);
    const [instructorOptions, setInstructorOptions] = useState([]);
    const [isLoadingName, setIsLoadingName] = useState(true);

    const assignType = [
        {label: 'Advisor', value: ASSIGN_TYPE.ADVISOR},
        {label: 'Coach', value: ASSIGN_TYPE.COACH},
        {label: 'Instructor', value: ASSIGN_TYPE.INSTRUCTOR}
    ];

    const loadAdvisors = async () => {
        try {
            const res = await advancedSearchService.fetchAdvisors();

            const options = res?.data.map(item => ({
                label: item.FULL_NAME,
                value: item.UID
            }));
            setAdvisorOptions(options);
        } catch (err) {
            console.error('Failed to load advisors:', err);
            return [];
        }
    };

    const loadInstructors = async () => {
        try {
            const res = await advancedSearchService.fetchInstructors();
            const options = res?.data.map(item => ({
                label: item.FULL_NAME,
                value: item.UID
            }));
            setInstructorOptions(options);
        } catch (err) {
            console.error('Failed to load instructors:', err);
            return [];
        }
    };

    const loadCoaches = async () => {
        try {
            const res = await advancedSearchService.fetchCoaches();
            const options = res?.data.map(item => ({
                label: item.FULL_NAME,
                value: item.UID
            }));
            setCoachOptions(options);
        } catch (err) {
            console.error('Failed to load coaches:', err);
            return [];
        }
    };

    const loadAssignedToLookups = async () => {
        try {
            await Promise.all([
                loadAdvisors(),
                loadInstructors(),
                loadCoaches()
            ]);
        } catch (error) {
            console.error('Error loading assigned-to lookups:', error);
        } finally {
            setIsLoadingName(false);
            setIsDataloaded(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataloaded) {
            loadAssignedToLookups();
        }
    }, [isExpanded]);

    // Determine the options for Name field based on selected assignType
    const getNameOptions = assignType => {
        switch (assignType) {
            case ASSIGN_TYPE.INSTRUCTOR:
                return instructorOptions;
            case ASSIGN_TYPE.ADVISOR:
                return advisorOptions;
            case ASSIGN_TYPE.COACH:
                return coachOptions;
            default:
                return [];
        }
    };

    const handleChange = (field, value) => {
        let updatedFilter = formUtils.getUpdatedFormData(
            assignedToFilter,
            field,
            value
        );

        if (field === 'assignType' && updatedFilter.hasOwnProperty('name')) {
            delete updatedFilter.name; // Remove 'name' key instead of resetting
        }

        onFilterChange(ASSIGNED_TO, updatedFilter);
    };

    return (
        <SectionAccordion
            title="Assigned To"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Grid container spacing={3} mt={1}>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Assign Type
                    </Typography>
                    <SelectField
                        name="assignType"
                        label="Assign Type"
                        value={assignedToFilter?.assignType}
                        options={assignType}
                        onChange={value => handleChange('assignType', value)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography
                        className={
                            assignedToFilter?.assignType
                                ? 'infinize__inputLabel'
                                : 'infinize__inputLabel_Disabled'
                        }
                    >
                        Name
                    </Typography>

                    {isLoadingName && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingName && (
                        <SelectField
                            name="name"
                            label="Name"
                            value={assignedToFilter?.name}
                            options={getNameOptions(
                                assignedToFilter?.assignType
                            )}
                            onChange={value => handleChange('name', value)}
                            isDisabled={!assignedToFilter?.assignType} // Disable Name field if no assignType selected
                        />
                    )}
                </Grid>
            </Grid>
        </SectionAccordion>
    );
}
