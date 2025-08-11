import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box
} from '@mui/material';
import classes from '../advancedSearch.module.css';
import {InfinizeIcon} from '@/components/common';

export default function SectionAccordion({
    title,
    isExpanded,
    onChange,
    children,
    filterChips
}) {
    return (
        <Accordion
            expanded={isExpanded}
            onChange={onChange}
            className={classes.infinize__advancedSearch__accordion}
        >
            <AccordionSummary
                expandIcon={<InfinizeIcon icon={'si:expand-more-duotone'} />}
                sx={{
                    minHeight: '56px',
                    bgcolor: ' #FBFBFD',
                    borderRadius: '10px',
                    '& .MuiTypography-root': {
                        fontWeight: '600',
                        fontSize: '18px',
                        color: isExpanded && 'primary.main'
                    }
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={1}
                    p={1}
                >
                    <Typography fontSize={'18px'} fontWeight={'600'}>
                        {title}
                    </Typography>
                    {filterChips}
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{borderTop: isExpanded && '2px solid #D8E6EC'}}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
