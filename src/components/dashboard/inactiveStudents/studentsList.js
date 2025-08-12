'use client';
import {useState} from 'react';
import {
    Stack,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import styles from '../dashboard.module.css';
import {InfinizeIcon} from '@/components/common';
import StudentTable from './studentTable';

export default function StudentList({students}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const handleBulkClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleBulkClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleStudentSelectionChange = selectionModel => {
        const ids = Array.isArray(selectionModel)
            ? selectionModel
            : Array.from(selectionModel?.ids ?? []);
        setSelectedStudents(ids);
    };

    return (
        <Stack spacing={2} className={styles.infinize__AdvisorStudentsList}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={3}
            >
                <Typography variant="h6" color="primary">
                    Inactive Students
                </Typography>
                <Stack direction={'row'} spacing={2}>
                    {selectedStudents.length > 0 && (
                        <Button
                            variant="contained"
                            endIcon={
                                <InfinizeIcon
                                    icon="tabler:chevron-right"
                                    width={'20px'}
                                    height={'20px'}
                                />
                            }
                            onClick={handleBulkClick}
                            className="infinize__Button"
                        >
                            Bulk Actions
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        startIcon={
                            <InfinizeIcon
                                icon="ph:export"
                                width={'20px'}
                                height={'20px'}
                            />
                        }
                        className="infinize__Button"
                    >
                        Export All
                    </Button>
                </Stack>
            </Stack>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleBulkClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                className="menu"
            >
                <MenuItem onClick={handleBulkClose} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="tabler:copy" />
                    </ListItemIcon>
                    Copy ID
                </MenuItem>
                <MenuItem onClick={handleBulkClose} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="tabler:mail-share" />
                    </ListItemIcon>
                    Send Email
                </MenuItem>
                <MenuItem onClick={handleBulkClose} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="tabler:message-share" />
                    </ListItemIcon>
                    Send Text Message
                </MenuItem>
                <MenuItem onClick={handleBulkClose} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon icon="stash:article-share-solid" />
                    </ListItemIcon>
                    Export Selected
                </MenuItem>
            </Menu>
            <StudentTable
                students={students}
                selectedStudents={selectedStudents}
                seletedRows={handleStudentSelectionChange}
            />
        </Stack>
    );
}
