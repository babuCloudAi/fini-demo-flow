'use client';
import {useEffect, useState} from 'react';
import {Stack, Typography} from '@mui/material';
import QuickFactsData from '@/data/advisor/quickFacts.json';
import StudentData from '@/data/advisor/students.json';
import QuickFacts from './landingPage/quickFacts';
import StudentList from './landingPage/studentList';

export default function AdvisorLandingPage() {
    const [quickFacts, setQuickFacts] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setQuickFacts(QuickFactsData.QuickData);
        setStudents(StudentData);
    });

    return (
        <Stack spacing={3}>
            <QuickFacts data={quickFacts} />
            <StudentList students={students} />
        </Stack>
    );
}
