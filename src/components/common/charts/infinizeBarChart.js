'use client';
import {useEffect, useState} from 'react';
import {Box, Skeleton, Typography} from '@mui/material';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from 'recharts';
import classes from './charts.module.css';
import {chartConfig} from './config';

export const InfinizeBarChart = ({data, title, labelMap}) => {
    const [transformedData, setTransformedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const transformed = Object.keys(data).map(key => ({
            name: labelMap?.[key],
            value: data[key],
            label: key
        }));
        setTransformedData(transformed);
        setIsLoading(false);
    }, [data]);

    return (
        <>
            <Box className={classes.infinize__chartHeader}>
                <Typography className={classes.infinize__chartTitle}>
                    {title}
                </Typography>
            </Box>
            {isLoading && (
                <Skeleton variant="rectangular" height={300} animation="wave" />
            )}

            {!isLoading && (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={transformedData}
                        barGap={5}
                        margin={{top: 10, right: 10, left: -15, bottom: 0}}
                    >
                        <XAxis
                            dataKey="name"
                            tick={chartConfig.tick}
                            tickLine={false}
                            axisLine={chartConfig.axisStroke}
                        />
                        <YAxis
                            tick={chartConfig.tick}
                            tickLine={false}
                            axisLine={chartConfig.axisStroke}
                        />
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={chartConfig.axisStroke}
                        />
                        <Tooltip
                            contentStyle={chartConfig.tooltip.contentStyle}
                            cursor={chartConfig.tooltip.cursor}
                        />
                        <Bar
                            dataKey="value"
                            barSize={50}
                            fill={chartConfig.barFill}
                        >
                            {transformedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    radius={[4, 4, 0, 0]} // topLeft, topRight, bottomRight, bottomLeft
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    );
};
