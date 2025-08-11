import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import classes from './search.module.css';
const NoResultsPlaceholder = () => {
    return (
        <Box className={classes.infinize__noSearchResults}>
            <Image
                src="/img/noSearchResults.svg"
                alt="Illustration depicting no search results"
                width={300}
                height={300}
            />

            <Typography variant="h4" color="primary" mb={1} fontWeight={600}>
                No Search Results Found
            </Typography>
            <Typography variant="body1" mb={3}>
                We couldn't find any students matching your search query.
            </Typography>
        </Box>
    );
};

export default NoResultsPlaceholder;
