import React from 'react';
import {Box} from '@mui/material';
import classes from './common.module.css';
import Image from 'next/image';

export function AppLoader() {
    return (
        <Box className={classes.infinize__logo}>
            <Image
                src="/img/infinizeLogo.svg"
                alt="Infinize logo"
                width={150} // Adjust as needed
                height={50} // Adjust as needed
                className={classes.infinize__logoIcon}
                priority
            />
        </Box>
    );
}
