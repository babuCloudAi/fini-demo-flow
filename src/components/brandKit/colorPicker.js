import {useState} from 'react';
import {Box, IconButton, Stack, Typography, Popover} from '@mui/material';
import {SketchPicker} from 'react-color';
import classes from './brandKit.module.css';
import {InfinizeIcon} from '../common';

export default function ColorPicker({
    colorType,
    colors,
    setColors,
    selectedColor,
    onSelectExisting,
    label
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddColor = newColor => {
        setColors(newColor, colorType);
        setAnchorEl(null); // Close popover after selection
    };

    const handleOpenPopover = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{width: '100%', mt: 2}}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography
                    sx={{
                        fontSize: {xs: '14px', sm: '16px'},
                        fontWeight: 'bold',
                        mb: 1
                    }}
                >
                    {label}
                </Typography>
                <Box
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    borderRadius={1}
                    sx={{
                        bgcolor: selectedColor
                    }}
                    className={classes.infinize__colorPickerPreview}
                >
                    <InfinizeIcon
                        icon="material-symbols:check-rounded"
                        className={classes.infinize__colorPickerSelected}
                    />
                </Box>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                spacing={1}
            >
                {colors?.map(option => (
                    <Box
                        key={option}
                        className={classes.infinize__colorPickerPreview}
                        borderRadius={1}
                        sx={{
                            bgcolor: option,
                            border:
                                selectedColor === option
                                    ? '2px solid white'
                                    : ''
                        }}
                        onClick={() => onSelectExisting(option, colorType)}
                    />
                ))}

                <IconButton
                    sx={{borderRadius: '6px'}}
                    className={classes.infinize__colorPickerPreview}
                    onClick={handleOpenPopover}
                    aria-label="color-picker"
                >
                    <InfinizeIcon icon="ic:round-plus" />
                </IconButton>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left'
                    }}
                >
                    <Box sx={{p: 1}}>
                        <SketchPicker
                            color={selectedColor}
                            onChangeComplete={handleAddColor}
                        />
                    </Box>
                </Popover>
            </Stack>
        </Box>
    );
}
