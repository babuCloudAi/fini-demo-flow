'use client';
import {useState, useEffect} from 'react';
import {Button, Grid, Skeleton, Stack} from '@mui/material';
import {Widget} from '@/components/common';
import data from '@/data/studentProfile/notes.json';
import styles from './notes.module.css';
import NotesCard from './notesCard';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import NoNotes from '../noNotes';
import AddNoteDialog from '../addNoteDialog';
import {NOTES_ON_DASHBOARD_MAX_LIMIT} from '@/config/constants';

export default function Notes() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [notesList, setNotesList] = useState([]);
    const {studentId} = useParams();
    const [isAddUpdateDialogOpen, setIsAddUpdateDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        setNotesList(data.notes ?? []);

        // Temporary timeout to simulate loading; remove after real API integration.
        const timeout = setTimeout(() => setIsLoading(false), 2000);

        return () => clearTimeout(timeout); // Cleanup on unmount or when data changes
    }, [data]);

    const toggleIsExpanded = () => {
        setIsExpanded(prev => !prev);
    };
    const toggleIsAddUpdateDialogOpen = () => {
        setIsAddUpdateDialogOpen(prev => !prev);
    };
    const handleAddNotes = e => {
        e.stopPropagation();
        toggleIsAddUpdateDialogOpen();
        setIsEditMode(false);
    };
    const handleEditNotes = notes => {
        setSelectedNote(notes);
        setIsEditMode(true);
        toggleIsAddUpdateDialogOpen();
    };
    return (
        <Widget
            expanded={isExpanded}
            onChange={toggleIsExpanded}
            title="Notes"
            actions={
                !isLoading && (
                    <Stack direction="row" gap={2}>
                        {notesList.length > NOTES_ON_DASHBOARD_MAX_LIMIT && (
                            <Button
                                variant="outlined"
                                onClick={e => e.stopPropagation()}
                                component={Link}
                                className={'infinize__button'}
                                href={`/student/${studentId}/notes`}
                            >
                                View All
                            </Button>
                        )}
                        {notesList.length > 0 && (
                            <Button
                                variant="contained"
                                onClick={handleAddNotes}
                                className={'infinize__button'}
                            >
                                Add Notes
                            </Button>
                        )}
                    </Stack>
                )
            }
        >
            {isLoading && (
                <Stack direction="row" gap={2} p={2}>
                    {Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={`skeleton_${index}`}
                                variant="rectangular"
                                width="33%"
                                height={200}
                            />
                        ))}
                </Stack>
            )}
            {!isLoading && (
                <>
                    {notesList.length > 0 && (
                        <Grid
                            container
                            spacing={3}
                            className={styles.infinize__notesCards}
                            alignItems="stretch"
                        >
                            {notesList
                                .slice(0, NOTES_ON_DASHBOARD_MAX_LIMIT)
                                .map((notes, index) => (
                                    <Grid
                                        size={{xs: 12, md: 4}}
                                        key={`note_${index}`}
                                    >
                                        <NotesCard
                                            key={`note_${index}`}
                                            notes={notes}
                                            onEdit={handleEditNotes}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    )}

                    {!isLoading && notesList.length === 0 && (
                        <NoNotes addNotes={handleAddNotes} />
                    )}
                    {isAddUpdateDialogOpen && (
                        <AddNoteDialog
                            isOpen={isAddUpdateDialogOpen}
                            onClose={toggleIsAddUpdateDialogOpen}
                            selectedNote={selectedNote}
                            isEditMode={isEditMode}
                        />
                    )}
                </>
            )}
        </Widget>
    );
}
