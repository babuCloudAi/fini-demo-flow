'use client';
import {Box, Typography, Tooltip, useTheme} from '@mui/material';
import styles from '../../career.module.css';
import JobOutlook from './jobOutlook';
import {JOB_OUTLOOK} from '@/config/constants';
import {RecommendationCategory} from '@/components/common';

export default function CategoriesList({jobDetails}) {
    const theme = useTheme();
    return (
        <Box
            display="grid"
            gridTemplateColumns={{sm: '1fr', md: '1fr 1fr'}}
            rowGap={4}
            columnGap={2}
            className={styles.infinize__recommendationsCards}
        >
            {jobDetails &&
                Object.entries(jobDetails).map(([category, content], index) => (
                    <Box key={index} className="infinize__recommendationsCard">
                        <Tooltip title={category}>
                            <Typography
                                color={theme.palette.primary.main}
                                className="infinize__recommendationsCardHeading"
                            >
                                {category}
                            </Typography>
                        </Tooltip>

                        {category === JOB_OUTLOOK && (
                            <JobOutlook content={content} />
                        )}
                        {category !== JOB_OUTLOOK && (
                            <RecommendationCategory content={content} />
                        )}
                    </Box>
                ))}
        </Box>
    );
}
