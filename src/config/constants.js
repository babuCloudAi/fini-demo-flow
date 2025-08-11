export const ACCEPTED_LOGO_FORMATS = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/svg+xml': ['.svg']
};
export const ACCEPTED_RESUME_FORMATS = {'application/pdf': ['.pdf']};
export const ACCEPTED_NOTES_FORMATS = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx'
    ]
};

export const BYTES = 1024;

// File size limits
export const MAX_SIZE_10MB = 10 * BYTES * BYTES;
export const MAX_SIZE_5MB = 5 * BYTES * BYTES;

export const FONT_OPTIONS = ['Poppins', 'Roboto Mono', 'Sans Serif'];

export const JOB_STATUS = {
    BRIGHT: 'Bright',
    AVERAGE: 'Average',
    BELOWAVERAGE: 'Below Average'
};
export const JOB_OUTLOOK = 'Job Outlook';
export const OR = 'OR';
export const AND = 'AND';
export const ADVANCED_SEARCH_SECTIONS = {
    PERFORMANCE: 'performance',
    AREA_OF_STUDY: 'areaOfStudy',
    ASSIGNED_TO: 'assignedTo',
    COURSE_DATA: 'courseData',
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    COURSE_REQUIREMENTS: 'courseRequirements',
    REGISTRATION_HISTORY: 'registrationHistory',
    STUDENT_INFO: 'studentInfo',
    SYSTEM_ACTIVITY: 'systemActivity',
    TEST_SCORES: 'testScores'
};
export const CAREER_RECOMMENDATION_SECTIONS = {
    ADDITIONAL_AND_PREFERENCES: 'additionalAndPreferences',
    CAREER_GOALS_AND_INTERESTS: 'careerGoalsAndInterests',
    CERTIFICATIONS_AND_LICENSES: 'certificationsAndLicenses',
    CONSTRAINTS_AND_PRACTICAL_CONSIDERATIONS:
        'constraintsAndPracticalConsiderations',
    LOCATION_AND_WORK_ENVIRONMENT_PREFERENCES:
        'locationAndWorkEnvironmentPreferences',
    PAST_POSITIONS_INTERNSHIPS: 'pastPositionsInternships',
    PROJECTS_OR_PORTFOLIO_LINKS: 'projectsOrPortfolioLinks',
    SKILLS: 'skills'
};
export const COURSE_PLAN_SECTIONS = {
    ACADEMIC_CONSTRAINTS: 'academicConstraints',
    CAREER_GOALS: 'careerGoals',
    LEARNING_PERSONALIZATION: 'learningPersonalization',
    PERSONAL_INTERESTS: 'personalInterests'
};
export const MARKDOWN_SLOW_REVEAL_INTERVAL = 10;

export const CHART_METRICS = {
    PERCENTAGE: 'percentage',
    HOURS: 'hours'
};

export const LEGEND_PLACEMENT = {
    BELOW: 'below',
    ABOVE: 'above',
    LEFT: 'left',
    RIGHT: 'right'
};
export const ALERT_STATUS = {
    UNREAD: 'unread',
    KUDOS_GIVEN: 'kudosGiven',
    ACKNOWLEDGED: 'acknowledged',
    DISMISSED: 'dismissed',
    NUDGED: 'nudged'
};
export const ALERT_TYPE = {
    ALERT: 'alert',
    ACCOMPLISHMENT: 'accomplishment'
};
export const DATE_FORMAT = {
    SHORT: 'MM/DD/YYYY',
    LONG: 'MMMM DD, YYYY. hh:mm a.'
};

export const EST_TIME_ZONE = 'America/New_York';

export const ASSIGN_TYPE = {
    INSTRUCTOR: 'Instructor',
    ADVISOR: 'Advisor',
    COACH: 'Coach'
};
export const ALERTS_ON_DASHBOARD_MAX_LIMIT = 3;

export const COURSE_PLAN_MAX_LIMIT = 3;

export const BANNER_TYPE = {
    WARNING: 'warning',
    ERROR: 'error'
};
export const DATA_TYPE = {
    OBJECT: 'object',
    STRING: 'string'
};
export const NOTES_ON_DASHBOARD_MAX_LIMIT = 3;
export const CONFLICT_TYPE = {
    COURSE_CONFLICT_ON_ADD: 'courseConflictOnAdd',
    COURSE_CONFLICT: 'courseConflict',
    SCHEDULE_CONFLICT: 'scheduleConflict',
    COURSE_UNAVAILABLE: 'courseUnavailable',
    TERM_LOW_CREDITS: 'termLowCredits',
    PLAN_LOW_CREDITS: 'planLowCredits'
};

export const COURSE_HIGHLIGHT_TIMEOUT = 30000;

export const BANNER_TIMEOUT = 6000;
