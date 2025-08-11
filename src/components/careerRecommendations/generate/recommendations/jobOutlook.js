'use client';

import {Box, Typography, Stack} from '@mui/material';
import Image from 'next/image';
import styles from '../../career.module.css';
import {JOB_STATUS} from '@/config/constants';

export default function JobOutlook({content}) {
    const getCareerImage = status => {
        switch (status) {
            case JOB_STATUS.BRIGHT:
                return '/img/careers/bright.svg';
            case JOB_STATUS.AVERAGE:
                return '/img/careers/average.svg';
            case JOB_STATUS.BELOW_AVERAGE:
                return '/img/careers/below-average.svg';
            default:
                return null;
        }
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Box sx={{textAlign: 'center'}}>
                    <Image
                        src={getCareerImage(content.Status)}
                        alt={`${content.Status} Job opportunities`}
                        width={10}
                        height={20}
                    />
                    <Typography
                        ml={1}
                        fontSize={12}
                        fontWeight={500}
                        className={styles.infinize__jobOuttlookStatus}
                    >
                        {content.Status}
                    </Typography>
                </Box>
                <Typography variant="body1" ml={1}>
                    {content.Description}
                </Typography>
            </Box>
            <Typography variant="h6" sx={{fontSize: '16px !important'}}>
                Salary:
            </Typography>
            <Stack spacing={0}>
                <Typography
                    variant="h6"
                    sx={{textAlign: 'center', fontSize: '16px !important'}}
                    color="primary"
                >
                    {content.Salary?.Median || 'N/A'}
                </Typography>
                <Image
                    src="/img/careers/chart.svg"
                    width="400"
                    height="200"
                    alt="chart-img"
                    className={styles.infinize__recommendationsCardChartImg}
                />
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" sx={{fontSize: '14px !important'}}>
                        {content.Salary?.Min || 'N/A'}
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: '14px !important'}}>
                        {content.Salary?.Max || 'N/A'}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
