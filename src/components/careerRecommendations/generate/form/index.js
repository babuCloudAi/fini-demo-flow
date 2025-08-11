'use client';
import React, {useState, useEffect} from 'react';
import {Box, Button, Typography} from '@mui/material';
import classes from '../../career.module.css';
import PastPositionsInternships from './pastPositionsInternships';
import Skills from './skills';
import CareerGoalsAndInterests from './careerGoalsAndInterests';
import ProjectsOrPortfolioLinks from './projectsOrPortfolioLinks';
import LocationAndWorkEnvironmentPreferences from './locationAndWorkEnvironmentPreferences';
import ConstraintsAndPracticalConsiderations from './constraintsAndPracticalConsiderations';
import AdditionalAndPreferences from './additionalPreferences ';
import CertificationsAndLicenses from './certificationsAndLicenses';
import resumeData from '@/data/careerRecomendation/resumeData.json';
import {Loader} from '@/components/common';
import {useSearchParams} from 'next/navigation';

export function CareerPreferencesForm({onSubmitPreferences}) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const searchParams = useSearchParams();

    //  TODO  remove this after API integration
    const isResumeUploaded = searchParams.get('isResumeUploaded ');

    const toggleIsLoading = () => {
        setIsLoading(prev => !prev);
    };

    const onFormDataChange = (field, value) => {
        if (Object.keys(value).length === 0) {
            delete formData[field];
            setFormData({...formData});
        } else {
            setFormData({...formData, [field]: value});
        }
    };

    const handleCreate = () => {
        console.log('Form submitted:', formData);

        // TODO: Replace with actual API call
        toggleIsLoading();
        setTimeout(() => {
            toggleIsLoading();
            onSubmitPreferences();
        }, 3000);
    };

    const isCreateButtonDisabled = Object.keys(formData).length === 0;

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // When `isResumeUploaded` query param is "true", auto-fill the form with resume data
    useEffect(() => {
        //  TODO remove on API integration
        // Show loader during simulated data fetch
        toggleIsLoading();
        setTimeout(() => {
            toggleIsLoading();

            if (isResumeUploaded === 'true') {
                // Populate form with parsed resume data
                setFormData(resumeData);
            }
        }, 3000);
    }, [isResumeUploaded]);

    return (
        <>
            {isLoading && <Loader isOpen={isLoading} />}
            <Box className={classes.infinize__careerContainer}>
                <Typography
                    gutterBottom
                    color="primary.main"
                    className={classes.infinize__careerTitle}
                >
                    Create a personalized career recommendations
                </Typography>
                <Box sx={{p: 3}} component="form" noValidate autoComplete="off">
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <PastPositionsInternships
                            onFormDataChange={onFormDataChange}
                            pastPositionsData={
                                formData.pastPositionsInternships
                            }
                        />
                        <Skills
                            onFormDataChange={onFormDataChange}
                            skillsData={formData.skills}
                        />
                        <CertificationsAndLicenses
                            onFormDataChange={onFormDataChange}
                            licensesData={formData.certificationsAndLicenses}
                        />
                        <ProjectsOrPortfolioLinks
                            onFormDataChange={onFormDataChange}
                            projectsData={formData.projectsOrPortfolioLinks}
                        />
                        <CareerGoalsAndInterests
                            onFormDataChange={onFormDataChange}
                            interestsData={formData.careerGoalsAndInterests}
                        />
                        <LocationAndWorkEnvironmentPreferences
                            onFormDataChange={onFormDataChange}
                            locationData={
                                formData.locationAndWorkEnvironmentPreferences
                            }
                        />
                        <ConstraintsAndPracticalConsiderations
                            onFormDataChange={onFormDataChange}
                            constraintsData={
                                formData.constraintsAndPracticalConsiderations
                            }
                        />
                        <AdditionalAndPreferences
                            onFormDataChange={onFormDataChange}
                            additionalPreferencesData={
                                formData.additionalAndPreferences
                            }
                        />

                        <Box width={'45%'}>
                            <Button
                                variant="contained"
                                disabled={isCreateButtonDisabled}
                                onClick={handleCreate}
                                className={'infinize__button'}
                            >
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
