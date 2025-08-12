import React, {useState} from 'react';
import {Checkbox, Stack, Typography} from '@mui/material';
import AlertMenu from '@/components/alertsAndNudges/widget/menu';
import NudgeDialog from '@/components/alertsAndNudges/nudgeDialog';
import KudosDialog from '@/components/alertsAndNudges/kudosDialog';

export default function Card({data, isBulkActionEnabled, isChecked, onChange}) {
    const [isNudgeDialogOpen, setIsNudgeDialogOpen] = useState(false);
    const [isKudosDialogOpen, setIsKudosDialogOpen] = useState(false);

    const toggleIsNudgeDialogOpen = () => {
        setIsNudgeDialogOpen(prev => !prev);
    };

    const toggleIsKudosDialogOpen = () => {
        setIsKudosDialogOpen(prev => !prev);
    };

    const handleNudgeSubmit = () => {
        toggleIsNudgeDialogOpen();
    };

    const handleKudosSubmit = () => {
        toggleIsKudosDialogOpen();
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            px={0}
            spacing={1}
        >
            {/* Left content */}
            <Stack direction="row" spacing={2} alignItems={'flex-start'}>
                <Checkbox
                    sx={{padding: '0px'}}
                    checked={isChecked || false}
                    onClick={e => e.stopPropagation()}
                    onChange={onChange}
                    className="customCheckbox"
                />
                <Stack spacing={0.5}>
                    <Typography fontWeight="600">{data.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.date}
                    </Typography>
                    <Typography variant="body2" mt={0.5}>
                        {data.description}
                    </Typography>
                </Stack>
            </Stack>

            {/* Right actions */}
            {!isBulkActionEnabled && (
                <AlertMenu
                    onGenerateNudge={handleNudgeSubmit}
                    onSendKudos={handleKudosSubmit}
                />
            )}

            {isNudgeDialogOpen && (
                <NudgeDialog
                    isOpen={isNudgeDialogOpen}
                    onClose={toggleIsNudgeDialogOpen}
                    onSend={handleNudgeSubmit}
                />
            )}
            {isKudosDialogOpen && (
                <KudosDialog
                    isOpen={isKudosDialogOpen}
                    onClose={toggleIsKudosDialogOpen}
                    onSend={handleKudosSubmit}
                />
            )}
        </Stack>
    );
}
