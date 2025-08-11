'use client';
import {useState} from 'react';
import {Tabs, Tab, Box, useTheme} from '@mui/material';
import classes from '../coursePlan.module.css';
import CoursePlan from './coursePlan';
import {InfinizeIcon} from '@/components/common';

export default function CoursePlanTabs({coursePlans, termsToBeHidden}) {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabSelectionChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box className={classes.infinize__coursePlanPage}>
            <Tabs
                value={selectedTab}
                onChange={handleTabSelectionChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '.MuiTabs-flexContainer': {
                        gap: '20px',
                        borderBottom: '2px solid #ededed'
                    }
                }}
            >
                {coursePlans.map((plan, index) => (
                    <Tab
                        key={`coursePlan__tab_${index}`}
                        label={plan.name}
                        icon={
                            <Box className="infinize__IconOuter smallIcon">
                                <InfinizeIcon
                                    icon="fluent:hat-graduation-sparkle-24-filled"
                                    style={{color: theme.palette.primary.main}}
                                    width="14px"
                                />
                            </Box>
                        }
                        iconPosition="start"
                        sx={{color: theme.palette.primary.main}}
                        className={classes.infinize__coursePlanPageTab}
                    />
                ))}
            </Tabs>

            {coursePlans.map((plan, index) => (
                <Box key={`coursePlan__tabPanel_${index}`}>
                    {selectedTab === index && (
                        <CoursePlan
                            plan={plan}
                            termsToBeHidden={termsToBeHidden}
                        />
                    )}
                </Box>
            ))}
        </Box>
    );
}
