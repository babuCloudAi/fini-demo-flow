'use client';
import {
    Box,
    Typography,
    ButtonGroup,
    Button,
    useTheme,
    Stack,
    List
} from '@mui/material';
import styles from '../../career.module.css';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import SaveStatus from './saveStatus';
import CategoriesList from './categoriesList';
import {InfinizeIcon, RecommendationItem} from '@/components/common';

export default function CareerDetails({
    career,
    customStyles = {},
    isEditable = false,
    isSaving,
    isSaved,
    onSave
}) {
    const theme = useTheme();

    useEffect(() => {
        if (isEditable) {
            window.scrollTo(0, 0); // Scroll to top when navigating back.
        }
    }, [isEditable]);

    return (
        <Box
            className={styles.infinize__jobDetails}
            sx={{
                width: customStyles?.width || {md: '100%', lg: '65%'},
                height: customStyles?.height || '80vh'
            }}
        >
            <Box className={styles.infinize__jobDetailsData}>
                <Image
                    src={career.banner ?? '/img/careers/job.jpg'} // TODO: After getting the geneated career recommendations API update these value
                    width={800}
                    height={160}
                    alt="career-image"
                />
                <Stack spacing={1}>
                    <Typography variant="h3" color="primary">
                        {career.title}
                    </Typography>
                    <Typography variant="body1">
                        {career.description}
                    </Typography>
                </Stack>
                <Box className={styles.infinize__jobDetailsButtonGroup}>
                    <ButtonGroup>
                        <Button
                            startIcon={
                                <InfinizeIcon icon="material-symbols:print-outline-rounded" />
                            }
                            sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                fontSize: '14px'
                            }}
                        >
                            Print
                        </Button>
                        <Button
                            startIcon={
                                <InfinizeIcon icon="fluent:share-16-regular" />
                            }
                            sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                fontSize: '14px'
                            }}
                        >
                            Share
                        </Button>
                    </ButtonGroup>
                    <Box sx={{fontSize: '18px'}}>
                        {isEditable && (
                            <SaveStatus
                                isSaved={isSaved}
                                isSaving={isSaving}
                                onSave={onSave}
                            />
                        )}
                    </Box>
                </Box>
            </Box>

            <Box className={styles.infinize__jobDetailsRoles}>
                <Typography variant="h3" color="primary">
                    Roles and responsibilities
                </Typography>
                <List>
                    {/*  TODO: After getting the geneated career recommendations API, update these value */}
                    {(career.ROLES_AND_RESPONSIBILITIES ?? career.roles).map(
                        (role, index) => (
                            <RecommendationItem key={index} content={role} />
                        )
                    )}
                </List>
            </Box>

            {/* Use the new component here */}
            <CategoriesList
                jobDetails={
                    career.CAREER_RECOMMENDATIONS ?? //  TODO: After getting the geneated career recommendations API, update these value
                    career.careerRecommendations
                }
            />
        </Box>
    );
}
