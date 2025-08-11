import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import classes from './common.module.css';

export function Widget({
    title,
    expanded,
    onChange,
    children,
    actions,
    titleAdornment
}) {
    return (
        <Accordion
            expanded={expanded}
            onChange={onChange}
            className={classes.infinize__widget}
        >
            <AccordionSummary
                component="div"
                role="button"
                tabIndex={0}
                aria-expanded={expanded}
                aria-controls="widget_content"
                expandIcon={
                    <InfinizeIcon
                        icon="flat-color-icons:expand"
                        width={24}
                        height={24}
                    />
                }
                sx={{
                    flexDirection: 'row-reverse'
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Box display="flex" alignItems="center">
                        <Typography
                            fontSize="18px"
                            fontWeight="bold"
                            color="primary.main"
                            ml={1}
                        >
                            {title}
                        </Typography>
                        {titleAdornment && <Box ml={1}>{titleAdornment}</Box>}
                    </Box>
                    {actions}
                </Box>
            </AccordionSummary>
            <AccordionDetails
                id="widget_content"
                sx={{
                    p: 0,
                    overflow: 'hidden',
                    width: '100%'
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
