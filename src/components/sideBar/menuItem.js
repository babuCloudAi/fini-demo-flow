import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from '@mui/material';
import classes from './sideBar.module.css';
import Link from 'next/link';
import {InfinizeIcon} from '../common';

export default function MenuItem({title, icon, isOpen, isActive, tabRoute}) {
    const theme = useTheme();
    return (
        <ListItem
            key={title}
            disableGutters
            disablePadding
            sx={{
                display: 'block',
                color: isActive ? 'primary.main' : 'inherit',
                bgcolor: isActive ? 'secondary.main' : 'inherit'
            }}
        >
            <ListItemButton
                component={Link}
                href={tabRoute}
                className={classes.infinize__sideBarMenuButton}
                sx={{
                    pl: !isOpen ? 0 : undefined,
                    pr: 0
                }}
            >
                <ListItemIcon
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <InfinizeIcon
                        icon={icon}
                        style={{
                            color: isActive
                                ? theme.palette.primary.main
                                : undefined
                        }}
                    />
                </ListItemIcon>
                {isOpen && <ListItemText primary={title} />}
                {isActive && <img src="/img/selectedSideBarTab.svg" />}
            </ListItemButton>
        </ListItem>
    );
}
