'use client';
import {Box} from '@mui/material';
import Search from '@/components/search';

export default function SearchPage() {
    return (
        <Box component="main" sx={{overflow: 'hidden', background: '#ffffff'}}>
            <Search />
        </Box>
    );
}
