'use client';
import {useState} from 'react';
import {InfinizeDialog, TextInput} from '@/components/common';

export default function SavePlanDialog({isOpen, onClose, onSave}) {
    const [coursePlanName, setCoursePlanName] = useState('');

    const handleSave = () => {
        onSave(coursePlanName);
    };

    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title="Plan Name"
            contentText="Provide a name to save the plan."
            primaryButtonLabel="Save"
            onPrimaryButtonClick={handleSave}
            isPrimaryButtonDisabled={!coursePlanName}
        >
            <TextInput
                name="planName"
                value={coursePlanName}
                onChange={setCoursePlanName}
            />
        </InfinizeDialog>
    );
}
