import {Card, CardContent, Typography} from '@mui/material';
import FontFamilyPicker from '@/components/brandKit/fontFamily';
import classes from './brandKit.module.css';

export default function FontCard({fontFamily, setFontFamily}) {
    return (
        <Card className={classes.infinize__brandKitCard}>
            <CardContent>
                <Typography variant="h6" color="primary.main" mb={2}>
                    Font Family
                </Typography>
                <FontFamilyPicker
                    fontFamily={fontFamily}
                    setFontFamily={setFontFamily}
                />
            </CardContent>
        </Card>
    );
}
