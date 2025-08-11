'use client';

import {useState, useEffect} from 'react';
import {Box, Grid, Typography, Button} from '@mui/material';
import LogoCard from './logoCard';
import ColorsCard from './colorsCard';
import FontCard from './fontFamilyCard';
import classes from './brandKit.module.css';
import {useTheme} from '@mui/material/styles';
import {FONT_OPTIONS} from '@/config/constants';
import LivePreviewCard from './livePreviewCard';

export default function BrandKit() {
    const theme = useTheme();
    const [brandLogo, setBrandLogo] = useState(null);

    const [colors, setColors] = useState({
        primary: [theme.palette.primary.main],
        secondary: [theme.palette.secondary.main]
    });
    const [selectedColors, setSelectedColors] = useState({
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main
    });
    const [fontFamily, setFontFamily] = useState(
        FONT_OPTIONS.includes(theme.typography.fontFamily)
            ? theme.typography.fontFamily
            : FONT_OPTIONS[0]
    );

    const handleReset = () => {
        setBrandLogo(null);

        setSelectedColors({
            primary: theme.palette.primary.main,
            secondary: theme.palette.secondary.main
        });
        setColors({
            primary: [theme.palette.primary.main],
            secondary: [theme.palette.secondary.main]
        });

        setFontFamily(
            FONT_OPTIONS.includes(theme.typography.fontFamily)
                ? theme.typography.fontFamily
                : FONT_OPTIONS[0]
        );
    };

    return (
        <Box className={classes.infinize__brandKitContainer}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{color: 'primary.main'}}
                    >
                        Brand Kit
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large">
                        Publish
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
                <Grid
                    item
                    size={{xs: 12, md: 5}}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                >
                    <LogoCard logo={brandLogo} onLogoChange={setBrandLogo} />
                    <ColorsCard
                        selectedColors={selectedColors}
                        setSelectedColors={setSelectedColors}
                        colors={colors}
                        setColors={setColors}
                    />
                    <FontCard
                        fontFamily={fontFamily}
                        setFontFamily={setFontFamily}
                    />
                </Grid>

                <Grid item size={{xs: 12, md: 7}}>
                    <LivePreviewCard
                        logo={
                            brandLogo instanceof File
                                ? URL.createObjectURL(brandLogo)
                                : ''
                        }
                        primaryColor={selectedColors.primary}
                        secondaryColor={selectedColors.secondary}
                        fontFamily={fontFamily}
                        reset={handleReset}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
