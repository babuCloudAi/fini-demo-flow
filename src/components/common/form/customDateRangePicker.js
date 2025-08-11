import React, {useRef, useState} from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers-pro/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {SingleInputDateRangeField} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import {Box, IconButton, InputAdornment, TextField} from '@mui/material';
import dayjs from 'dayjs';
import {InfinizeIcon} from '../infinizeIcon';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {EST_TIME_ZONE} from '@/config/constants';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

export function CustomDateRangePicker({
    name,
    value,
    onChange,
    isDisabled = false
}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev);
    };

    const hasValue = value && (value[0] || value[1]);
    const latestValue = useRef([null, null]);

    const formatValue = value => {
        if (value) {
            return [
                value[0] ? dayjs(value[0]) : null,
                value[1] ? dayjs(value[1]) : null
            ];
        }
        return [null, null];
    };

    const handleChange = newValue => {
        const formattedValue = [
            newValue[0] ? newValue[0].format('YYYY-MM-DD') : null,
            newValue[1] ? newValue[1].format('YYYY-MM-DD') : null
        ];
        onChange?.(name, formattedValue);
    };

    const handleClear = event => {
        event.stopPropagation();
        onChange?.(name, []);
    };

    const handleOnChange = newValue => {
        latestValue.current = newValue;
        handleChange(newValue);
    };

    const handleClose = () => {
        const [start, end] = latestValue.current;
        if (start && !end) {
            const today = dayjs().tz(EST_TIME_ZONE);
            const suggestedEnd = start.isSameOrBefore(today, 'day')
                ? today
                : start;
            const updatedValue = [start, suggestedEnd];
            latestValue.current = updatedValue;
            handleChange(updatedValue);
        }
        toggleIsOpen();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="date-range-picker-wrapper">
                <DateRangePicker
                    open={isOpen}
                    value={formatValue(value)}
                    onChange={handleOnChange}
                    onClose={handleClose}
                    disabled={isDisabled}
                    slots={{
                        field: SingleInputDateRangeField
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            {hasValue && (
                                                <IconButton
                                                    size="small"
                                                    onClick={handleClear}
                                                    edge="end"
                                                >
                                                    <InfinizeIcon
                                                        icon="ic:round-clear"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                size="small"
                                                edge="end"
                                                onClick={toggleIsOpen}
                                            >
                                                <InfinizeIcon
                                                    icon="qlementine-icons:calendar-16"
                                                    width={20}
                                                    height={20}
                                                />
                                            </IconButton>
                                        </Box>
                                    </InputAdornment>
                                )
                            }
                        }
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
}
