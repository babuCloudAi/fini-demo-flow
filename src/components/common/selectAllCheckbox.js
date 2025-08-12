import React from 'react';
import {Box, Checkbox, Typography, SvgIcon, useTheme} from '@mui/material';

/* ---- Custom Indeterminate SVG icon ------------------------------------- */

const IndeterminateIcon = ({borderColor, ...props}) => (
    <SvgIcon {...props} viewBox="0 0 24 24" sx={{fontSize: 24}}>
        <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            fill="#fff"
            stroke={borderColor}
            strokeWidth="2"
        />
        <rect x="8" y="11" width="8" height="2" fill={borderColor} />
    </SvgIcon>
);

/* ---- Re-usable component ------------------------------------------------ */

export function SelectAllCheckbox({
    isChecked,
    isIndeterminate,
    onChange,
    label = true
}) {
    const theme = useTheme();
    const border = theme.palette.primary.main;

    return (
        <Box display="flex" alignItems="center">
            <Checkbox
                checked={isChecked}
                indeterminate={isIndeterminate}
                onChange={onChange}
                disableRipple
                indeterminateIcon={<IndeterminateIcon borderColor={border} />}
                className="customCheckbox"
            />
            {label && (
                <Typography sx={{color: border, fontWeight: 400}}>
                    {!isIndeterminate ? 'Select All' : 'Unselect'}
                </Typography>
            )}
        </Box>
    );
}
