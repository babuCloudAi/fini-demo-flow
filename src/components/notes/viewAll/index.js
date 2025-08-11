'use client';
import React, {useState, useEffect} from 'react';
import {Box, Typography, Skeleton, Button} from '@mui/material';
import classes from './viewAllNotes.module.css';
import {InfinizePagination} from '@/components/common';
import NotesAccordion from './notesAccordion';
import data from '@/data/studentProfile/notes.json';
import NoNotes from '../noNotes';
import AddNoteDialog from '../addNoteDialog';

export default function ViewAllNotes() {
    const itemsPerPage = 10;
    const [notesList, setNotesList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddUpdateDialogOpen, setIsAddUpdateDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        setPageNumber(1);
        setNotesList(data.notes ?? []);
    }, [data]);

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNotes = notesList?.slice(startIndex, endIndex);
    const totalNumberOfPages = Math.ceil(notesList?.length / itemsPerPage);

    const handlePageChange = newPage => {
        setPageNumber(newPage);
    };

    const toggleIsLoading = isLoading => {
        setIsLoading(isLoading);
    };
    useEffect(() => {
        setTimeout(() => {
            toggleIsLoading(false);
        }, 2000); // TODO: Replace logic once the API is added
    }, []);

    const toggelIsAddUpdateDialogOpen = () => {
        setIsAddUpdateDialogOpen(prev => !prev);
    };
    const handleAddNotes = e => {
        toggelIsAddUpdateDialogOpen();
    };
    const handleEditNotes = note => {
        setSelectedNote(note);
        setIsEditMode(true);
        toggelIsAddUpdateDialogOpen();
    };
    const handleCloseDialog = () => {
        setIsAddUpdateDialogOpen(false);
        setIsEditMode(false);
        setSelectedNote(null);
    };

    return (
        <Box mt={3} className={classes.infinize__viewAllNotesContainer}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                px={2}
                py={1}
            >
                <Typography
                    className={classes.infinize__viewAllNotesTabHeading}
                >
                    Notes
                </Typography>
                {!isLoading && notesList?.length > 0 && (
                    <Button variant="contained" onClick={handleAddNotes}>
                        Add Notes
                    </Button>
                )}
            </Box>
            {isLoading && (
                <Box display="flex" flexDirection="column" gap={3}>
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={`skeleton_${index}`}
                                variant="rectangular"
                                height={100}
                            />
                        ))}
                </Box>
            )}
            {!isLoading && notesList?.length > 0 && (
                <Box display="flex" flexDirection="column" gap={3}>
                    {paginatedNotes.map((notes, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="flex-start"
                            width="100%"
                        >
                            <NotesAccordion
                                notes={notes}
                                onEdit={handleEditNotes}
                            />
                        </Box>
                    ))}

                    <Box
                        display={'flex'}
                        gap={1}
                        alignItems={'center'}
                        alignSelf={'flex-end'}
                    >
                        <Typography variant="body2">
                            {startIndex + 1} -{' '}
                            {Math.min(endIndex, notesList?.length)} of{' '}
                            {notesList?.length}
                        </Typography>
                        <InfinizePagination
                            count={totalNumberOfPages}
                            page={pageNumber}
                            onPageChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box>
                </Box>
            )}

            {!isLoading && notesList?.length === 0 && <NoNotes />}

            {isAddUpdateDialogOpen && (
                <AddNoteDialog
                    selectedNote={selectedNote}
                    isEditMode={isEditMode}
                    isOpen={isAddUpdateDialogOpen}
                    onClose={handleCloseDialog}
                />
            )}
        </Box>
    );
}
