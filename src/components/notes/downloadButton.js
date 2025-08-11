import {Box} from '@mui/material';
import classes from './notes.module.css';
import {InfinizeIcon} from '../common';

export default function DownloadIconButton() {
    return (
        <Box className={classes.infinize__downloadIcon}>
            <InfinizeIcon
                icon="proicons:arrow-download"
                width={'12px'}
                style={{
                    color: '#FFFFFF',
                    margin: 'auto'
                }}
            />
        </Box>
    );
}
