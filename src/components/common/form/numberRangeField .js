import React from 'react';
import {Box, Typography} from '@mui/material';
import {NumberField} from '@/components/common/form';

export const NumberRangeField = ({name, label, value = {}, onChange}) => {
    const handleChange = (subField, val) => {
        value[subField] = val || undefined;

        // If both min and max are empty, remove the filter
        if (!value.min && !value.max) {
            onChange(undefined);
            return;
        }

        // Ensure both keys exist if at least one has a value
        value.min ??= '';
        value.max ??= '';

        onChange(value);
    };

    return (
        <Box>
            <Typography className="infinize__inputLabel">{label}</Typography>
            <Box
                display="flex"
                gap={2}
                flexDirection={{xs: 'column', md: 'row'}}
            >
                {/* Min Value Input */}
                <NumberField
                    name={`${name}.min`}
                    label={`Min ${label}`}
                    value={value.min ?? ''}
                    onChange={val => handleChange('min', val)}
                    placeholder="Min"
                />
                {/* Max Value Input */}
                <NumberField
                    name={`${name}.max`}
                    label={`Max ${label}`}
                    value={value.max ?? ''}
                    onChange={val => handleChange('max', val)}
                    placeholder="Max"
                />
            </Box>
        </Box>
    );
};
