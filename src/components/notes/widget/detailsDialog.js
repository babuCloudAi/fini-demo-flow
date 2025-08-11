'use client';
import {InfinizeDialog} from '@/components/common';
import {Box, Typography} from '@mui/material';
import classes from './notes.module.css';
import Link from 'next/link';
import Image from 'next/image';
import DownloadIconButton from '../downloadButton';

export default function DetailsDialog({isOpen, onClose, notes}) {
    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title={notes.title}
            maxWidth={'md'}
        >
            <Box>
                <Typography
                    className={classes.infinize__viewMoreDialogDescription}
                    mb={3}
                >
                    {notes.description}
                </Typography>
                <Box display={'flex'} mt={1} flexDirection={'column'}>
                    <Typography
                        sx={{mb: 1}}
                        className={classes.infinize__viewMoreDialogTitle}
                    >
                        Attachment
                        {notes?.attachments?.length > 1 ? 's' : ''} (
                        {notes?.attachments?.length})
                    </Typography>
                    <Box
                        display={'flex'}
                        gap={2}
                        mt={1}
                        flexDirection={'column'}
                    >
                        {notes.attachments?.map((file, idx) => (
                            <Box
                                key={idx}
                                className={classes.infinize__fileCard}
                            >
                                <Box display={'flex'} width={'100%'}>
                                    <Image
                                        src="/img/uploadFile.svg"
                                        alt="Attachment"
                                        width={50}
                                        height={20}
                                    />

                                    <Box flexGrow={1}>
                                        <Typography
                                            fontWeight={500}
                                            fontSize={13}
                                        >
                                            {file.name}
                                        </Typography>
                                        <Typography
                                            fontWeight={400}
                                            fontSize={12}
                                        >
                                            {file?.size}
                                        </Typography>
                                        <Link
                                            href={file?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={
                                                classes.infinize__viewMoreDialogLink
                                            }
                                        >
                                            Click to view
                                        </Link>
                                    </Box>
                                </Box>
                                <DownloadIconButton />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </InfinizeDialog>
    );
}
