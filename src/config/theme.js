'use client';

import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {Poppins} from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600']
});
export const theme = responsiveFontSizes(
    createTheme({
        typography: {
            fontFamily: poppins.style.fontFamily
        },
        palette: {
            primary: {
                main: '#1C71B5',
                light: '#498DC4'
            },
            secondary: {
                main: '#F4FAFF'
            },
            background: {
                default: '#F7F9FC'
            }
        }
    })
);
