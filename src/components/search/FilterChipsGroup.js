'use client';
import React from 'react';
import {Box} from '@mui/material';
import {CustomChip} from '../common';

export default function FilterChipsGroup({appliedFilter = {}}) {
    return (
        <>
            {Object.entries(appliedFilter).map(([section, chips]) => {
                if (chips?.length) {
                    return (
                        <Box
                            key={section}
                            display="flex"
                            gap={1}
                            flexWrap="nowrap"
                        >
                            {chips.map((chip, index) => (
                                <CustomChip
                                    key={index}
                                    label={chip.label}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    );
                }
            })}
        </>
    );
}
