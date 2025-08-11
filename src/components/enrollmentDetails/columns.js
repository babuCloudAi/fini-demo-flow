import {Box, IconButton} from '@mui/material';
import {InfinizeIcon, InfinizeTooltip} from '@/components/common';
import classes from './tabs.module.css';

export const getColumns = handleViewStats => [
    {
        field: 'Stats',
        headerName: 'Stats',
        width: 90,
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        renderCell: params => {
            return (
                <Box display="flex" alignItems="center" mt={2}>
                    <InfinizeTooltip title={"Student's Course Analytics"}>
                        <IconButton
                            onClick={() => handleViewStats(params.row)}
                            className={classes.infinize__statsLink}
                            sx={{color: 'primary.main'}}
                        >
                            <InfinizeIcon icon="hugeicons:analytics-02" />
                        </IconButton>
                    </InfinizeTooltip>
                </Box>
            );
        }
    },
    {field: 'crn', headerName: 'CRN', width: 90},
    {field: 'subject', headerName: 'Subject', width: 130},
    {field: 'courseNumber', headerName: 'Course Number', width: 150},
    {field: 'title', headerName: 'Title', flex: 1, minWidth: 230},
    {field: 'instructor', headerName: 'Instructor', flex: 1, minWidth: 180},
    {field: 'courseCredits', headerName: 'Course Credits', width: 150},
    {
        field: 'schedule',
        headerName: 'Schedule',
        flex: 1,
        minWidth: 200,
        renderCell: params => (
            <Box sx={{whiteSpace: 'pre-wrap', lineHeight: 1.5}}>
                {Array.isArray(params.value)
                    ? params.value.join('\n')
                    : params.value}
            </Box>
        )
    }
];
