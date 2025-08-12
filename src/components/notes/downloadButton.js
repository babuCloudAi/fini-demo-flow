import {Box} from '@mui/material';
import classes from './notes.module.css';
import {InfinizeIcon} from '../common';
import Image from 'next/image';

export default function DownloadIconButton() {
    return (
        <Box className={classes.infinize__downloadIcon}>
            <Image
                src="/img/downloadIcon.svg"
                alt="download icon"
                width={40}
                height={20}
                priority
            />
        </Box>
    );
}
