import {InfinizeConfirmation} from '@/components/common';

export default function RevertDialog({isOpen, onClose, onSend, alert}) {
    return (
        <InfinizeConfirmation
            isOpen={isOpen}
            onClose={onClose}
            actionsLayoutAlignment="center"
            primaryButtonLabel="Revert"
            onConfirm={onSend}
            contentItemsAlignment="center"
            title="Confirm Revert"
            content={
                <>
                    The alert titled "
                    <span style={{fontWeight: 500}}>{alert?.title}</span>" will
                    be marked as unread and moved back to the active alerts
                    list. Do you want to proceed?
                </>
            }
        />
    );
}
