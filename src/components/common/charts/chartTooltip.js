import {Box, Typography} from '@mui/material';
import classes from './charts.module.css';

export const ChartTooltip = ({active, payload, label, labelMap}) => {
    if (active && payload?.length) {
        return (
            <Box className={classes.infinize__tooltipContainer}>
                <Typography variant="body2" fontWeight="bold" mb={1}>
                    {label}
                </Typography>
                {payload.map(item => (
                    <Typography key={item.dataKey} variant="body2">
                        {labelMap[item.dataKey] || item.dataKey}: {item.value}
                    </Typography>
                ))}
            </Box>
        );
    }

    return <></>;
};
