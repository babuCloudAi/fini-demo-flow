'use client';
import {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import {InfinizeTable} from '@/components/common';
import Columns from './columns';
import styles from '../dashboard.module.css';
import StudentFooter from './studentFooter';

export default function StudentTable({
    students,
    selectedStudents,
    seletedRows
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); //TODO: Simulate loading — remove on real API integration
        return () => clearTimeout(timer);
    }, []);

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const totalNumberOfPages = Math.ceil(students.length / pageSize);

    const paginatedStudents = isLoading
        ? []
        : students.slice(startIndex, endIndex);

    const handlePageChange = newPage => {
        setPageNumber(newPage);
    };

    return (
        <Box sx={{height: 600, width: '100%'}}>
            <InfinizeTable
                rows={paginatedStudents}
                columns={Columns}
                getRowId={row => row.studentId}
                slots={{noRowsOverlay: () => <div>No Students Found</div>}}
                isLoading={isLoading}
                disableRowSelectionOnClick
                isRowSelectable={() => true}
                checkboxSelection
                onRowSelectionModelChange={seletedRows}
                customClassName={styles.infinize__dataGrid}
            />

            <StudentFooter
                startIndex={startIndex}
                endIndex={endIndex}
                totalCount={students.length}
                pageNumber={pageNumber}
                totalPages={totalNumberOfPages}
                handlePageChange={handlePageChange}
                selectedStudents={selectedStudents}
            />
        </Box>
    );
}
