import React, {useEffect, useState} from 'react';
import {Typography, Skeleton, Grid} from '@mui/material';
import {
    MultiSelectField,
    SelectField,
    CustomCheckbox,
    formUtils
} from '@/components/common';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {advancedSearchService} from '@/dataAccess';

export default function AreaOfStudy({
    areaOfStudyFilter,
    onFilterChange,
    filterChips
}) {
    const AREA_OF_STUDY = ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY;
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [collegeOptions, setCollegeOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [levelOptions, setLevelOptions] = useState([]);
    const [degreeOptions, setDegreeOptions] = useState([]);
    const [majorOptions, setMajorOptions] = useState([]);
    const [minorOptions, setMinorOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    const [concentrationOptions, setConcentrationOptions] = useState([]);

    const [isLoadingSemester, setIsLoadingSemester] = useState(true);
    const [isLoadingCollege, setIsLoadingCollege] = useState(true);
    const [isLoadingDepartment, setIsLoadingDepartment] = useState(true);
    const [isLoadingDegree, setIsLoadingDegree] = useState(true);
    const [isLoadingMajor, setIsLoadingMajor] = useState(true);
    const [isLoadingMinor, setIsLoadingMinor] = useState(true);
    const [isLoadingProgram, setIsLoadingProgram] = useState(true);
    const [isLoadingConcentration, setIsLoadingConcentration] = useState(true);
    const [isLoadingLevels, setIsLoadingLevels] = useState(true);

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
            console.error('Error loading semester:', err);
        } finally {
            setIsLoadingSemester(false);
        }
    };

    const loadCollege = async () => {
        try {
            const res = await advancedSearchService.fetchColleges();

            setCollegeOptions(
                res.data.map(item => ({
                    label: item.COLLEGE,
                    value: item.COLLEGE_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading college:', err);
        } finally {
            setIsLoadingCollege(false);
        }
    };

    const loadDepartment = async () => {
        try {
            const res = await advancedSearchService.fetchDepartments();
            setDepartmentOptions(
                res.data.map(item => ({
                    label: item.DEPARTMENT,
                    value: item.DEPARTMENT_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading department:', err);
        } finally {
            setIsLoadingDepartment(false);
        }
    };

    const loadDegree = async () => {
        try {
            const res = await advancedSearchService.fetchDegrees();
            setDegreeOptions(
                res.data.map(item => ({
                    label: item.DEGREE,
                    value: item.DEGREE_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading degree:', err);
        } finally {
            setIsLoadingDegree(false);
        }
    };

    const loadMajor = async () => {
        try {
            const res = await advancedSearchService.fetchMajors();
            setMajorOptions(
                res.data.map(item => ({
                    label: item.MAJOR,
                    value: item.MAJOR_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading major:', err);
        } finally {
            setIsLoadingMajor(false);
        }
    };

    const loadMinor = async () => {
        try {
            const res = await advancedSearchService.fetchMinors();
            setMinorOptions(
                res.data.map(item => ({
                    label: item.MINOR,
                    value: item.MINOR_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading minor:', err);
        } finally {
            setIsLoadingMinor(false);
        }
    };

    const loadProgram = async () => {
        try {
            const res = await advancedSearchService.fetchPrograms();
            setProgramOptions(
                res.data.map(item => ({
                    label: item.PROGRAM,
                    value: item.PROGRAM_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading program:', err);
        } finally {
            setIsLoadingProgram(false);
        }
    };

    const loadConcentration = async () => {
        try {
            const res = await advancedSearchService.fetchConcentrations();
            setConcentrationOptions(
                res.data.map(item => ({
                    label: item.CONCENTRATION,
                    value: item.CONCENTRATION_CODE
                }))
            );
        } catch (err) {
            console.error('Error loading concentration:', err);
        } finally {
            setIsLoadingConcentration(false);
        }
    };
    const loadLevels = async () => {
        try {
            const res = await advancedSearchService.fetchLevels();
            setLevelOptions(
                res.data.map(item => ({
                    label: item.LEVEL,
                    value: item.LEVELDETAILS
                }))
            );
        } catch (err) {
            console.error('Error loading levels:', err);
        } finally {
            setIsLoadingLevels(false);
        }
    };
    const loadSectionData = async () => {
        try {
            await Promise.all([
                loadSemester(),
                loadCollege(),
                loadDepartment(),
                loadDegree(),
                loadMajor(),
                loadMinor(),
                loadProgram(),
                loadConcentration(),
                loadLevels()
            ]);
        } catch (err) {
            console.error('Error loading area of study data:', err);
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
            AREA_OF_STUDY,
            formUtils.getUpdatedFormData(areaOfStudyFilter, field, value)
        );
    };

    return (
        <SectionAccordion
            title="Area of Study"
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
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingSemester && (
                        <MultiSelectField
                            name="semester"
                            label="Semester"
                            value={areaOfStudyFilter?.semester}
                            options={semesterOptions}
                            onChange={value => handleChange('semester', value)}
                            helperText={
                                'You must select at least one other criterion.'
                            }
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        College
                    </Typography>
                    {isLoadingCollege && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingCollege && (
                        <MultiSelectField
                            name="college"
                            label="College"
                            value={areaOfStudyFilter?.college}
                            options={collegeOptions}
                            onChange={value => handleChange('college', value)}
                        />
                    )}
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Department
                    </Typography>
                    {isLoadingDepartment && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingDepartment && (
                        <MultiSelectField
                            name="department"
                            label="Department"
                            value={areaOfStudyFilter?.department}
                            options={departmentOptions}
                            onChange={value =>
                                handleChange('department', value)
                            }
                        />
                    )}
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Level
                    </Typography>
                    {isLoadingLevels && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingLevels && (
                        <SelectField
                            name="level"
                            label="Level"
                            value={areaOfStudyFilter?.level}
                            options={levelOptions}
                            onChange={value => handleChange('level', value)}
                        />
                    )}
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Degree
                    </Typography>
                    {isLoadingDegree && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingDegree && (
                        <MultiSelectField
                            name="degree"
                            label="Degree"
                            value={areaOfStudyFilter?.degree}
                            options={degreeOptions}
                            onChange={value => handleChange('degree', value)}
                        />
                    )}
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Major
                    </Typography>
                    {isLoadingMajor && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingMajor && (
                        <MultiSelectField
                            name="major"
                            label="Major"
                            value={areaOfStudyFilter?.major}
                            options={majorOptions}
                            onChange={value => handleChange('major', value)}
                        />
                    )}
                    <CustomCheckbox
                        label="Primary Major Only"
                        name="isPrimaryMajor"
                        value={areaOfStudyFilter?.isPrimaryMajor}
                        onChange={val => handleChange('isPrimaryMajor', val)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Minor
                    </Typography>
                    {isLoadingMinor && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingMinor && (
                        <MultiSelectField
                            name="minor"
                            label="Minor"
                            value={areaOfStudyFilter?.minor || []}
                            options={minorOptions}
                            onChange={value => handleChange('minor', value)}
                        />
                    )}
                    <CustomCheckbox
                        label="Primary Minor Only"
                        name="isPrimaryMinor"
                        value={areaOfStudyFilter?.isPrimaryMinor}
                        onChange={val => handleChange('isPrimaryMinor', val)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Program
                    </Typography>
                    {isLoadingProgram && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingProgram && (
                        <MultiSelectField
                            name="program"
                            label="Program"
                            value={areaOfStudyFilter?.program || []}
                            options={programOptions}
                            onChange={value => handleChange('program', value)}
                        />
                    )}
                    <CustomCheckbox
                        label="Primary Program Only"
                        name="isPrimaryProgram"
                        value={areaOfStudyFilter?.isPrimaryProgram}
                        onChange={val => handleChange('isPrimaryProgram', val)}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography className="infinize__inputLabel">
                        Concentration
                    </Typography>
                    {isLoadingConcentration && (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={58}
                        />
                    )}
                    {!isLoadingConcentration && (
                        <MultiSelectField
                            name="concentration"
                            label="Concentration"
                            value={areaOfStudyFilter?.concentration}
                            options={concentrationOptions}
                            onChange={value =>
                                handleChange('concentration', value)
                            }
                        />
                    )}
                    <CustomCheckbox
                        label="Primary Concentration Only"
                        name="isPrimaryConcentration"
                        value={areaOfStudyFilter?.isPrimaryConcentration}
                        onChange={val =>
                            handleChange('isPrimaryConcentration', val)
                        }
                    />
                </Grid>
            </Grid>
        </SectionAccordion>
    );
}
