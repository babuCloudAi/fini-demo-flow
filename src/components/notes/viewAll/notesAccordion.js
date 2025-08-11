'use client';
import React, {useState} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    useTheme,
    Stack,
    IconButton,
    Chip,
    Box
} from '@mui/material';
import {CustomChip, InfinizeIcon} from '@/components/common';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '@/config/constants';
import classes from './viewAllNotes.module.css';
import NotesMenu from '../widget/notesMenu';
import DeleteDialog from '../deleteDialog';
import DownloadIconButton from '../downloadButton';

export default function NotesAccordion({notes, onEdit}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const theme = useTheme();

    const toggleisDeleteDialogOpen = () => {
        setIsDeleteDialogOpen(prev => !prev);
    };
    const toggleIsExpand = () => {
        setIsExpanded(prev => !prev);
    };

    const handleEdit = () => {
        onEdit(notes);
    };

    const handleDelete = e => {
        toggleisDeleteDialogOpen();
    };

    return (
        <Accordion
            expanded={isExpanded}
            onChange={toggleIsExpand}
            disableGutters
            className={classes.infinize__notesAccordion}
            aria-expanded={isExpanded}
            aria-controls="widget_content"
            tabIndex={0}
        >
            <AccordionSummary
                component="div"
                sx={{
                    borderBottom: isExpanded && '1px solid #ebf2fd',
                    px: 2,
                    cursor: 'pointer'
                }}
            >
                <Stack
                    direction={{xs: 'column', sm: 'column', md: 'row'}}
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="start"
                        width={'100%'}
                    >
                        <InfinizeIcon
                            icon="stash:trophy-solid"
                            style={{color: theme.palette.primary.main}}
                            className={classes.infinize__notesIcon}
                        />
                        <Stack spacing={0.5}>
                            <Typography
                                className={classes.infinize__notesTitle}
                            >
                                {notes.title}
                            </Typography>
                            <Typography variant="body2">
                                {dayjs(notes.date).format(DATE_FORMAT?.SHORT)}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent={{
                            xs: 'space-between',
                            sm: 'space-between',
                            md: 'end'
                        }}
                        width={'100%'}
                    >
                        <Typography variant="body2">
                            <Typography component="span" fontWeight={500}>
                                Created by:
                            </Typography>{' '}
                            {notes.createdBy}
                        </Typography>

                        <Box>
                            <IconButton
                                size="small"
                                sx={{
                                    transform: isExpanded
                                        ? 'rotate(180deg)'
                                        : 'rotate(0deg)'
                                }}
                            >
                                <InfinizeIcon icon="si:expand-more-duotone" />
                            </IconButton>
                            <NotesMenu
                                onEdit={handleEdit}
                                onDeleted={toggleisDeleteDialogOpen}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{p: 3}}>
                <Typography className={classes.infinize__notesDescription}>
                    {notes.description}
                </Typography>
                <Box>
                    <Typography variant="subtitle2" sx={{mb: 1}}>
                        Attachments ({notes?.attachments?.length}):
                    </Typography>
                    <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                        {notes?.attachments?.map((file, index) => (
                            <CustomChip
                                key={index}
                                label={file.name}
                                onAction={() => {}}
                                actionIcon={<DownloadIconButton />}
                            />
                        ))}
                    </Box>
                </Box>
                {isDeleteDialogOpen && (
                    <DeleteDialog
                        title={notes.title}
                        isOpen={isDeleteDialogOpen}
                        onClose={toggleisDeleteDialogOpen}
                        isDeleted={handleDelete}
                    />
                )}
            </AccordionDetails>
        </Accordion>
    );
}
