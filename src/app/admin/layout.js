'use client';
import {Tabs, Tab, Box} from '@mui/material';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect} from 'react';
import classes from './layout.module.css';

export default function AdminLayout({children}) {
    const pathname = usePathname();
    const router = useRouter();

    const tabs = [
        {label: 'BrandKit', path: '/admin/brandkit'},
        {label: 'DataSources', path: '/admin/dataSources'},
        {label: 'Users', path: '/admin/users'},
        {label: 'Settings', path: '/admin/settings'}
    ];

    const currentTab = tabs.findIndex(tab => pathname.startsWith(tab.path));
    useEffect(() => {
        if (pathname === '/admin') {
            router.replace(tabs[0].path); // Redirect to first tab
        }
    }, [pathname, router]);

    return (
        <Box
            sx={{width: '100%'}}
            component="main"
            className={classes.infinize__adminTabsLayout}
        >
            {/* Tabs are always visible */}
            <Box className={classes.infinize__adminTabsBox}>
                <Tabs
                    value={currentTab >= 0 ? currentTab : false}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            component={Link}
                            href={tab.path}
                            label={tab.label}
                            className={classes.infinize__adminTab}
                        />
                    ))}
                </Tabs>
            </Box>
            {/* Content area */}
            <Box sx={{mt: 3}}>{children}</Box>
        </Box>
    );
}
