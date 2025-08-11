import {Box, Typography, Chip, LinearProgress} from '@mui/material';
import {InfinizeIcon} from '../common';
import classes from './studentAnalytics.module.css';

export default function TaskCard({title, status, daysLeft, progress}) {
    return (
        <Box
            className={classes.infinize__taskCard}
            display={'flex'}
            flexDirection={{xs: 'column', md: 'row'}}
            gap={2}
        >
            <Box width={{xs: '100%', md: '40%'}}>
                <Typography fontWeight={600} fontSize={20}>
                    {title}
                </Typography>
            </Box>

            <Box
                width={{xs: '100%', md: '60%'}}
                display={'flex'}
                flexDirection={'column'}
            >
                <Box
                    display={'flex'}
                    gap={{xs: 2, md: 9}}
                    justifyContent={'flex-end'}
                    flexDirection={{xs: 'column', md: 'row'}}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={4}
                    >
                        <Chip
                            label={status}
                            size="medium"
                            className={classes.infinize__taskCard__statusChip}
                        />
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <InfinizeIcon
                                icon="majesticons:clock-line"
                                width={'16px'}
                            />
                            <Typography variant="body2">
                                {daysLeft} days left
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Box flexGrow={1} minWidth={120}>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    parseFloat(progress?.replace('%', '')) || 0
                                }
                                sx={{
                                    height: 6,
                                    borderRadius: 4
                                }}
                            />
                        </Box>

                        <Typography variant="body2" minWidth={50}>
                            {progress}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
