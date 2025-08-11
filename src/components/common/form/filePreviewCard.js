// components/common/FilePreviewCard.js

import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {InfinizeIcon} from '..';
import classes from './formFields.module.css';

export default function FilePreviewCard({
    name,
    size,
    url,
    onDelete,
    onEdit,
    isEditable = false,
    isDeletable = false,
    index
}) {
    return (
        <Card className={classes.infinize__fileInputCard} variant="outlined">
            <CardContent className={classes.infinize__fileInputCardContent}>
                <Box>
                    <Image
                        src="/img/uploadFile.svg"
                        alt="Upload icon"
                        width={50}
                        height={20}
                        priority
                    />
                </Box>
                <Box>
                    <Typography
                        className={classes.infinize__fileInputFileDetails}
                    >
                        {name}
                    </Typography>
                    <Typography className={classes.infinize__fileInputFileSize}>
                        {size}
                    </Typography>
                    {url && (
                        <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.infinize__filePreview}
                        >
                            Click to view
                        </Link>
                    )}
                </Box>
            </CardContent>
            <CardActions>
                {isDeletable && (
                    <IconButton onClick={() => onDelete(index)}>
                        <InfinizeIcon icon="fluent:delete-24-regular" />
                    </IconButton>
                )}
                {isEditable && (
                    <IconButton onClick={onEdit}>
                        <InfinizeIcon
                            icon="akar-icons:edit"
                            className={classes.infinize__fileInputEditButton}
                        />
                    </IconButton>
                )}
            </CardActions>
        </Card>
    );
}
