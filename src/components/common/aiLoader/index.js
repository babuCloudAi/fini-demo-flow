import {Box} from '@mui/material';
// Dynamically import react-lottie to avoid SSR issues with lottie-web (which uses `document`)
import dynamic from 'next/dynamic';
import {aiLoaderIcon} from './icon';

// Disable SSR for react-lottie since it depends on browser-specific `document`
const Lottie = dynamic(() => import('lottie-react'), {ssr: false});

export function AILoader() {
    return (
        <Box width={60} height={60} m={3}>
            <Lottie
                animationData={aiLoaderIcon}
                loop={true}
                autoplay={true}
                style={{width: '100%', height: '100%'}}
            />
        </Box>
    );
}
