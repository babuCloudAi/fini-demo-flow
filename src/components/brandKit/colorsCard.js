import {Card, CardContent, Typography} from '@mui/material';
import ColorPicker from './colorPicker';
import classes from './brandKit.module.css';

export default function ColorsCard({
    selectedColors,
    setSelectedColors,
    colors,
    setColors
}) {
    const handleColorChange = (newColor, type) => {
        setColors(prev => {
            const newColors = [...prev[type], newColor.hex];

            return {
                ...prev,
                [type]: newColors.slice(-4)
            };
        });

        setSelectedColors(prev => ({
            ...prev,
            [type]: newColor.hex
        }));
    };

    const handleSelectExistingColor = (color, type) => {
        setSelectedColors(prev => ({
            ...prev,
            [type]: color
        }));
    };

    return (
        <Card className={classes.infinize__brandKitCard}>
            <CardContent>
                <Typography variant="h6" color="primary.main" mb={2}>
                    Layout Colors
                </Typography>
                {Object.entries(colors).map(([key, value]) => (
                    <ColorPicker
                        key={key}
                        colorType={key}
                        colors={colors[key]}
                        setColors={handleColorChange}
                        selectedColor={selectedColors[key]}
                        onSelectExisting={handleSelectExistingColor}
                        label={`${
                            key.charAt(0).toUpperCase() + key.slice(1)
                        } Colors`}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
