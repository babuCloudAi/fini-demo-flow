'use client';
import {Box, Typography, Skeleton} from '@mui/material';
import data from '@/data/studentProfile/credits.json';
import {useState, useEffect} from 'react';
import classes from './studentDetails.module.css';
import {InfinizePieChart} from '../common';

export default function Credits() {
    const [creditsData, setCreditsData] = useState(data.creditsData || []);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
        setTimeout(() => setIsLoading(false), 1000); // TODO: Remove this on API integration
    }, []);

    if (!isClient) return null; // Avoid rendering during SSR

    const creditsLabels = {
        creditsObtained: 'Credits Obtained',
        creditsEnrolled: 'Credits Enrolled',
        remainingCredits: 'Remaining Credits'
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
            {isLoading && <Skeleton width="100%" height={150} />}
            {!isLoading && (
                <>
                    <InfinizePieChart
                        title={'Credits'}
                        data={creditsData}
                        isSizeSmall={true}
                        isTitleCenterAligned={true}
                        classNamePrefix="infinize__credits"
                        customClasses={classes}
                        isValueInPercentage={false}
                        labelMap={creditsLabels}
                        centerContent={
                            <>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    className={classes.infinize__credits}
                                >
                                    {data.totalCredits}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    className={classes.infinize__creditsText}
                                >
                                    Credits
                                </Typography>
                            </>
                        }
                    />
                </>
            )}
        </Box>
    );
}
