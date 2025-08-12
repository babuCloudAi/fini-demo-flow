import {Box, useTheme, Grid, Stack, Typography} from '@mui/material';
import styles from '../dashboard.module.css';
import {InfinizeIcon} from '@/components/common';
import Link from 'next/link';

export default function QuickFacts({data}) {
    const theme = useTheme();
    const icons = [
        'fluent:alert-on-24-filled',
        'stash:trophy-solid',
        'fluent:hat-graduation-sparkle-24-filled',
        'flowbite:users-group-solid'
    ];
    const links = [
        '/alerts',
        '/accomplishments',
        '/noPlansStudents',
        '/inactiveStudents'
    ];
    return (
        <Stack className={styles.infinize__QuickFacts} spacing={2}>
            <Stack>
                <Typography variant="h6">Quick Facts</Typography>
                <Typography className={styles.infinize__QuickFactsPara}>
                    Students Tracking
                </Typography>
            </Stack>
            <Grid container spacing={2} columns={12}>
                {data.map((item, index) => (
                    <Grid
                        size={{xs: 12, sm: 6, md: 6, lg: 3}}
                        key={index}
                        className={styles.infinize__QuickFactsCard}
                    >
                        <Link
                            href={links[index]}
                            style={{textDecoration: 'none'}}
                        >
                            <Box
                                bgcolor={theme.palette.primary.main}
                                className={styles.infinize__QuickFactsIcon}
                            >
                                <InfinizeIcon
                                    icon={icons[index]}
                                    style={{color: '#FFF'}}
                                    width={'20px'}
                                />
                            </Box>

                            <Stack spacing={1} pt={2}>
                                <Typography
                                    className={
                                        styles.infinize__QuickFactsCardValue
                                    }
                                >
                                    {item.value}
                                </Typography>
                                <Typography
                                    className={
                                        styles.infinize__QuickFactsCardTitle
                                    }
                                >
                                    {item.title}
                                </Typography>
                            </Stack>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
