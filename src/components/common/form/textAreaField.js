import React, {useState, useEffect} from 'react';
import {FormControl, Box, TextField, Typography} from '@mui/material';
import classes from './formFields.module.css';
import {getWordCount, trimText} from '../utils/stringUtils';

export function TextAreaField({
    maxWords = 100,
    name,
    label,
    value,
    onChange,
    hasWordLimit = false,
    placeholder = 'Enter'
}) {
    const [wordCount, setWordCount] = useState(
        hasWordLimit ? getWordCount(value) : 0
    );

    // Update word count whenever `value` or `hasWordLimit` changes
    useEffect(() => {
        if (hasWordLimit) {
            setWordCount(getWordCount(value));
        }
    }, [value, hasWordLimit]);

    const handleChange = e => {
        let text = e.target.value;
        if (hasWordLimit) {
            // Enforce the word limit and update the text accordingly
            text = trimText(text, maxWords);
            e.target.value = text;
            const currentWordCount = getWordCount(text);

            // Prevent users from typing extra spaces once the word limit is reached
            if (
                // Check if the user is trying to insert a character
                e.nativeEvent.inputType === 'insertText' &&
                // Specifically block when that character is a space
                // This prevents users from creating an illusion of typing more words
                e.nativeEvent.data === ' ' &&
                // Ensure the word limit has already been reached
                currentWordCount >= maxWords
            ) {
                // Cancel the space input to avoid exceeding the word limit
                e.preventDefault();
                return;
            }
            setWordCount(currentWordCount);
        }

        // Call the onChange handler with the updated text
        onChange(text);
    };

    return (
        <FormControl fullWidth>
            <Box sx={{position: 'relative', width: '100%'}}>
                <TextField
                    minRows={3}
                    maxRows={3}
                    value={value || ''}
                    multiline
                    onChange={handleChange}
                    id={name}
                    name={name}
                    aria-label={label}
                    placeholder={placeholder}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            padding: '16px 8px 24px 16px'
                        }
                    }}
                />

                {hasWordLimit && (
                    <Typography
                        className={classes.infinize__textArea__wordCount}
                    >
                        {`${wordCount} / ${maxWords}`}
                    </Typography>
                )}
            </Box>
        </FormControl>
    );
}
