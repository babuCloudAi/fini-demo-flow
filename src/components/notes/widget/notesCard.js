import {
    Box,
    Stack,
    Typography,
    Tooltip,
    useTheme,
    Divider,
    Button
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import classes from '../../common/common.module.css';
import NotesMenu from './notesMenu';
import {useState} from 'react';
import DetailsDialog from './detailsDialog';
import DeleteDialog from '../deleteDialog';

export default function NotesCard({notes, onEdit}) {
    const theme = useTheme();
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const toggleIsDetailsDialogOpen = () => {
        setIsDetailsDialogOpen(prev => !prev);
    };
    const toggleIsDeleteDialogOpenialogOpen = () => {
        setIsDeleteDialogOpen(prev => !prev);
    };

    const handleDelete = e => {
        toggleIsDeleteDialogOpenialogOpen();
    };
    const handleEdit = () => {
        onEdit(notes);
        console.log('edited');
    };
    return (
        <Box className={classes.infinize__widgetCard}>
            <Box className={classes.infinize__widgetCardContent}>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    width={'100%'}
                >
                    <Stack direction="row" spacing={2} alignItems="start">
                        <InfinizeIcon
                            icon="solar:notes-bold"
                            style={{color: theme.palette.primary.main}}
                            className={classes.infinize__nudgeIcon}
                        />

                        <Stack spacing={1}>
                            <Tooltip title={notes.title}>
                                <Typography variant="h4">
                                    {notes.title}
                                </Typography>
                            </Tooltip>
                            <Typography variant="body2">
                                {notes.date}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box spacing={1}>
                        <NotesMenu
                            onEdit={handleEdit}
                            onDeleted={handleDelete}
                        />
                    </Box>
                </Box>
                <div className={classes.infinize__widgetCardNotes}>
                    <Divider />
                </div>

                <Typography variant="h5">
                    Created by: <span>{notes.createdBy}</span>
                </Typography>

                <Typography
                    variant="body1"
                    className={classes.infinize__widgetCardDescription}
                >
                    {notes.description}
                </Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                gap={'4px'}
                justifyContent={'flex-end'}
                width={'100%'}
            >
                <Button
                    variant="contained"
                    onClick={toggleIsDetailsDialogOpen}
                    sx={{
                        textTransform: 'none',
                        alignSelf: 'flex-end'
                    }}
                >
                    View More
                    <InfinizeIcon icon="tabler:chevron-right" width="18px" />
                </Button>
            </Box>
            {isDetailsDialogOpen && (
                <DetailsDialog
                    notes={notes}
                    isOpen={isDetailsDialogOpen}
                    onClose={toggleIsDetailsDialogOpen}
                />
            )}
            {isDeleteDialogOpen && (
                <DeleteDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={toggleIsDeleteDialogOpenialogOpen}
                    title={notes.title}
                />
            )}
        </Box>
    );
}
