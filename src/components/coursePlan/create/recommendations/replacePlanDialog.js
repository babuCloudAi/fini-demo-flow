'use client';
import {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {InfinizeDialog, RadioGroupField} from '@/components/common';

export default function ReplacePlanDialog({
    isOpen,
    onClose,
    onReplace,
    existingPlans
}) {
    const [selectedPlanToReplace, setSelectedPlanToReplace] = useState(null);

    const handleReplace = () => {
        setSelectedPlanToReplace(null);
        onReplace();
    };

    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title="Alert!"
            contentText="You have three plans saved already. To create a new one, you’ll need to replace one of the existing plans."
            primaryButtonLabel="Continue"
            onPrimaryButtonClick={handleReplace}
            isPrimaryButtonDisabled={!selectedPlanToReplace}
        >
            <Box>
                <Typography fontSize="16px" fontWeight="500">
                    Which plan would you like to replace?
                </Typography>
                <RadioGroupField
                    name="coursePlanReplace"
                    value={selectedPlanToReplace}
                    options={existingPlans.map(plan => plan.name)}
                    onChange={setSelectedPlanToReplace}
                />
            </Box>
        </InfinizeDialog>
    );
}
