import {Box} from '@mui/material';
import {NoResults} from '../common';

export default function NoNotes({addNotes}) {
    return (
        <Box display={'flex'} justifyContent={'center'}>
            <NoResults
                title={'No notes have been added'}
                description={
                    'Get started by adding a note to keep track of important updates or observations.'
                }
                buttonLabel={'Add Notes'}
                onClick={addNotes}
            />
        </Box>
    );
}
