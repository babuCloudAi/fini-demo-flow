import {Box, Button, Stack, CircularProgress, Typography} from '@mui/material';
import {theme} from '@/config';
import styles from '../../career.module.css';
import {InfinizeIcon} from '@/components/common';

export default function SaveStatus({isSaved, isSaving, onSave}) {
    return (
        <Box>
            {isSaved && (
                <Box
                    sx={{
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <InfinizeIcon icon="mdi-tick" width="20px" height="20px" />
                    <Typography className={styles.infinize__jobSavedText}>
                        Saved
                    </Typography>
                </Box>
            )}

            {isSaving && (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <CircularProgress size={18} />
                    <Typography
                        color="primary"
                        className={styles.infinize__jobSavingText}
                    >
                        Saving...
                    </Typography>
                </Stack>
            )}

            {!isSaved && !isSaving && <Button onClick={onSave}>Save</Button>}
        </Box>
    );
}
