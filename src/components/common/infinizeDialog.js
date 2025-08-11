'use client';
import styles from './common.module.css';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    Box,
    useTheme
} from '@mui/material';
import {InfinizeIcon} from '.';

export function InfinizeDialog({
    isOpen,
    onClose,
    title,
    contentText,
    children,
    primaryButtonLabel,
    onPrimaryButtonClick,
    isPrimaryButtonDisabled,
    maxWidth = 'xs',
    actionsLayoutAlignment = 'flex-end',
    contentItemsAlignment = 'flex-start',
    headerActions,
    isClosable = true,
    isTypeConfirmation = false
}) {
    const theme = useTheme();
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className={styles.infinize__dialogBox}
            fullWidth
            maxWidth={maxWidth}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '12px',
                    padding: {xs: '20px', sm: '30px'}
                } // TODO: Move styles to an external CSS
            }}
        >
            <DialogTitle
                color="primary"
                className={`${styles.infinize__dialogBoxHeading} ${
                    title ? styles.title : styles.noTitle
                }`}
            >
                {title && title}
                {isTypeConfirmation && (
                    <Box className={styles.infinize__dailogAlertIcon}>
                        <Box
                            className="infinize__IconOuter"
                            sx={{alignSelf: 'center'}}
                        >
                            <InfinizeIcon
                                icon="cuida-alert-outline"
                                style={{color: theme.palette.primary.main}}
                            />
                        </Box>
                    </Box>
                )}

                <Box className={styles.infinize__dailogCloseIcon}>
                    {headerActions}
                    {isClosable && (
                        <IconButton onClick={onClose}>
                            <InfinizeIcon
                                icon="radix-icons:cross-2"
                                className="menuItemIcon"
                            />
                        </IconButton>
                    )}
                </Box>
            </DialogTitle>

            <DialogContent
                className={styles.infinize__dialogBoxContent}
                sx={{
                    alignItems: contentItemsAlignment
                }}
            >
                {contentText && (
                    <Typography className={styles.infinize__dialogBoxText}>
                        {contentText}
                    </Typography>
                )}
                {children}
            </DialogContent>

            {primaryButtonLabel && (
                <DialogActions
                    className={styles.infinize__dialogBoxActions}
                    sx={{
                        alignSelf: actionsLayoutAlignment
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={onPrimaryButtonClick}
                        disabled={isPrimaryButtonDisabled}
                        sx={{
                            '&.Mui-disabled': {
                                backgroundColor: '#f0f0f0',
                                color: '#aaa',
                                cursor: 'not-allowed'
                            }
                        }}
                    >
                        {primaryButtonLabel}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
