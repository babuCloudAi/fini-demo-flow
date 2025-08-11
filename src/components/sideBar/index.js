'use client';

import {IconButton, useMediaQuery} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {styled} from '@mui/material/styles';
import {useState} from 'react';
import MenuList from './menuList';
import classes from './sideBar.module.css';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';
import {theme} from '@/config';

const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)})`
    }
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open'
})(({theme, open}) => ({
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const path = usePathname();
    const tabActive = path.split('/')[1];
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (isSmallScreen) {
            setIsOpen(false); // Close side nav bar on smaller screens.
        }
    }, [isSmallScreen]);

    return (
        <>
            {/* Side bar toggle button */}
            <IconButton
                className={`${classes.infinize__sideBarToggler} 
                    ${!isOpen ? classes.closed : undefined}`}
                onClick={toggleDrawer}
            >
                <img
                    src={
                        isOpen
                            ? '/img/sideBarToggleClose.svg'
                            : '/img/sideBarToggleOpen.svg'
                    }
                />
            </IconButton>

            {/* Side bar*/}
            <Drawer
                className={classes.infinize__sideBar}
                open={isOpen}
                variant="permanent"
            >
                <MenuList isOpen={isOpen} tabActive={tabActive} />
            </Drawer>
        </>
    );
}
