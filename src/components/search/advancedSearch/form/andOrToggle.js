import {Box, Typography, FormControlLabel, Switch} from '@mui/material';
import classes from '../../advancedSearch/advancedSearch.module.css';
import {AND, OR} from '@/config/constants';

export function ToggleSwitch({
    labelLeft = '',
    labelRight = '',
    checked = false,
    onChange
}) {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            {labelLeft && <Typography variant="body2">{labelLeft}</Typography>}
            <FormControlLabel
                sx={{m: 0}}
                control={
                    <Switch
                        checked={checked}
                        onChange={onChange}
                        inputProps={{
                            'aria-label': `'${labelLeft} or ${labelRight} Toggle'`
                        }}
                    />
                }
                label=""
            />
            {labelRight && (
                <Typography variant="body2">{labelRight}</Typography>
            )}
        </Box>
    );
}

export function AndOrToggle({isOr}) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="100%"
        >
            <Box display="flex" alignItems="center" width="100%">
                <Box flex={1} className={classes.infinize__Boxborder} />
                <Box className={classes.infinize__advancedSearch__logic_box}>
                    {isOr ? OR : AND}
                </Box>
                <Box flex={1} className={classes.infinize__Boxborder} />
            </Box>
        </Box>
    );
}
