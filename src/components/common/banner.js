import {useEffect} from 'react';
import {InfinizeIcon} from '@/components/common';
import {Box, IconButton, Stack, Typography, Button} from '@mui/material';
import classes from './common.module.css';
import {BANNER_TIMEOUT, BANNER_TYPE} from '@/config/constants';

export function Banner({
    type = BANNER_TYPE.WARNING,
    title,
    onClose,
    isClosable = true,
    onResolve,
    onClick,
    children
}) {
    // Auto-close after 60 seconds if closable
    useEffect(() => {
        if (isClosable && type !== BANNER_TYPE.WARNING) {
            const timer = setTimeout(onClose, BANNER_TIMEOUT);
            return () => clearTimeout(timer);
        }
    }, [isClosable, onClose]);

    const handleBannerClose = e => {
        e.stopPropagation();
        onClose();
    };

    return (
        <Stack
            direction={!isClosable ? {xs: 'column', sm: 'row'} : 'row'}
            alignItems={{xs: 'flex-start', sm: 'center'}}
            className={`${classes.infinize__bannerContainer} ${
                classes.infinize__editModeBannerContainer
            } ${
                type === BANNER_TYPE.WARNING ? classes.warning : classes.error
            }`}
            onClick={onClick}
        >
            <Box className={classes.infinize__bannerContainerData}>
                <Box
                    className={`${classes.infinize__bannerIcon} ${
                        type === BANNER_TYPE.WARNING
                            ? classes.warning
                            : classes.error
                    }`}
                >
                    <InfinizeIcon
                        icon={
                            type === BANNER_TYPE.WARNING
                                ? 'bitcoin-icons:alert-filled'
                                : 'basil:cross-outline'
                        }
                        style={{color: '#fff'}}
                    />
                </Box>

                <Stack spacing={1}>
                    <Typography className={classes.infinize__bannerHeading}>
                        {title}
                    </Typography>
                    <Box className={classes.infinize__bannerDescription}>
                        {children}
                    </Box>
                </Stack>
            </Box>

            {isClosable && (
                <IconButton
                    onClick={handleBannerClose}
                    sx={{alignSelf: 'flex-start'}}
                >
                    <InfinizeIcon
                        icon="basil:cross-outline"
                        className={classes.infinize__bannerActionIcon}
                    />
                </IconButton>
            )}
            {!isClosable && (
                <Button
                    className={classes.infinize__bannerActionButton}
                    onClick={onResolve}
                    sx={{alignSelf: {xs: 'flex-end', sm: 'center'}}}
                >
                    Resolve
                </Button>
            )}
        </Stack>
    );
}
