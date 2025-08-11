'use client';
import {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';
import {Box, Skeleton, Typography} from '@mui/material';
import classes from './charts.module.css';
import {LEGEND_PLACEMENT} from '@/config/constants';
import {
    compactPieChartConfig,
    expandedPieChartConfig,
    CHART_COLORS
} from './config';

export function InfinizePieChart({
    data,
    legendPlacement = LEGEND_PLACEMENT.BELOW,
    isTitleCenterAligned = false,
    centerContent = null,
    title,
    headerActions,
    isValueInPercentage = true,
    isSizeSmall = false,
    labelMap
}) {
    const [transformedData, setTransformedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const legendClassMap = {
        [LEGEND_PLACEMENT.BELOW]: classes.infinize__legendBelow,
        [LEGEND_PLACEMENT.RIGHT]: classes.infinize__legendRight
    };

    // Choose the appropriate chart configuration based on Chart size
    const chartConfig = isSizeSmall
        ? compactPieChartConfig // Configuration for small chat
        : expandedPieChartConfig; // Configuration for expandedChart

    // Transform incoming data when it changes
    useEffect(() => {
        // Convert the raw data object into an array of objects compatible with the chart
        const transformed = Object.keys(data).map((key, index) => ({
            name: labelMap?.[key] || key, // Use a label map to get the display name for each key
            value: data[key], // Actual value for the chart segment
            label: key, // Original key for reference or tooltip
            color: CHART_COLORS[index % CHART_COLORS.length]
        }));

        // Update the local state with transformed data for chart rendering
        setTransformedData(transformed);

        // Set loading to false after transformation is complete
        setIsLoading(false);
    }, [data]); // Re-run effect whenever 'data' changes

    return (
        <>
            <Box
                className={
                    isTitleCenterAligned
                        ? classes.infinize__centeredChartHeader
                        : classes.infinize__chartHeader
                }
            >
                <Typography
                    className={
                        isTitleCenterAligned
                            ? classes.infinize__centeredChartTitle
                            : classes.infinize__chartTitle
                    }
                >
                    {title}
                </Typography>
                {headerActions}
            </Box>
            {isLoading && (
                <Skeleton variant="rectangular" height={300} animation="wave" />
            )}
            {!isLoading && (
                <Box
                    display={{sm: 'block', md: 'block', lg: 'flex'}}
                    flexDirection={
                        legendPlacement === LEGEND_PLACEMENT.ABOVE
                            ? 'column-reverse'
                            : legendPlacement === LEGEND_PLACEMENT.BELOW
                            ? 'column'
                            : legendPlacement === LEGEND_PLACEMENT.LEFT
                            ? 'row-reverse'
                            : 'row'
                    }
                    alignItems="center"
                    position={'relative'}
                >
                    <Box
                        sx={{
                            margin: 'auto',
                            width: chartConfig.width,
                            height: chartConfig.height
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={transformedData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={chartConfig.innerRadius}
                                    outerRadius={chartConfig.outerRadius}
                                    startAngle={chartConfig.startAngle}
                                    endAngle={chartConfig.endAngle}
                                    paddingAngle={chartConfig.paddingAngle}
                                    fill={chartConfig.fill}
                                >
                                    {transformedData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        position: 'absolute',
                                        zIndex: 1
                                    }}
                                    formatter={value =>
                                        `${value}${
                                            isValueInPercentage ? '%' : ''
                                        }`
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                    {centerContent && (
                        <Box className={classes.infinize__centeredContent}>
                            {centerContent}
                        </Box>
                    )}

                    <Box
                        className={legendClassMap[legendPlacement]}
                        gap={isSizeSmall ? 0 : 1}
                    >
                        {transformedData.map((entry, index) => (
                            <Box
                                key={index}
                                width={'100%'}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={1}
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Box
                                        width={isTitleCenterAligned ? 5 : 10}
                                        height={isTitleCenterAligned ? 5 : 10}
                                        borderRadius={50}
                                        sx={{backgroundColor: entry.color}}
                                    />
                                    <Typography
                                        variant="body2"
                                        className={`${
                                            isTitleCenterAligned
                                                ? classes.infinize__chartLabel
                                                : classes.infinize__legendText
                                        }`}
                                    >
                                        {entry.name}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    className={`${
                                        isTitleCenterAligned
                                            ? classes.infinize__chartLabel
                                            : classes.infinize__legendText
                                    }`}
                                >
                                    {entry.value}
                                    {isValueInPercentage && '%'}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </>
    );
}
