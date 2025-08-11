'use client';
import React, {useEffect, useState} from 'react';
import {Box, Grid, IconButton, Typography} from '@mui/material';
import {
    AddButton,
    AutoCompleteSelect,
    DeleteButton,
    formUtils
} from '@/components/common';
import {InfinizeIcon} from '@/components/common';

export default function Course({
    onFilterChange,
    coursesFilter,
    courses,
    fieldName
}) {
    const [courseSectionsList, setCourseSectionsList] = useState([]);
    const [substituteEnabledCourses, setSubstituteEnabledCourses] = useState(
        {}
    );

    useEffect(() => {
        // Sync the length of coursesFilter and courseSectionsList on component mount
        // Add an object to the courseSectionsList for each item that exists in coursesFilter
        // This will ensure that all the items in the coursesFilter will be displayed on component mount
        // If there are no filters added (coursesFilter is empty), then to display one section by default, initialize courseSectionsList with one object
        setCourseSectionsList(
            coursesFilter?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [coursesFilter]); // Runs when `coursesFilter` changes

    const handleFieldChange = (index, field, value) => {
        const updatedData = coursesFilter ?? [];

        // update the specific index with new filed and value
        updatedData[index] = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );

        // Notify the parent component
        onFilterChange(fieldName, updatedData);
    };

    const handleAddCourseSection = () => {
        // add the new course section
        setCourseSectionsList([
            ...courseSectionsList,
            {id: courseSectionsList?.length}
        ]);
    };
    const handleRemoveCourseSection = index => {
        // Remove the course section entry at the specified index
        const updatedList = [...courseSectionsList];
        updatedList.splice(index, 1);

        // Remove the course entry from form data at the specified index
        const updatedCourseFilter = [...coursesFilter];
        updatedCourseFilter.splice(index, 1);

        // Remove the entry from substituteEnabledCourses with specified index
        delete substituteEnabledCourses[index];

        setCourseSectionsList(updatedList);
        setSubstituteEnabledCourses({...substituteEnabledCourses});

        // Update state and notify parent component
        onFilterChange(fieldName, updatedCourseFilter);
    };

    // Function to enable the substitute course field for a specific course index
    const enableSubstituteCourse = index => {
        setSubstituteEnabledCourses(prev => ({...prev, [index]: true}));
    };

    // Function to disable the substitute course field for a specific course index
    const disableSubstituteCourse = index => {
        setSubstituteEnabledCourses(prev => ({...prev, [index]: false}));
        handleFieldChange(index, 'substituteCourse', '');
    };

    const getCourseLabel = course => {
        if (!course) return '';
        const {SUBJECT = '', COURSE_NUMBER = '', COURSE_TITLE = ''} = course;
        return `${SUBJECT} ${COURSE_NUMBER} - ${COURSE_TITLE}`;
    };
    const isSameCourse = (option, val) => {
        return (
            option?.SUBJECT === val?.SUBJECT &&
            option?.COURSE_NUMBER === val?.COURSE_NUMBER
        );
    };

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            {courseSectionsList?.map((_, index) => (
                <Box key={index}>
                    <Grid container spacing={3} mt={1}>
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography className="infinize__inputLabel">
                                Course*
                            </Typography>
                            <AutoCompleteSelect
                                name={`${fieldName}-course-${index}`}
                                label="Course"
                                value={coursesFilter?.[index]?.course}
                                options={courses}
                                onChange={val =>
                                    handleFieldChange(index, 'course', val)
                                }
                                minFilterLength={2}
                                getOptionLabel={getCourseLabel}
                                isOptionEqualToValue={isSameCourse}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography className="infinize__inputLabel">
                                Substitute Course
                            </Typography>
                            {substituteEnabledCourses[index] && (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <AutoCompleteSelect
                                        name={`${fieldName}-substituteCourse-${index}`}
                                        label="Substitute Course"
                                        value={
                                            coursesFilter?.[index]
                                                ?.substituteCourse
                                        }
                                        options={courses}
                                        minFilterLength={2}
                                        onChange={val =>
                                            handleFieldChange(
                                                index,
                                                'substituteCourse',
                                                val
                                            )
                                        }
                                        getOptionLabel={getCourseLabel}
                                        isOptionEqualToValue={isSameCourse}
                                    />
                                    <IconButton
                                        className="border"
                                        onClick={() =>
                                            disableSubstituteCourse(index)
                                        }
                                    >
                                        <InfinizeIcon
                                            icon={'lucide:circle-minus'}
                                        />
                                    </IconButton>
                                </Box>
                            )}
                            {!substituteEnabledCourses[index] && (
                                <AddButton
                                    onAdd={() => enableSubstituteCourse(index)}
                                    name="Add Substitute Course"
                                />
                            )}
                        </Grid>
                    </Grid>
                    {courseSectionsList.length > 1 && (
                        <DeleteButton
                            onClick={() => handleRemoveCourseSection(index)}
                        />
                    )}
                </Box>
            ))}

            <AddButton
                onAdd={handleAddCourseSection}
                name="Add Course"
                disabled={courseSectionsList.length === coursesFilter?.length}
            />
        </Box>
    );
}
