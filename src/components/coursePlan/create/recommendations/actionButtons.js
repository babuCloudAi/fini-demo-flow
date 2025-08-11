import {Box, Button} from '@mui/material';
import classes from '../../coursePlan.module.css';
import {BANNER_TYPE} from '@/config/constants';

export default function ActionButtons({
    onSave,
    onCancel,
    bannerQueue,
    isEditMode,
    coursePlanName
}) {
    const hasErrorBanner =
        bannerQueue.length > 0 &&
        bannerQueue.some(banner => banner.type === BANNER_TYPE.ERROR);

    const isPlanNameEmpty = isEditMode && !coursePlanName?.trim();

    const isSaveButtonDisabled = hasErrorBanner || isPlanNameEmpty;

    return (
        <Box className={classes.infinize__coursePlanCardButtons}>
            <Button
                variant="contained"
                onClick={onSave}
                disabled={isSaveButtonDisabled}
            >
                Save
            </Button>
            {!isEditMode && (
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
            )}
        </Box>
    );
}
