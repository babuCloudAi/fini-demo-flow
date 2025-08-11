import React, {useEffect, useState} from 'react';
import {Grid, Skeleton, Typography} from '@mui/material';
import {
    SelectField,
    TextInput,
    MultiSelectField,
    CustomDatePicker,
    formUtils
} from '../../../common';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {advancedSearchService} from '@/dataAccess';

export default function StudentInfo({
    onFilterChange,
    studentInfoFilter,
    filterChips
}) {
    const STUDENT_INFO = ADVANCED_SEARCH_SECTIONS.STUDENT_INFO;

    const yesNoOptions = [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'}
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [genderOptions, setGenderOptions] = useState([]);
    const [raceOptions, setRaceOptions] = useState([]);
    const [cohortOptions, setCohortOptions] = useState([]);
    const [studentTypeOptions, setStudentTypeOptions] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [isLoadingGender, setIsLoadingGender] = useState(true);
    const [isLoadingRace, setIsLoadingRace] = useState(true);
    const [isLoadingCohort, setIsLoadingCohort] = useState(true);
    const [isLoadingStudentType, setIsLoadingStudentType] = useState(true);

    const loadGender = async () => {
        try {
            const res = await advancedSearchService.fetchGender();
            setGenderOptions(
                res?.data.map(item => ({
                    label: item.LABEL,
                    value: item.VALUE
                }))
            );
        } catch (err) {
            console.error('Error loading gender lookup:', err);
        } finally {
            setIsLoadingGender(false);
        }
    };

    const loadRace = async () => {
        try {
            const res = await advancedSearchService.fetchRace();
            setRaceOptions(
                res?.data.map(item => ({
                    label: item.LABEL,
                    value: item.VALUE
                }))
            );
        } catch (err) {
            console.error('Error loading race lookup:', err);
        } finally {
            setIsLoadingRace(false);
        }
    };

    const loadCohort = async () => {
        try {
            const res = await advancedSearchService.fetchCohort();
            setCohortOptions(
                res?.data.map(item => ({
                    label: item.LABEL,
                    value: item.VALUE
                }))
            );
        } catch (err) {
            console.error('Error loading cohort lookup:', err);
        } finally {
            setIsLoadingCohort(false);
        }
    };

    const loadStudentType = async () => {
        try {
            const res = await advancedSearchService.fetchStudentType();
            setStudentTypeOptions(
                res?.data.map(item => ({
                    label: item.LABEL,
                    value: item.VALUE
                }))
            );
        } catch (err) {
            console.error('Error loading student-type lookup:', err);
        } finally {
            setIsLoadingStudentType(false);
        }
    };
    const loadSectionData = async () => {
        try {
            await Promise.all([
                loadGender(),
                loadRace(),
                loadCohort(),
                loadStudentType()
            ]);
        } catch (err) {
            console.error('Error loading student info filters:', err);
        } finally {
            setIsDataFetched(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadSectionData();
        }
    }, [isExpanded]);

    const handleFieldChange = (field, value) => {
        onFilterChange(
            STUDENT_INFO,
            formUtils.getUpdatedFormData(studentInfoFilter, field, value)
        );
    };

    return (
        <SectionAccordion
            title="Student Info"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Grid container spacing={3} mt={1}>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Student Identifier
                    </Typography>
                    <TextInput
                        name="studentIdentifier"
                        label="Student Identifier"
                        value={studentInfoFilter?.studentIdentifier}
                        onChange={val =>
                            handleFieldChange('studentIdentifier', val)
                        }
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Email
                    </Typography>
                    <TextInput
                        name="email"
                        label="Email"
                        value={studentInfoFilter?.email}
                        onChange={val => handleFieldChange('email', val)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        First Name
                    </Typography>
                    <TextInput
                        name="firstName"
                        label="First Name"
                        value={studentInfoFilter?.firstName}
                        onChange={val => handleFieldChange('firstName', val)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Last Name
                    </Typography>
                    <TextInput
                        name="lastName"
                        label="Last Name"
                        value={studentInfoFilter?.lastName}
                        onChange={val => handleFieldChange('lastName', val)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Gender
                    </Typography>
                    {isLoadingGender && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingGender && (
                        <SelectField
                            name="gender"
                            label="Gender"
                            value={studentInfoFilter?.gender}
                            options={genderOptions}
                            onChange={val => handleFieldChange('gender', val)}
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Race/Ethnicity
                    </Typography>
                    {isLoadingRace && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingRace && (
                        <MultiSelectField
                            name="raceEthnicity"
                            label="Race/Ethnicity"
                            value={studentInfoFilter?.raceEthnicity}
                            options={raceOptions}
                            onChange={val =>
                                handleFieldChange('raceEthnicity', val)
                            }
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Cohort
                    </Typography>
                    {isLoadingCohort && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingCohort && (
                        <MultiSelectField
                            name="cohort"
                            label="Cohort"
                            value={studentInfoFilter?.cohort}
                            options={cohortOptions}
                            onChange={val => handleFieldChange('cohort', val)}
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Student Type
                    </Typography>
                    {isLoadingStudentType && (
                        <Skeleton
                            width={'100%'}
                            height={58}
                            variant="rectangular"
                        />
                    )}
                    {!isLoadingStudentType && (
                        <MultiSelectField
                            name="studentType"
                            label="Student Type"
                            value={studentInfoFilter?.studentType}
                            options={studentTypeOptions}
                            onChange={val =>
                                handleFieldChange('studentType', val)
                            }
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        First Generation
                    </Typography>
                    <SelectField
                        name="firstGeneration"
                        label="First Generation"
                        value={studentInfoFilter?.firstGeneration}
                        options={yesNoOptions}
                        onChange={val =>
                            handleFieldChange('firstGeneration', val)
                        }
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Military
                    </Typography>
                    <SelectField
                        name="military"
                        label="Military"
                        value={studentInfoFilter?.military}
                        options={yesNoOptions}
                        onChange={val => handleFieldChange('military', val)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Athlete
                    </Typography>
                    <SelectField
                        name="athlete"
                        label="Athlete"
                        value={studentInfoFilter?.athlete}
                        options={yesNoOptions}
                        onChange={val => handleFieldChange('athlete', val)}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Active Holds As Of
                    </Typography>
                    <CustomDatePicker
                        name="activeHoldsAsOf"
                        label="Active Holds As Of"
                        value={studentInfoFilter?.activeHoldsAsOf}
                        onChange={val =>
                            handleFieldChange('activeHoldsAsOf', val)
                        }
                    />
                </Grid>
            </Grid>
        </SectionAccordion>
    );
}
