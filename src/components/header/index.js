import {AppBar, Toolbar, Box, Avatar, Typography} from '@mui/material';
import Image from 'next/image';
import MenuButton from './menuButton';
import classes from './header.module.css';
import user from '@/data/user/userInfo.json';

export default function Header() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                {/* Left Section Logo */}
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Image
                        src="/img/logo.svg"
                        alt="Picture of the Infinize logo"
                        width="200"
                        height="100"
                        priority
                    />
                </Box>
                <Box sx={{flexGrow: 1}} />

                {/* Right Section: Profile icon, User Name and Menu */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Avatar
                        alt={`Profile picture of ${user.name}`}
                        src={user.photo}
                    />
                    <Typography
                        sx={{mx: 1, fontWeight: 500, fontSize: 18}}
                        className={classes.infinize__header}
                    >
                        {user.name}
                    </Typography>
                    <MenuButton user={user} />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
