import React from 'react';
import {Box} from '@mui/material';
import StudentInfo from './studentInfo';
import SystemActivity from './systemActivity';
import RegistrationHistory from './registrationHistory';
import AreaOfStudy from './areaOfStudy';
import Performance from './performance';
import AssignedTo from './assignedTo';
import CourseData from './courseData';
import CourseRequirements from './courseRequirements';
import TestScores from './testScores';
import {FilterChips} from '../filterChips';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';

export default function AdvancedSearchForm({
    onFilterChange,
    formData,
    getFilters,
    onRemoveFilter
}) {
    return (
        <Box sx={{padding: '0px 24px 24px 24px', overflowY: 'auto'}}>
            <StudentInfo
                sectionName={ADVANCED_SEARCH_SECTIONS.STUDENT_INFO}
                onFilterChange={onFilterChange}
                studentInfoFilter={formData.studentInfo}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.STUDENT_INFO}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.STUDENT_INFO
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.STUDENT_INFO,
                                index
                            )
                        }
                    />
                }
            />
            <SystemActivity
                sectionName={ADVANCED_SEARCH_SECTIONS.SYSTEM_ACTIVITY}
                onFilterChange={onFilterChange}
                systemActivityFilter={formData.systemActivity}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.SYSTEM_ACTIVITY}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.SYSTEM_ACTIVITY
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.SYSTEM_ACTIVITY,
                                index
                            )
                        }
                    />
                }
            />
            <RegistrationHistory
                sectionName={ADVANCED_SEARCH_SECTIONS.REGISTRATION_HISTORY}
                onFilterChange={onFilterChange}
                registrationHistoryFilter={formData.registrationHistory}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.REGISTRATION_HISTORY}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.REGISTRATION_HISTORY
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.REGISTRATION_HISTORY,
                                index
                            )
                        }
                    />
                }
            />
            <AreaOfStudy
                sectionName={ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY}
                onFilterChange={onFilterChange}
                areaOfStudyFilter={formData.areaOfStudy}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY,
                                index
                            )
                        }
                    />
                }
            />
            <Performance
                sectionName={ADVANCED_SEARCH_SECTIONS.PERFORMANCE}
                onFilterChange={onFilterChange}
                performanceFilter={formData.performance}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.PERFORMANCE}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.PERFORMANCE
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.PERFORMANCE,
                                index
                            )
                        }
                    />
                }
            />
            <AssignedTo
                sectionName={ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO}
                onFilterChange={onFilterChange}
                assignedToFilter={formData.assignedTo}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO,
                                index
                            )
                        }
                    />
                }
            />
            <CourseData
                sectionName={ADVANCED_SEARCH_SECTIONS.COURSE_DATA}
                onFilterChange={onFilterChange}
                courseDataFilter={formData.courseData}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.COURSE_DATA}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.COURSE_DATA
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.COURSE_DATA,
                                index
                            )
                        }
                    />
                }
            />
            <CourseRequirements
                sectionName={ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS}
                onFilterChange={onFilterChange}
                courseRequirementsFilter={formData.courseRequirements}
                filterChips={
                    <FilterChips
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS
                        )}
                        onRemove={onRemoveFilter}
                        section={ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS}
                    />
                }
            />

            <TestScores
                sectionName={ADVANCED_SEARCH_SECTIONS.TEST_SCORES}
                onFilterChange={onFilterChange}
                testScoresFilter={formData.testScores}
                filterChips={
                    <FilterChips
                        section={ADVANCED_SEARCH_SECTIONS.TEST_SCORES}
                        filters={getFilters(
                            ADVANCED_SEARCH_SECTIONS.TEST_SCORES
                        )}
                        onRemove={index =>
                            onRemoveFilter(
                                ADVANCED_SEARCH_SECTIONS.TEST_SCORES,
                                index
                            )
                        }
                    />
                }
            />
        </Box>
    );
}
