import {Typography, Box, Stack} from '@mui/material';
import classes from '../coursePlan.module.css';
import {InfinizeIcon} from '../../common';

export default function TermCard({term, isDisabled}) {
    return (
        <Box
            className={classes.infinize__coursePlanLandingCard}
            sx={{
                width: {
                    lg: '35%',
                    md: '50%',
                    sm: '75%',
                    xs: '100%',
                    display: isDisabled ? 'none' : 'flex'
                }
            }}
        >
            <Box className={classes.infinize__coursePlanTermHeading}>
                <Typography
                    className={classes.infinize__coursePlanLandingCardTitle}
                >
                    {term.name}
                </Typography>
                <Typography
                    className={classes.infinize__coursePlanTermHeadingCredits}
                >
                    Total Credits: {term.termCredits}
                </Typography>
            </Box>
            <Stack spacing={2}>
                {term.courses?.map((course, idx) => (
                    <Box
                        key={idx}
                        className={classes.infinize__coursePlanCourseItem}
                    >
                        <Typography
                            className={
                                classes.infinize__coursePlanLandingCardTitle
                            }
                        >
                            {`${course.subject} ${course.courseNumber} ${course.courseTitle}`}
                        </Typography>
                        <Typography
                            className={
                                classes.infinize__coursePlanLandingCardDescription
                            }
                        >
                            {course.description}
                        </Typography>
                        <Stack
                            direction={{xs: 'column', sm: 'row'}}
                            alignItems={{xs: 'flex-start', sm: 'center'}}
                            justifyContent={'space-between'}
                            fontSize={12}
                            spacing={1}
                        >
                            <Stack spacing={0.5}>
                                {course.schedule.map((entry, index) => (
                                    <Stack
                                        direction="row"
                                        spacing={0.5}
                                        alignItems="center"
                                        key={index}
                                    >
                                        <InfinizeIcon
                                            icon="mingcute:time-line"
                                            width={'16px'}
                                            height={'16px'}
                                            className="menuItemIcon"
                                        />
                                        <Typography
                                            className={
                                                classes.infinize__coursePlanSchedule
                                            }
                                        >
                                            {entry.days}
                                        </Typography>
                                        <Typography
                                            className={
                                                classes.infinize__coursePlanSchedule
                                            }
                                        >
                                            {entry.time}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                            <Typography
                                className={
                                    classes.infinize__coursePlanLandingCardCredits
                                }
                            >
                                Credits: {course.credits}
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
