import {Box} from '@mui/material';
import StudentDetails from '@/components/studentDetails';

export default function StudentLayout({children}) {
    return (
        <Box component="main">
            <StudentDetails />
            {children}
        </Box>
    );
}
