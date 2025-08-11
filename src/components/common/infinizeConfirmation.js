import {Typography, Box, useTheme} from '@mui/material';
import {InfinizeDialog} from './';
import styles from './common.module.css';

export function InfinizeConfirmation({
    isOpen,
    onClose,
    onConfirm,
    title,
    content,
    primaryButtonLabel
}) {
    const theme = useTheme();
    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            onPrimaryButtonClick={onConfirm}
            primaryButtonLabel={primaryButtonLabel}
            actionsLayoutAlignment="center"
            isTypeConfirmation={true}
        >
            <Box className={styles.infinize__confirmationDialog}>
                <Typography
                    style={{color: theme.palette.primary.main}}
                    className={styles.infinize__confirmationDialogHeading}
                >
                    {title}
                </Typography>
                <Typography
                    className={styles.infinize__confirmationDialogText}
                    sx={{whiteSpace: 'pre-line'}}
                >
                    {content}
                </Typography>
            </Box>
        </InfinizeDialog>
    );
}
