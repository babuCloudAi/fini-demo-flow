import Layout from '@/components/layout/index.js';
import './globals.css';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';

export const metadata = {
    title: 'Infinize',
    description: 'Infinize'
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <Layout>{children}</Layout>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
