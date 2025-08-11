import {useDropzone} from 'react-dropzone';
import {useState, useRef, useEffect, useCallback} from 'react';
import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import {BYTES, MAX_SIZE_5MB} from '@/config/constants';
import classes from './formFields.module.css';
import FilePreviewCard from './filePreviewCard';

export default function FileInput({
    file,
    setFile,
    primaryLabel = 'Click to Upload',
    acceptedFormats,
    isMultiUploadEnabled = false,
    onDelete,
    secondaryLabel,
    maxFiles
}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [filePreviews, setFilePreviews] = useState([]);
    const fileInputRef = useRef(null);
    const isMaxFilesReached = file.length === maxFiles;

    // --- Helper: Generate preview object(s) ---
    const generatePreviews = files => {
        const toPreview = file => ({
            name: file.name || 'Unknown Name',
            size: file.size
                ? `${(file.size / BYTES).toFixed(2)} KB`
                : 'Unknown Size',
            url:
                file instanceof File
                    ? URL.createObjectURL(file)
                    : file.url ?? '',
            type: file.type ?? ''
        });

        if (Array.isArray(files)) return files.map(toPreview);
        if (typeof files === 'object') return [toPreview(files)];
        return [];
    };

    useEffect(() => {
        if (!file) {
            setFilePreviews([]);
            return;
        }
        setFilePreviews(generatePreviews(file));
    }, [file]);

    const handleFileUpload = files => {
        const acceptedMimeTypes = Object.keys(acceptedFormats);

        const validFiles = [];
        const rejectedFiles = [];

        for (const file of files) {
            const isValidType = acceptedMimeTypes.includes(file.type);
            const isValidSize = file.size <= MAX_SIZE_5MB;

            if (isValidType && isValidSize) {
                validFiles.push(file);
            } else {
                rejectedFiles.push({
                    name: file.name,
                    reason: !isValidType
                        ? 'unsupported file type'
                        : 'file too large'
                });
            }
        }

        if (rejectedFiles.length > 0) {
            const firstIssue = rejectedFiles[0];
            setErrorMessage(
                `File "${firstIssue.name}" is invalid due to ${firstIssue.reason}.`
            );
            return;
        }

        if (isMultiUploadEnabled) {
            const currentFilesCount = Array.isArray(file) ? file.length : 0;
            if (currentFilesCount + validFiles.length > maxFiles) {
                setErrorMessage(
                    `Maximum of ${maxFiles} files allowed. Please remove extra files and try again.`
                );
                return;
            }
            setFile(prev => [...(prev || []), ...validFiles]);
        } else {
            if (validFiles.length > 1) {
                setErrorMessage('Only one file can be uploaded at a time.');
                return;
            }
            setFile(validFiles[0]);
        }
    };

    const onDrop = useCallback(
        (acceptedFiles, fileRejections) => {
            setErrorMessage('');

            const currentCount = Array.isArray(file) ? file.length : 0;
            const totalCount = currentCount + acceptedFiles.length;

            if (isMultiUploadEnabled && totalCount > maxFiles) {
                setErrorMessage(`You can only upload up to ${maxFiles} files.`);
                return;
            }

            handleFileUpload(acceptedFiles);
        },
        [file, isMultiUploadEnabled, maxFiles]
    );

    const {getRootProps, getInputProps} = useDropzone({
        accept: acceptedFormats,
        maxSize: MAX_SIZE_5MB,
        multiple: isMultiUploadEnabled,
        onDrop,
        disabled: isMaxFilesReached // disables dropzone when max files reached
    });
    const handleEditClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <Box>
            {/* TODO: Replace current drop zone implementation with MUI
            Card-based drag and drop. */}
            {/* Dropzone (only shows if no files yet) */}
            {(filePreviews.length === 0 || isMultiUploadEnabled) && (
                <Box
                    {...getRootProps()}
                    className={`${classes.infinize__fileInputDropzone} ${
                        isMaxFilesReached && classes.dropzoneDisabled
                    }`}
                >
                    <input {...getInputProps()} />
                    <Box
                        display="inline-flex"
                        p={1}
                        className={classes.infinize__fileUploadIcon}
                        sx={{
                            filter: isMaxFilesReached
                                ? 'grayscale(100%)'
                                : 'none'
                        }}
                    >
                        <Image
                            src="/img/file.svg"
                            alt="Upload icon"
                            width={30}
                            height={30}
                            priority
                        />
                    </Box>
                    <Box className={classes.infinize__fileInputUploadText}>
                        <Box
                            display={'flex'}
                            gap={1}
                            justifyContent={'center'}
                            alignItems={'baseline'}
                        >
                            <Typography
                                fontSize={13}
                                fontWeight={500}
                                color={
                                    isMaxFilesReached
                                        ? '#7F7F7F'
                                        : 'primary.main'
                                }
                            >
                                {primaryLabel}
                            </Typography>

                            <Typography
                                variant="body2"
                                color={
                                    isMaxFilesReached ? '#7F7F7F' : 'inherit'
                                }
                                mt={0.5}
                            >
                                {secondaryLabel || 'or drag and drop'}
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            color={isMaxFilesReached ? '#7F7F7F' : 'inherit'}
                            mt={0.5}
                        >
                            (Only JPEG, PNG, Docx and PDF files with max size of{' '}
                            {(MAX_SIZE_5MB / BYTES / BYTES).toFixed(2)}MB)
                        </Typography>
                    </Box>
                    {errorMessage && (
                        <Typography
                            className={classes.infinize__fileInputErrorMessage}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                    {isMaxFilesReached && (
                        <Typography sx={{color: 'error.main', mt: 1}}>
                            File size exceeds the allowed limit. Please upload a
                            smaller file. ({maxFiles}).
                        </Typography>
                    )}
                </Box>
            )}

            {/* File list preview (applies to both single and multiple files) */}
            {filePreviews.length > 0 && (
                <Box mt={2}>
                    {filePreviews.map((preview, index) => (
                        <FilePreviewCard
                            key={index}
                            name={preview.name}
                            size={preview.size}
                            url={preview.url}
                            index={index}
                            onDelete={onDelete}
                            onEdit={handleEditClick}
                            isEditable={!isMultiUploadEnabled}
                            isDeletable={isMultiUploadEnabled}
                        />
                    ))}
                </Box>
            )}
            {/* Hidden input for manual upload */}
            <input
                type="file"
                multiple={isMultiUploadEnabled}
                accept={Object.values(acceptedFormats || {})
                    .flat()
                    .join(',')}
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={e => {
                    const selectedFiles = Array.from(e.target.files || []);
                    handleFileUpload(selectedFiles);
                }}
            />
        </Box>
    );
}
