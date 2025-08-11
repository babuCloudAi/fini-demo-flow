import React from 'react';
import {Button, Typography, Box} from '@mui/material';
import {InfinizeDialog, Loader} from '@/components/common';
import FileInput from '../../common/form/fileInput';
import classes from '../career.module.css';
import {ACCEPTED_RESUME_FORMATS} from '@/config/constants';

export default function UploadResumeDialog({
    isOpen,
    onClose,
    onContinue,
    onResumeUpload,
    resumeFile,
    onSkip,
    isLoading
}) {
    return (
        <InfinizeDialog
            isOpen={isOpen}
            onClose={onClose}
            title={'Create a personalized career recommendations'}
            maxWidth={'md'}
        >
            <Box width={'100%'} className={classes.infinize__dialogContent}>
                <Typography variant="h6" sx={{marginTop: 3, marginBottom: 1}}>
                    Upload Your Resume
                </Typography>
                <Box display={'flex'} flexDirection={'column'} gap={3}>
                    <FileInput
                        file={resumeFile}
                        setFile={onResumeUpload}
                        primaryLabel="Click to Upload"
                        acceptedFormats={ACCEPTED_RESUME_FORMATS}
                    />
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        gap={2}
                        mt={3}
                    >
                        <Button
                            size="large"
                            variant="outlined"
                            sx={{minWidth: 150, textTransform: 'none'}}
                            onClick={onSkip}
                        >
                            Skip for now
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            sx={{minWidth: 150, textTransform: 'none'}}
                            disabled={!resumeFile}
                            onClick={onContinue}
                        >
                            Continue
                        </Button>
                    </Box>
                </Box>

                {isLoading && <Loader isOpen={isLoading} />}
            </Box>
        </InfinizeDialog>
    );
}
