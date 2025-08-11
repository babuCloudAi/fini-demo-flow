import {advancedSearchApiClient} from '../../clients';
import {advancedSearchEndPoints} from './endpoints';

export const advancedSearchService = {
    fetchSemesters: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.semesters);
    },
    fetchGender: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.gender);
    },
    fetchRace: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.race);
    },
    fetchColleges: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.colleges);
    },
    fetchDepartments: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.departments);
    },
    fetchDegrees: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.degrees);
    },
    fetchMajors: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.majors);
    },
    fetchMinors: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.minors);
    },
    fetchPrograms: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.programs);
    },
    fetchConcentrations: () => {
        return advancedSearchApiClient.get(
            advancedSearchEndPoints.concentrations
        );
    },
    fetchAdvisors: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.advisors);
    },
    fetchInstructors: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.instructors);
    },
    fetchCoaches: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.coaches);
    },
    fetchCourseData: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.courseData);
    },
    fetchAcademicStanding: () => {
        return advancedSearchApiClient.get(
            advancedSearchEndPoints.academicStanding
        );
    },
    fetchCohort: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.cohort);
    },
    fetchStudentType: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.studentType);
    },
    fetchGrades: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.grades);
    },
    fetchTerms: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.terms);
    },
    fetchSystemActivity: () => {
        return advancedSearchApiClient.get(
            advancedSearchEndPoints.systemActivity
        );
    },
    fetchTestScore: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.testScore);
    },
    fetchLevels: () => {
        return advancedSearchApiClient.get(advancedSearchEndPoints.levels);
    }
};
