import {Box, Button, Typography} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Styles from './common.module.css';

export function NoResults({title, description, href, buttonLabel, onClick}) {
    return (
        <Box className={Styles.noResults}>
            <Image
                src="/img/noResults.svg"
                alt="Illustration representing no available results"
                width={300}
                height={300}
                priority
            />
            <Typography variant="h2" color="primary">
                {title}
            </Typography>
            <Typography variant="body1">{description}</Typography>
            {buttonLabel && (
                <Button
                    component={href ? Link : 'button'}
                    className={Styles.noResultsButton}
                    aria-label={description}
                    sx={{textTransform: 'none'}}
                    href={href}
                    onClick={onClick}
                >
                    {buttonLabel}
                </Button>
            )}
        </Box>
    );
}
