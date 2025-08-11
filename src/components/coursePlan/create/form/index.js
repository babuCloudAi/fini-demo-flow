'use client';
import React, {useState, useEffect} from 'react';
import {Box, Typography, Button} from '@mui/material';
import classes from '../createCoursePlan.module.css';
import {useRouter} from 'next/navigation';
import CareerGoals from './careerGoals';
import AcademicConstraints from './academicConstraints';
import LearningPersonalization from './learningPersonalization';
import PersonalInterests from './personalInterests';

export default function CoursePlanForm({onCreate}) {
    const [formData, setFormData] = useState({});
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the form mounts
    }, []);

    const handleCreate = () => {
        console.log('Form submitted:', formData);
        onCreate();
        // TODO note here to update the logic when integrating with API.
    };

    const onFormDataChange = (field, value) => {
        if (Object.keys(value).length === 0) {
            delete formData[field];
            setFormData({...formData});
        } else {
            setFormData({...formData, [field]: value});
        }
    };

    const handleCancel = () => {
        router.back();
    };

    const isCreateButtonDisabled =
        !formData || Object.keys(formData).length === 0;

    return (
        <Box sx={{p: 3}} component="form" noValidate autoComplete="off">
            <Typography mb={1} fontSize={'20px'} fontWeight={'500'}>
                Student Preferences:
            </Typography>
            <CareerGoals
                careerGoalsData={formData.careerGoals}
                onFormDataChange={onFormDataChange}
            />
            <AcademicConstraints
                academicData={formData.academicConstraints}
                onFormDataChange={onFormDataChange}
            />
            <LearningPersonalization
                learningData={formData.learningPersonalization}
                onFormDataChange={onFormDataChange}
            />

            <PersonalInterests
                personalInterestsData={formData.personalInterests}
                onFormDataChange={onFormDataChange}
            />
            <Box
                display={{xs: 'block', sm: 'flex'}}
                justifyContent={'flex-start'}
                mt={4}
                gap={2}
            >
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={isCreateButtonDisabled}
                    className={classes.infinize__createCoursePlan__Buttons}
                >
                    Create Plan
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleCancel}
                    className={classes.infinize__createCoursePlan__Buttons}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
