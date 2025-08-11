'use client';
import {
    Typography,
    Box,
    useTheme,
    Tooltip,
    Skeleton,
    Grid
} from '@mui/material';
import classes from '../../coursePlan.module.css';
import {InfinizeIcon} from '@/components/common';
import {RecommendationCategory} from '@/components/common';

export default function AdditionalRecommendations({
    additionalRecommendations,
    customStyles = {},
    isLoading = true,
    isEditMode = false
}) {
    const theme = useTheme();

    return (
        <Box
            className={classes.infinize__coursePlanRecommendations}
            sx={customStyles}
            width={{md: '34%', sm: '100%', xs: '100%'}}
        >
            {isLoading && isEditMode ? (
                <Box p={2}>
                    <Skeleton variant="rectangular" width="100%" height={100} />
                </Box>
            ) : (
                <Box className={classes.infinize__recommendationsHeading}>
                    <Box className="infinize__IconOuter">
                        <InfinizeIcon
                            icon="fluent:hat-graduation-sparkle-24-filled"
                            style={{color: theme.palette.primary.main}}
                        />
                    </Box>
                    <Typography variant="h2" color="primary">
                        Additional Recommendations
                    </Typography>
                </Box>
            )}

            <Grid
                container
                spacing={2}
                columns={!isEditMode ? 12 : 6}
                className={classes.infinize__recommendationsCards}
            >
                {isLoading && (
                    <Grid
                        container
                        spacing={2}
                        columns={!isEditMode ? 12 : 6}
                        width={'100%'}
                    >
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <Grid size={6} key={index}>
                                    <Skeleton
                                        variant="rectangular"
                                        height={100}
                                        width={'100%'}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                )}

                {!isLoading &&
                    Object.entries(additionalRecommendations).map(
                        ([category, items], index) => (
                            <Grid
                                size={!isEditMode ? {xs: 12, sm: 6} : 6}
                                className="infinize__recommendationsCard"
                                sx={{mb: 2}}
                                key={index}
                            >
                                <Tooltip title={category}>
                                    <Typography
                                        color="primary"
                                        className="infinize__recommendationsCardHeading"
                                    >
                                        {category}
                                    </Typography>
                                </Tooltip>
                                <RecommendationCategory content={items} />
                            </Grid>
                        )
                    )}
            </Grid>
        </Box>
    );
}
