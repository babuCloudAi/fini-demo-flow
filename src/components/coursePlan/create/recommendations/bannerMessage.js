import {Typography} from '@mui/material';
import {CONFLICT_TYPE} from '@/config/constants';
import styles from '../../coursePlan.module.css';

export default function BannerMessage({reason, data}) {
    if (!reason) {
        return null;
    }

    switch (reason) {
        case CONFLICT_TYPE.COURSE_CONFLICT_ON_ADD: {
            const {course, conflictingTerms, currentTermName} = data;

            // Filter out the current term from the conflicting terms
            const filteredTerms = conflictingTerms.filter(
                term => term.name !== currentTermName
            );

            return (
                <>
                    Unable to add the course{' '}
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {course.subject} - {course.courseNumber}{' '}
                        {course.courseTitle}
                    </Typography>{' '}
                    to{' '}
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {currentTermName}
                    </Typography>
                    , since it is already scheduled for{' '}
                    {filteredTerms.map((term, index) => (
                        <Typography
                            component="span"
                            key={term.code}
                            fontSize={14}
                        >
                            {index > 0 &&
                                (index === filteredTerms.length - 1
                                    ? ' and '
                                    : ', ')}

                            <Typography
                                component="span"
                                className={styles.infinize__coursePlanBoldText}
                            >
                                {term.name}
                            </Typography>
                        </Typography>
                    ))}
                    .
                </>
            );
        }

        case CONFLICT_TYPE.COURSE_CONFLICT: {
            const {subject, courseNumber, courseTitle, conflictingTerms} = data;

            return (
                <>
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {subject} {courseNumber} - {courseTitle}
                    </Typography>{' '}
                    is scheduled in{' '}
                    {conflictingTerms.map((term, index) => (
                        <Typography component="span" key={index} fontSize={14}>
                            {index > 0 &&
                                (index === conflictingTerms.length - 1
                                    ? ' and '
                                    : ', ')}

                            <Typography
                                component="span"
                                className={styles.infinize__coursePlanBoldText}
                            >
                                {term.name}
                            </Typography>
                        </Typography>
                    ))}
                    , creating a conflict.
                </>
            );
        }

        case CONFLICT_TYPE.SCHEDULE_CONFLICT: {
            const {conflictingCourses = [], termName} = data;
            const course = conflictingCourses[conflictingCourses.length - 1];

            return (
                <>
                    The course{' '}
                    {conflictingCourses.length > 0 && (
                        <Typography component="span" fontSize={14}>
                            <Typography
                                component="span"
                                className={styles.infinize__coursePlanBoldText}
                            >
                                {course.subject} {course.courseNumber} -{' '}
                                {course.courseTitle}
                            </Typography>
                        </Typography>
                    )}{' '}
                    has a scheduling conflict in{' '}
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {termName}
                    </Typography>
                    .
                </>
            );
        }

        case CONFLICT_TYPE.COURSE_UNAVAILABLE: {
            const {course, termName} = data;

            return (
                <>
                    The Course{' '}
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {course.subject} {course.courseNumber} -{' '}
                        {course.courseTitle}
                    </Typography>{' '}
                    is not available in{' '}
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {termName}
                    </Typography>
                    .
                </>
            );
        }

        case CONFLICT_TYPE.TERM_LOW_CREDITS: {
            const {termName, credits} = data;
            return (
                <>
                    The required minimum for{' '}
                    <Typography
                        component="span"
                        className={styles.infinize__coursePlanBoldText}
                    >
                        {termName}
                    </Typography>{' '}
                    is short by {credits} credits.
                </>
            );
        }

        case CONFLICT_TYPE.PLAN_LOW_CREDITS: {
            return (
                <>
                    The total credits in the current academic plan do not meet
                    the minimum graduation requirement.
                </>
            );
        }

        default:
            return null;
    }
}
