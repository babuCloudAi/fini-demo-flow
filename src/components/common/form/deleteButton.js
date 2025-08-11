import {IconButton, Box} from '@mui/material';
import {InfinizeIcon} from '../infinizeIcon';

export function DeleteButton({onClick}) {
    return (
        <Box className="infinize__iconCustomBox">
            <IconButton onClick={onClick}>
                <InfinizeIcon
                    icon="fluent:delete-24-filled"
                    width={18}
                    hight={18}
                />
            </IconButton>
        </Box>
    );
}
