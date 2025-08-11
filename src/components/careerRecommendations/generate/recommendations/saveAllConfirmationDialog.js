'use client';
import {InfinizeConfirmation} from '@/components/common';

export default function SaveAllConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    careersCount
}) {
    return (
        <InfinizeConfirmation
            isOpen={isOpen}
            onClose={onClose}
            actionsLayoutAlignment="center"
            primaryButtonLabel="Save All"
            onConfirm={onConfirm}
            contentItemsAlignment="center"
            title="Confirm Save All"
            content={
                <>
                    This action will save{' '}
                    <span style={{fontWeight: 600}}>
                        {careersCount} careers
                    </span>{' '}
                    to the student’s profile. Would you like to proceed?
                </>
            }
        />
    );
}
