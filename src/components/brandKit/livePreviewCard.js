import {Box, Typography, IconButton, Card, CardContent} from '@mui/material';

import classes from './brandKit.module.css';
import LivePreview from './livePreview';
import {InfinizeIcon} from '../common';

export default function LivePreviewCard({
    logo,
    primaryColor,
    secondaryColor,
    reset
}) {
    return (
        <Card
            className={classes.infinize__livePreview}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardContent
                sx={{flex: 1, display: 'flex', flexDirection: 'column'}}
            >
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6" color="primary.main">
                        Live Preview
                    </Typography>

                    <Box padding="5px 5px" borderRadius={1} bgcolor="#fff">
                        <IconButton
                            aria-label="reset"
                            sx={{color: '#000'}}
                            onClick={reset}
                        >
                            <InfinizeIcon icon="material-symbols:reset-tv-outline-rounded" />
                        </IconButton>
                    </Box>
                </Box>

                <Box flex={1} display={'flex'} flexDirection={'column'}>
                    <LivePreview
                        logoUrl={logo}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
