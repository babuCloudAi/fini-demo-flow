import {Box, IconButton, Stack, Typography} from '@mui/material';
import Link from 'next/link';
import {InfinizeIcon} from '../common';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.main'
            }}
        >
            <Stack
                direction={{xs: 'column', md: 'row'}}
                alignItems="center"
                justifyContent="center"
            >
                <Typography sx={{mx: 4}} variant="body2">
                    Copyright &copy; 2025 INFINIZE. All Rights Reserved.
                </Typography>

                <Box sx={{flexGrow: 1}} />

                {/* TODO: Update with correct urls */}
                <Box>
                    <IconButton
                        color="inherit"
                        component={Link}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <InfinizeIcon icon="fa6-brands:instagram" />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        component={Link}
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <InfinizeIcon icon="fa6-brands:facebook" />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        component={Link}
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                    >
                        <InfinizeIcon icon="fa6-brands:square-x-twitter" />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        component={Link}
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <InfinizeIcon icon="fa6-brands:linkedin" />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );
}
