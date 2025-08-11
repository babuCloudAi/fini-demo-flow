import {Box, Stack, Typography} from '@mui/material';
import classes from './brandKit.module.css';
import {FONT_OPTIONS} from '@/config/constants';

export default function FontFamilyPicker({fontFamily, setFontFamily}) {
    const handleFontSelect = font => {
        if (font !== fontFamily) {
            setFontFamily(font);
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                gap="10px"
                sx={{mt: 2}}
            >
                {FONT_OPTIONS?.map(font => (
                    <Box
                        key={font}
                        className={`${classes.infinize__fontPickerOption} ${
                            font == fontFamily
                                ? classes.infinize__fontPickerOptionSelected
                                : ''
                        }`}
                        px={{xs: '10px', sm: 2}}
                        py={{xs: '10', sm: 2}}
                        onClick={() => handleFontSelect(font)}
                        minWidth={{xs: '100px', sm: '120px'}}
                        height={{xs: '35px', sm: '40px'}}
                        sx={{
                            border:
                                font === fontFamily
                                    ? '2px solid primary.main'
                                    : 'none',
                            bgcolor:
                                font === fontFamily
                                    ? 'primary.light'
                                    : 'transparent',
                            borderRadius: 1,
                            cursor: 'pointer'
                        }}
                    >
                        <Typography
                            fontFamily={font}
                            fontWeight={'bold'}
                            fontSize={{xs: '13px', sm: '15px'}}
                            color={font == fontFamily && 'primary.main'}
                            className={
                                font != fontFamily
                                    ? classes.infinize__fontPickerTextUnselected
                                    : ''
                            }
                            whiteSpace={'wrap'}
                            overflow={'visible'}
                            textOverflow={'clip'}
                        >
                            {font}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
