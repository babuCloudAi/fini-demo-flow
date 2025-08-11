'use client';
import {useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import styles from '../career.module.css';
import {InfinizeIcon} from '../../common';
import {theme} from '@/config';
import {InfinizeDialog} from '../../common';
import CareerDetails from '../generate/recommendations/careerDetails';

export default function CareersListView({careers = [], onDelete}) {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const handleMoreDetails = career => {
        setSelectedCareer(career);
        setIsDialogOpen(true);
    };

    const handleMenuOpen = (event, career) => {
        setMenuAnchor(event.currentTarget);
        setSelectedCareer(career);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedCareer(null);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleDeleteCareer = async () => {
        handleMenuClose();
        // Pass the selected career object to the parent handler
        if (selectedCareer) {
            await onDelete(selectedCareer);
        }
    };

    const handlePrint = () => {
        handleMenuClose();
    };

    const handleShare = () => {
        handleMenuClose();
    };

    return (
        <>
            <Stack
                className={styles.infinize__jobRecommendationsCards}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        sm: '1fr',
                        md: '1fr 1fr',
                        lg: '1fr 1fr 1fr'
                    },
                    gap: 2
                }} // TODO convert the Stack into Grid component
            >
                {careers.map((career, index) => (
                    <Box
                        key={index}
                        className={styles.infinize__jobRecommendationsEditCard}
                    >
                        <ListItemIcon
                            onClick={event => handleMenuOpen(event, career)}
                            className={
                                styles.infinize__jobRecommendationsMenuIcon
                            }
                        >
                            <InfinizeIcon
                                icon="mi:options-vertical"
                                className="menuItemIcon"
                            />
                        </ListItemIcon>
                        <Stack flexGrow={1} spacing={2}>
                            <Typography variant="h4" fontWeight="bold">
                                {career.CAREER_PLAN_NAME}
                            </Typography>

                            <Typography variant="body2">
                                {career.CAREER_PLAN_DESCRIPTION}
                            </Typography>
                        </Stack>
                        <Box
                            className={
                                styles.infinize__jobRecommendationsSalary
                            }
                        >
                            <Typography variant="body2">
                                Match: {career.MATCH}
                            </Typography>

                            <Button
                                onClick={() => handleMoreDetails(career)}
                                sx={{
                                    background: theme.palette.primary.main
                                }}
                            >
                                More Info
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Stack>
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <MenuItem onClick={handleShare} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="fluent:share-16-filled"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Share
                </MenuItem>
                <MenuItem onClick={handlePrint} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="material-symbols:print-outline-rounded"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Print
                </MenuItem>
                <MenuItem onClick={handleDeleteCareer} className="menuItem">
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="fluent:delete-32-filled"
                            className="menuItemIcon"
                        />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>

            {selectedCareer && (
                <InfinizeDialog
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                >
                    <CareerDetails
                        career={selectedCareer}
                        customStyles={{width: '100%', height: '500px'}} // TODO: have to replace with external styels
                        isEditable={false}
                    />
                </InfinizeDialog>
            )}
        </>
    );
}
