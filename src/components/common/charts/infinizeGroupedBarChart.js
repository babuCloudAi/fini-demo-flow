'use client';
import {Box, Typography} from '@mui/material';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import classes from './charts.module.css';
import {chartConfig, CHART_COLORS} from './config';
import {ChartTooltip} from './chartTooltip';

export const InfinizeGroupedBarChart = ({data, title, labelMap}) => {
    const dataKeys = Object?.keys(data[0]).filter(key => key !== 'name');

    return (
        <>
            <Box
                className={classes.infinize__chartHeader}
                alignItems={'baseline'}
                display={{xs: 'block', lg: 'flex'}}
            >
                <Typography className={classes.infinize__chartTitle}>
                    {title}
                </Typography>

                <Box
                    width={{sm: '100%', lg: '50%'}}
                    display={'flex'}
                    gap={2}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                >
                    {dataKeys.map((key, index) => (
                        <Box
                            key={index}
                            display={'flex'}
                            alignItems={'center'}
                            gap={1}
                        >
                            <Box
                                width={10}
                                height={10}
                                borderRadius={50}
                                style={{
                                    backgroundColor:
                                        CHART_COLORS[
                                            index % CHART_COLORS.length
                                        ]
                                }}
                            />
                            <Typography fontSize={'12px'}>
                                {labelMap[key]}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
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
                    <Tooltip content={<ChartTooltip labelMap={labelMap} />} />
                    {dataKeys.map((key, index) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            name={key}
                            barSize={11}
                            radius={30} // topLeft, topRight, bottomRight, bottomLeft
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};
