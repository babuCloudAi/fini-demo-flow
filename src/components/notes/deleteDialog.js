import {InfinizeConfirmation} from '@/components/common';

export default function DeleteDialog({isOpen, onClose, isDeleted, title}) {
    return (
        <InfinizeConfirmation
            isOpen={isOpen}
            onClose={onClose}
            actionsLayoutAlignment="center"
            primaryButtonLabel="Delete Note"
            onConfirm={isDeleted}
            contentItemsAlignment="center"
            title="Confirm Note Deletion"
            content={
                <>
                    Are you sure you want to delete the note titled "
                    <span style={{fontWeight: 500}}>{title}</span>"? This action
                    cannot be undone.
                </>
            }
        />
    );
}
