'use client';
import {Box, Typography} from '@mui/material';
import {InfinizeDialog, TextAreaField, TextInput} from '../common';
import FileInput from '../common/form/fileInput';
import {useMemo, useState} from 'react';
import {ACCEPTED_NOTES_FORMATS} from '@/config/constants';
import classes from './notes.module.css';
import isEqual from 'lodash/isEqual';

export default function AddNoteDialog({
    isOpen,
    onClose,
    isEditMode = false,
    selectedNote
}) {
    const [title, setTitle] = useState(selectedNote?.title || '');
    const [description, setDescription] = useState(
        selectedNote?.description || ''
    );
    const [attachments, setAttachments] = useState(
        selectedNote?.attachments || []
    );

    const maxFiles = parseInt(process.env.NEXT_PUBLIC_MAX_NOTE_ATTACHMENTS);

    const handleFileInput = file => {
        setAttachments(file);
    };

    const handleDelete = index => {
        const updatedFiles = [...attachments];
        updatedFiles.splice(index, 1);
        setAttachments(updatedFiles);
    };

    // useMemo is used to avoid unnecessary re-calculations on every render.
    // It recalculates only when title, description, attachments, selectedNote, or isEditMode changes.
    const isUnchanged = useMemo(() => {
        // Extract original attachments from selected note or fallback to empty array
        const originalAttachments = selectedNote?.attachments || [];

        // Compare trimmed titles
        const titleMatch = title.trim() === (selectedNote?.title || '').trim();

        // Compare trimmed descriptions
        const descriptionMatch =
            description.trim() === (selectedNote?.description || '').trim();

        // Deep compare attachments using lodash.isEqual
        const attachmentsMatch = isEqual(attachments, originalAttachments);

        // All values must match to consider the form unchanged (only applies in edit mode)
        return isEditMode && titleMatch && descriptionMatch && attachmentsMatch;
    }, [title, description, attachments, selectedNote, isEditMode]);

    // Determine whether the "Continue" button should be disabled
    const isContinueButtonDisabled = isEditMode
        ? isUnchanged // In edit mode, disable if nothing has changed
        : !title.trim() && !description.trim() && attachments.length === 0;
    // In add mode, disable if all fields are empty (title, description, and attachments)

    const handleContinue = () => {
        const payload = {
            title,
            description,
            attachments
        };
        console.log('Form submitted:', payload);
        // Submit logic here
        onClose();
    };

    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Notes' : 'Add Notes'}
            maxWidth={'md'}
            primaryButtonLabel={'Continue'}
            onPrimaryButtonClick={handleContinue}
            isPrimaryButtonDisabled={isContinueButtonDisabled}
            actionsLayoutAlignment="flex-start"
        >
            <Box className={classes.infinize__notesContainer}>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Title
                    </Typography>
                    <TextInput
                        name="title"
                        label="Title"
                        onChange={value => setTitle(value)}
                        value={title}
                    />
                </Box>
                <Box>
                    <Typography className="infinize__inputLabel">
                        Description
                    </Typography>
                    <TextAreaField
                        value={description}
                        maxWords={500}
                        hasWordLimit={true}
                        name={'description'}
                        label="Description"
                        onChange={value => setDescription(value)}
                    />
                </Box>
                <Box>
                    <Box
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography className="infinize__inputLabel">
                            Attachments
                        </Typography>

                        <Typography
                            fontSize={14}
                            className={classes.infinize__attachmentInfo}
                        >
                            Files uploaded: {attachments.length} / {maxFiles}
                        </Typography>
                    </Box>
                    <FileInput
                        file={attachments}
                        setFile={handleFileInput}
                        primaryLabel="Drop files"
                        secondaryLabel="here or click to browse"
                        acceptedFormats={ACCEPTED_NOTES_FORMATS}
                        isNotes={true}
                        onDelete={handleDelete}
                        isMultiUploadEnabled={true}
                        maxFiles={maxFiles}
                    />
                </Box>
            </Box>
        </InfinizeDialog>
    );
}
