import React, {useState, useEffect, useMemo} from 'react';
import {Box, Typography, Switch, Skeleton, Grid} from '@mui/material';
import {
    AddButton,
    DeleteButton,
    formUtils,
    SelectField,
    TextInput
} from '@/components/common';
import {AndOrToggle, ToggleSwitch} from './andOrToggle';
import SectionAccordion from './accordion';
import {AND, OR} from '@/config/constants';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {isValidCourseDataFilter} from '../utils';
import {advancedSearchService} from '@/dataAccess';

export default function CourseData({
    courseDataFilter,
    onFilterChange,
    filterChips
}) {
    const COURSE_DATA = ADVANCED_SEARCH_SECTIONS.COURSE_DATA;
    const gradeFilterOptions = [
        {label: '=', value: '='},
        {label: '>', value: '>'},
        {label: '<', value: '<'},
        {label: '>=', value: '>='},
        {label: '<=', value: '<='}
    ];
    const currentCourseFilters = courseDataFilter?.courses;

    const [isExpanded, setIsExpanded] = useState(false);
    const [courseSectionsList, setCourseSectionsList] = useState([]);
    const [coursesOptions, setCoursesOptions] = useState([]);
    const [gradeOptions, setGradeOptions] = useState([]);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [isLoadingCourse, setIsLoadingCourse] = useState(true);
    const [isLoadingSemester, setIsLoadingSemester] = useState(true);
    const [isLoadingGrades, setIsLoadingGrades] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        // Sync the length of courseDataFilter and courseSectionsList on component mount
        // Add an object to the courseSectionsList for each item that exists in courseDataFilter
        // This will ensure that all the items in the courseDataFilter will be displayed on component mount
        // If there are no filters added (courseDataFilter is empty), then to display one section by default, initialize courseSectionsList with one object
        setCourseSectionsList(
            currentCourseFilters?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [courseDataFilter]); // Runs when `courseDataFilter` changes

    const loadCoursesData = async () => {
        try {
            const res = await advancedSearchService.fetchCourseData();
            setCoursesOptions(res.data);
        } catch (err) {
            console.error('Error loading semester lookup:', err);
        } finally {
            setIsLoadingCourse(false);
        }
    };

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

    const loadGrades = async () => {
        try {
            const res = await advancedSearchService.fetchGrades();
            setGradeOptions(
                res?.data.map(item => ({
                    label: item.LABEL,
                    value: item.VALUE
                }))
            );
        } catch (err) {
            console.error('Error loading Grades lookup:', err);
        } finally {
            setIsLoadingGrades(false);
        }
    };

    const loadSectionData = async () => {
        try {
            await Promise.all([
                loadCoursesData(),
                loadSemester(),
                loadGrades()
            ]);
        } catch (err) {
            console.error('Error loading course-related data:', err);
        } finally {
            setIsDataFetched(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadSectionData();
        }
    }, [isExpanded]);

    const cleanUpCourseObject = (updatedCourse, field, value) => {
        if (field === 'subject') {
            delete updatedCourse.courseNumber;
            delete updatedCourse.courseTitle;
        }

        if (field === 'courseNumber') {
            delete updatedCourse.courseTitle;
        }

        if (field === 'semesterRange') {
            if (!value) {
                delete updatedCourse.startSemester;
                delete updatedCourse.endSemester;
            } else {
                delete updatedCourse.semester;
            }
        }

        return updatedCourse;
    };

    const handleFieldChange = (index, field, value) => {
        const updatedData = currentCourseFilters ?? [];

        let updatedCourse = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );

        updatedCourse = cleanUpCourseObject(updatedCourse, field, value);

        updatedData[index] = updatedCourse;

        const finalObject = {
            ...courseDataFilter,
            courses: updatedData
        };

        // If there are more than 1 course filters, the default condition value should be OR
        if (updatedData.length > 1) {
            if (!courseDataFilter.condition) {
                finalObject.condition = OR;
            }
        }

        // Notify the parent component
        onFilterChange(COURSE_DATA, finalObject);
    };

    const handleChange = (field, value) => {
        // Notify the parent component
        onFilterChange(
            COURSE_DATA,
            formUtils.getUpdatedFormData(
                courseDataFilter ? {...courseDataFilter} : {},
                field,
                value
            )
        );
    };

    /**
     * Adds a new empty course entry to the list.
     */
    const handleAddCourseSection = () => {
        setCourseSectionsList([
            ...courseSectionsList,
            {id: courseSectionsList?.length}
        ]);
    };

    /**
     * Removes a course entry from the list based on index.
     */
    const handleRemoveCourseSection = index => {
        // Remove the course section entry at the specified index
        const updatedList = [...courseSectionsList];
        updatedList.splice(index, 1);

        // Remove the course entry from form data at the specified index
        const updatedCoursesList = currentCourseFilters
            ? [...currentCourseFilters]
            : [];
        updatedCoursesList.splice(index, 1);

        setCourseSectionsList(updatedList);

        if (updatedCoursesList.length <= 1) {
            delete courseDataFilter.condition;
        }

        // Update state and notify parent component
        onFilterChange(
            COURSE_DATA,
            formUtils.getUpdatedFormData(
                courseDataFilter,
                'courses',
                updatedCoursesList
            )
        );
    };

    const subjectOptions = useMemo(() => {
        return Array.from(
            new Set(coursesOptions.map(course => course.SUBJECT))
        ).map((subject, idx) => ({
            label: subject,
            value: subject,
            key: `subject_${idx}`
        }));
    }, [coursesOptions]);

    //  Get course numbers for a given subject
    const getCourseNumbers = subject => {
        const numbers = coursesOptions
            .filter(course => course.SUBJECT === subject)
            .map(course => course.COURSE_NUMBER);

        return Array.from(new Set(numbers)).map((num, idx) => ({
            label: num,
            value: num,
            key: `courseNumber_${subject}_${idx}`
        }));
    };

    //  Get course titles for a given subject and course number
    const getCourseTitles = (subject, courseNumber) => {
        const titles = coursesOptions
            .filter(
                course =>
                    course.SUBJECT === subject &&
                    course.COURSE_NUMBER === courseNumber
            )
            .map(course => course.COURSE_TITLE);

        return Array.from(new Set(titles)).map((title, idx) => ({
            label: title,
            value: title,
            key: `courseTitle_${subject}_${courseNumber}_${idx}`
        }));
    };

    //  Helper to get subjects
    const getSubjectOptions = () =>
        subjectOptions.map((option, idx) => ({
            label: option.label,
            value: option.value,
            key: `subject-${option.key}-${idx}`
        }));

    //  Helper to get course numbers based on subject
    const getCourseNumberOptions = subject => {
        return subject
            ? getCourseNumbers(subject)
            : [
                  {
                      label: 'Please select subject',
                      value: '',
                      disabled: true
                  }
              ];
    };

    //  Helper to get course titles based on subject and course number
    const getCourseTitleOptions = (subject, courseNumber) => {
        return subject && courseNumber
            ? getCourseTitles(subject, courseNumber)
            : [
                  {
                      label: 'Please select subject & course number',
                      value: '',
                      disabled: true
                  }
              ];
    };

    const isAddButtonEnabled = () => {
        const isAddCourseButtonEnabled = currentCourseFilters ?? [];
        const sectionCount = courseSectionsList?.length ?? 0;

        // Disable Add button if:
        // - No sections exist yet
        // - A new section was added but form state isn't updated yet
        if (
            sectionCount === 0 ||
            sectionCount > isAddCourseButtonEnabled.length
        ) {
            return false;
        }

        // Enable Add button only if all current course sections are valid
        const result = isAddCourseButtonEnabled.every((course, index) => {
            const isValid = isValidCourseDataFilter(course, index);
            return isValid;
        });

        return result;
    };

    return (
        <SectionAccordion
            title="Course Data"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Box display="flex" flexDirection="column" gap={3} mt={1}>
                {courseSectionsList.length > 1 && (
                    <ToggleSwitch
                        labelLeft="At least one Course"
                        labelRight="Every Course"
                        checked={courseDataFilter?.condition === AND}
                        onChange={e =>
                            handleChange(
                                'condition',
                                e.target.checked ? AND : OR
                            )
                        }
                    />
                )}

                {courseSectionsList.map((_, index) => {
                    const subject = currentCourseFilters?.[index]?.subject;
                    const courseNumber =
                        currentCourseFilters?.[index]?.courseNumber;

                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <AndOrToggle
                                    isOr={courseDataFilter?.condition !== AND}
                                />
                            )}
                            <Grid container spacing={3} mt={1}>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        Subject
                                    </Typography>
                                    {isLoadingCourse && (
                                        <Skeleton
                                            width={'100%'}
                                            height={58}
                                            variant="rectangular"
                                        />
                                    )}
                                    {!isLoadingCourse && (
                                        <SelectField
                                            name={`subject-${index}`}
                                            label="Subject"
                                            value={
                                                courseDataFilter?.courses?.[
                                                    index
                                                ]?.subject || ''
                                            }
                                            options={getSubjectOptions()}
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'subject',
                                                    val
                                                )
                                            }
                                            helperText="Required to search on course data."
                                        />
                                    )}
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        Course Number
                                    </Typography>
                                    <SelectField
                                        name={`courseNumber-${index}`}
                                        label="Course Number"
                                        value={
                                            courseDataFilter?.courses?.[index]
                                                ?.courseNumber || ''
                                        }
                                        options={getCourseNumberOptions(
                                            subject
                                        )}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'courseNumber',
                                                val
                                            )
                                        }
                                        helperText="Required to search on course data."
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        Course Title
                                    </Typography>
                                    <SelectField
                                        name={`courseTitle-${index}`}
                                        label="Course Title"
                                        value={
                                            courseDataFilter?.courses?.[index]
                                                ?.courseTitle || ''
                                        }
                                        options={getCourseTitleOptions(
                                            subject,
                                            courseNumber
                                        )}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'courseTitle',
                                                val
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        CRN
                                    </Typography>

                                    <TextInput
                                        name={`crn-${index}`}
                                        label="CRN"
                                        value={
                                            courseDataFilter?.courses?.[index]
                                                ?.crn || ''
                                        }
                                        onChange={val =>
                                            handleFieldChange(index, 'crn', val)
                                        }
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        Grade Filter
                                    </Typography>
                                    <SelectField
                                        name={`gradeFilter-${index}`}
                                        label="Grade Filter"
                                        value={
                                            courseDataFilter?.courses?.[index]
                                                ?.gradeFilter || ''
                                        }
                                        options={gradeFilterOptions}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'gradeFilter',
                                                val
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        Grade
                                    </Typography>
                                    {isLoadingGrades && (
                                        <Skeleton
                                            width={'100%'}
                                            height={58}
                                            variant="rectangular"
                                        />
                                    )}
                                    {!isLoadingGrades && (
                                        <SelectField
                                            name={`grade-${index}`}
                                            label="Grade"
                                            value={
                                                courseDataFilter?.courses?.[
                                                    index
                                                ]?.grade || ''
                                            }
                                            options={gradeOptions}
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'grade',
                                                    val
                                                )
                                            }
                                        />
                                    )}
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <Typography className="infinize__inputLabel">
                                        Semester Range
                                    </Typography>
                                    <Switch
                                        checked={
                                            courseDataFilter?.courses?.[index]
                                                ?.semesterRange || false
                                        }
                                        onChange={e =>
                                            handleFieldChange(
                                                index,
                                                'semesterRange',
                                                e.target.checked
                                            )
                                        }
                                    />
                                </Grid>
                                {courseDataFilter?.courses?.[index]
                                    ?.semesterRange && (
                                    <Grid size={{xs: 12, md: 6}}>
                                        <Grid container spacing={2} mt={1}>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <Typography
                                                    fontSize="16px"
                                                    fontWeight="500"
                                                    gutterBottom
                                                    mb={1}
                                                >
                                                    Start Semester
                                                </Typography>
                                                <SelectField
                                                    name={`startSemester-${index}`}
                                                    label="Start Semester"
                                                    value={
                                                        courseDataFilter
                                                            ?.courses?.[index]
                                                            ?.startSemester ||
                                                        ''
                                                    }
                                                    options={semesterOptions}
                                                    onChange={val =>
                                                        handleFieldChange(
                                                            index,
                                                            'startSemester',
                                                            val
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <Typography
                                                    fontSize="16px"
                                                    fontWeight="500"
                                                    gutterBottom
                                                    mb={1}
                                                >
                                                    End Semester
                                                </Typography>
                                                <SelectField
                                                    name={`endSemester-${index}`}
                                                    label="End Semester"
                                                    value={
                                                        courseDataFilter
                                                            ?.courses?.[index]
                                                            ?.endSemester || ''
                                                    }
                                                    options={semesterOptions}
                                                    onChange={val =>
                                                        handleFieldChange(
                                                            index,
                                                            'endSemester',
                                                            val
                                                        )
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                                {!courseDataFilter?.courses?.[index]
                                    ?.semesterRange && (
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
                                                name={`semester-${index}`}
                                                label="Semester"
                                                value={
                                                    courseDataFilter?.courses?.[
                                                        index
                                                    ]?.semester || ''
                                                }
                                                options={semesterOptions}
                                                onChange={val =>
                                                    handleFieldChange(
                                                        index,
                                                        'semester',
                                                        val
                                                    )
                                                }
                                            />
                                        )}
                                    </Grid>
                                )}
                                {courseSectionsList.length > 1 && (
                                    <DeleteButton
                                        onClick={() =>
                                            handleRemoveCourseSection(index)
                                        }
                                    />
                                )}
                            </Grid>
                        </React.Fragment>
                    );
                })}

                <AddButton
                    onAdd={handleAddCourseSection}
                    name="Add"
                    disabled={isAddButtonEnabled()}
                />
            </Box>
        </SectionAccordion>
    );
}
