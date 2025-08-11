import {Box, Typography, List} from '@mui/material';
import {DATA_TYPE} from '@/config/constants';
import {RecommendationItem} from '@/components/common';

export function RecommendationCategory({content}) {
    if (Array.isArray(content)) {
        return (
            <List>
                {content.map((item, idx) => (
                    <RecommendationItem key={idx} content={item} />
                ))}
            </List>
        );
    }

    if (typeof content === DATA_TYPE.OBJECT && content !== null) {
        return (
            <Box>
                {Object.entries(content).map(([key, value]) => (
                    <Box key={key} mb={2}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {key}
                        </Typography>
                        <RecommendationCategory content={value} />
                    </Box>
                ))}
            </Box>
        );
    }

    return (
        <Typography className="infinize__recommendationsCardText">
            {content}
        </Typography>
    );
}
