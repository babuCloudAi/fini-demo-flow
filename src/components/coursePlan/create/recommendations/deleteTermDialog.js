'use client';
import {Typography} from '@mui/material';
import {InfinizeConfirmation} from '../../../common';

export default function DeleteTermDialog({onClose, onConfirm, termName}) {
    return (
        <InfinizeConfirmation
            isOpen
            onClose={onClose}
            primaryButtonLabel="Delete"
            onConfirm={onConfirm}
            title="Confirm Term Deletion"
            content={
                <>
                    Are you sure you want to delete the Term{' '}
                    <Typography component="span" fontWeight={500}>
                        "{termName}"
                    </Typography>
                    ?{' '}
                    <Typography component="span" display="block">
                        All associated courses will also be removed.
                    </Typography>
                </>
            }
        />
    );
}
