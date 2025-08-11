'use client';
import {IconButton, Typography} from '@mui/material';
import {useState, useEffect} from 'react';
import kudosMessageData from '@/data/alertsAndNudges/kudosMessage.json';
import {
    InfinizeIcon,
    TextAreaField,
    InfinizeDialog,
    AILoader
} from '@/components/common';

export default function KudosDialog({isOpen, onClose, onSend}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [kudosMessage, setKudosMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            toggleIsLoading(true);
            setKudosMessage(kudosMessageData.message);
            setTimeout(() => {
                toggleIsLoading(false);
            }, 2000); // TODO: Replace logic once the API is added
        }
    }, [isOpen]);

    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };

    const toggleIsLoading = isLoading => {
        setIsLoading(isLoading);
    };

    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title="Send Kudos"
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
            contentItemsAlignment={isLoading ? 'center' : 'flex-start'}
        >
            {isLoading && <AILoader />}

            {!isLoading && isEditMode && (
                <TextAreaField
                    hasWordLimit={true}
                    name="kudosMessage"
                    label="Kudos Message"
                    value={kudosMessage}
                    onChange={val => setKudosMessage(val)}
                />
            )}

            {!isLoading && !isEditMode && (
                <Typography>{kudosMessage}</Typography>
            )}
        </InfinizeDialog>
    );
}
