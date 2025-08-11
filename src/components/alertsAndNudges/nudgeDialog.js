'use client';
import {IconButton, Typography} from '@mui/material';
import {useState, useEffect} from 'react';
import nudgeMessageData from '@/data/alertsAndNudges/nudgeMessage.json';
import {
    InfinizeIcon,
    TextAreaField,
    InfinizeDialog,
    AILoader
} from '@/components/common';
export default function NudgeDialog({isOpen, onClose, onSend}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [nudgeMessage, setNudgeMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            toggleIsLoading(true);
            setNudgeMessage(nudgeMessageData.message);
            setTimeout(() => {
                toggleIsLoading(false);
            }, 2000); // TDOD : Replace the logice once the API is added
        }
    }, [isOpen]);

    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    const toggleIsLoading = isLoading => {
        setIsLoading(isLoading);
    };

    return (
        <>
            <InfinizeDialog
                isOpen={isOpen}
                onClose={onClose}
                title="Nudge Message"
                primaryButtonLabel={!isLoading && 'Send'}
                onPrimaryButtonClick={onSend}
                headerActions={
                    !isLoading &&
                    !isEditMode && (
                        <IconButton onClick={toggleIsEditMode}>
                            <InfinizeIcon
                                icon="mynaui-edit-one-solid"
                                width="20px"
                            />
                        </IconButton>
                    )
                }
                contentItemsAlignment={isLoading && 'center'}
            >
                {isLoading && <AILoader />}
                {!isLoading && isEditMode && (
                    <TextAreaField
                        hasWordLimit={true}
                        name="nudgeMessage"
                        label="nudgeMessage"
                        value={nudgeMessage}
                        onChange={val => setNudgeMessage(val)}
                    />
                )}

                {!isLoading && !isEditMode && (
                    <Typography>{nudgeMessage}</Typography>
                )}
            </InfinizeDialog>
        </>
    );
}
