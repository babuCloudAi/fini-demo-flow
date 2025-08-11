'use client';
import {InfinizeDialog} from '@/components/common';
import CoursePlanRecommendations from '../create/recommendations';

export default function EditPlanDialog({
    isOpen,
    onClose,
    isEditPlanDialogOpen,
    termsToBeHidden
}) {
    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Change Course Plan'}
            maxWidth="lg"
        >
            <CoursePlanRecommendations
                isEditMode={true}
                openEditPlanDialog={isEditPlanDialogOpen}
                termsToBeHidden={termsToBeHidden}
            />
        </InfinizeDialog>
    );
}
