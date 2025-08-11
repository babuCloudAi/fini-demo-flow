'use client';
import React, {useState, useEffect} from 'react';
import {InfinizeDialog} from '@/components/common';
import {AutoCompleteSelect} from '@/components/common/form';
import TermData from '@/data/coursePlan/terms.json';
import {Box, Typography} from '@mui/material';
import classes from '../../coursePlan.module.css';

export default function AddTermDialog({onClose, onAddTerm, termMap}) {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [termOptions, setTermOptions] = useState([]);

    useEffect(() => {
        if (TermData?.terms?.length) {
            setTermOptions(TermData.terms);
        }
    }, []);

    const handleAddTermConfirmation = () => {
        if (selectedTerm) {
            onAddTerm(selectedTerm);
        }
    };

    const getTermOptions = termOptions.filter(term => !termMap.has(term.code));

    const getOptionLabel = option => option?.name ?? '';

    const isOptionEqualToValue = (option, value) =>
        option?.code === value?.code;

    return (
        <InfinizeDialog
            isOpen
            onClose={() => {
                onClose();
            }}
            title="Add Term"
            primaryButtonLabel="Continue"
            onPrimaryButtonClick={handleAddTermConfirmation}
            isPrimaryButtonDisabled={!selectedTerm}
        >
            <Box width={'100%'}>
                <Typography
                    className={classes.infinize__coursePlanDialogInputHeading}
                >
                    Select the term you would like to add.
                </Typography>
                <AutoCompleteSelect
                    name="term"
                    label="Select Term"
                    options={getTermOptions}
                    value={selectedTerm}
                    onChange={setSelectedTerm}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                />
            </Box>
        </InfinizeDialog>
    );
}
