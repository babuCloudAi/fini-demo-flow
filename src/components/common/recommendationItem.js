import {ListItem, Typography} from '@mui/material';
import {InfinizeIcon} from './infinizeIcon';

export function RecommendationItem({content}) {
    return (
        <ListItem>
            <InfinizeIcon icon="mdi-tick" width="20px" />
            <Typography className="infinize__recommendationsCardText">
                {content}
            </Typography>
        </ListItem>
    );
}
