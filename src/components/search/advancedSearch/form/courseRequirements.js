import {Box} from '@mui/material';
import {useEffect, useState} from 'react';
import SectionAccordion from './accordion';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import RequiredCourses from './requiredCourses';
import OptionalCourses from './optionalCourses';
import {advancedSearchService} from '@/dataAccess';

export default function CourseRequirements({
    onFilterChange,
    courseRequirementsFilter,
    filterChips
}) {
    const COURSE_REQUIREMENTS = ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS;
    const REQUIRED = ADVANCED_SEARCH_SECTIONS.REQUIRED;
    const OPTIONAL = ADVANCED_SEARCH_SECTIONS.OPTIONAL;

    const [isExpanded, setIsExpanded] = useState(false);
    const [coursesOptions, setCoursesOptions] = useState([]);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const loadCourses = async () => {
        try {
            const res = await advancedSearchService.fetchCourseData();
            setCoursesOptions(res.data);
        } catch (err) {
            console.error('Error loading semester lookup:', err);
        } finally {
            setIsLoadingCourses(false);
            setIsDataFetched(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadCourses();
        }
    }, [isExpanded]);

    const handleFieldChange = (field, value) => {
        // Optional field stores an object that contains both a courses array and additional properties,
        if (
            (field === REQUIRED && value.length === 0) ||
            (field === OPTIONAL && Object.keys(value).length === 0)
        ) {
            delete courseRequirementsFilter[field];
            // move the keys to constatnts in all advanced search sections
            onFilterChange(COURSE_REQUIREMENTS, {...courseRequirementsFilter});
        } else {
            // Update the course requirements filter with the new field value
            onFilterChange(COURSE_REQUIREMENTS, {
                ...courseRequirementsFilter,
                [field]: value
            });
        }
    };

    return (
        <SectionAccordion
            title="Course Requirements"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Box display="flex" flexDirection="column" gap={3}>
                <RequiredCourses
                    requiredCoursesFilter={courseRequirementsFilter?.required}
                    onFilterChange={handleFieldChange}
                    courses={coursesOptions}
                    isLoadingCourses={isLoadingCourses}
                />

                <Box borderTop={1} borderColor="grey.300">
                    <OptionalCourses
                        optionalCoursesFilter={
                            courseRequirementsFilter?.optional
                        }
                        onFilterChange={handleFieldChange}
                        courses={coursesOptions}
                        isLoadingCourses={isLoadingCourses}
                    />
                </Box>
            </Box>
        </SectionAccordion>
    );
}
