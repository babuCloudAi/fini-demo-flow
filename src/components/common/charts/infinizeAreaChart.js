'use client';

import {Box, Typography} from '@mui/material';
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import classes from './charts.module.css';
import {areaChartConfig} from './config';

export function InfinizeAreaChart({
    data,
    title,
    xDataKey,
    yDataKey,
    isValueInPercentage = false
}) {
    return (
        <>
            <Box className={classes.infinize__chartHeader}>
                <Typography className={classes.infinize__chartTitle}>
                    {title}
                </Typography>
            </Box>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{top: 10, right: 10, left: -15, bottom: 0}}
                >
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient
                            id="colorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            {areaChartConfig.stops.map((stop, index) => (
                                <stop
                                    key={index}
                                    offset={stop.offset}
                                    stopColor={stop.stopColor}
                                    stopOpacity={stop.stopOpacity}
                                />
                            ))}
                        </linearGradient>
                    </defs>

                    {/* Axes */}
                    <XAxis
                        dataKey={xDataKey}
                        axisLine={areaChartConfig.axisStroke}
                        tick={areaChartConfig.tick}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={tick =>
                            isValueInPercentage ? `${tick}%` : tick
                        }
                        axisLine={areaChartConfig.axisStroke}
                        tick={areaChartConfig.tick}
                        tickLine={false}
                    />

                    {/* Grid & Tooltip */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={areaChartConfig.axisStroke}
                    />
                    <Tooltip
                        contentStyle={areaChartConfig.tooltip.contentStyle}
                        cursor={areaChartConfig.tooltip.cursor}
                    />

                    {/* Area */}
                    <Area
                        type="monotone"
                        dataKey={yDataKey}
                        stroke={areaChartConfig.stroke}
                        fill="url(#colorGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}
