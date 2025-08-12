'use client';
import {useEffect, useState} from 'react';
import {Stack} from '@mui/material';
import StudentData from '@/data/advisor/inactiveStudents.json';
import StudentsList from './studentsList';

export default function NoPlansStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(StudentData);
    });

    return (
        <Stack spacing={3}>
            <StudentsList students={students} />
        </Stack>
    );
}
