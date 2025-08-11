import {
    Box,
    Stack,
    Typography,
    Avatar,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import classes from './brandKit.module.css';
import {InfinizeIcon} from '../common';

export default function LivePreview({logoUrl, primaryColor, secondaryColor}) {
    return (
        <Box height={'100%'} display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} flex={1} flexDirection={'column'}>
                <Box
                    display={'flex'}
                    px={2}
                    alignItems={'center'}
                    backgroundColor={'white'}
                    flexWrap={'wrap'}
                    ga={2}
                    borderRadius={1}
                    sx={{
                        justifyContent: {xs: 'flex-start', sm: 'space-between'}
                    }}
                >
                    <Box sx={{px: 2}}>
                        <img
                            src={logoUrl || '/img/logo.svg'}
                            alt="selected logo"
                            style={{maxWidth: '100px'}}
                            width="100"
                            height="75"
                        />
                    </Box>
                    <Box sx={{flexGrow: 1}} />
                    <Avatar
                        alt="Profile Picture"
                        src=""
                        sx={{width: 30, height: 30}}
                    />
                    <Typography
                        sx={{
                            mx: 2,
                            fontSize: {xs: '14px', sm: '16px', md: '18px'}
                        }}
                    >
                        Hello, John Doe
                    </Typography>
                </Box>

                <Stack
                    flex={1}
                    textAlign={'center'}
                    bgcolor={'white'}
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    width={'100%'}
                    height={'100vh'}
                    boxShadow={'0px 4px 30px 0px rgba(24, 190, 218, 0.20)'}
                >
                    <Box sx={{width: '70%'}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Identifier (UIN, Last Name)"
                            label="Identifier (UIN, Last Name)"
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        type="submit"
                                        sx={{
                                            p: '6px',
                                            backgroundColor: primaryColor,
                                            color: 'white'
                                        }}
                                        aria-label="Search"
                                    >
                                        <InfinizeIcon icon="material-symbols:search-rounded" />
                                    </IconButton>
                                )
                            }}
                        />

                        <Box
                            mt={2}
                            display={'flex'}
                            justifyContent={'flex-end'}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    background: primaryColor,
                                    fontSize: {xs: '12px', sm: '14px'}
                                }}
                            >
                                Advanced Search
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Box
                className={classes.infinize__livePreviewFooter}
                sx={{bgcolor: primaryColor}}
            >
                <Typography>
                    Copyright &copy; 2025 INFINIZE. All Rights Reserved.
                </Typography>

                <Box className={classes.infinize__livePreviewSocialIcons}>
                    <InfinizeIcon icon="fa6-brands:instagram" />
                    <InfinizeIcon icon="fa6-brands:facebook" />
                    <InfinizeIcon icon="fa6-brands:square-x-twitter" />
                    <InfinizeIcon icon="fa6-brands:linkedin" />
                </Box>
            </Box>
        </Box>
    );
}
