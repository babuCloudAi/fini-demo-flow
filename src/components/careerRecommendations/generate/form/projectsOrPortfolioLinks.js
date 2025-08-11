import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {
    TextInput,
    TextAreaField,
    AddButton,
    formUtils,
    DeleteButton
} from '@/components/common';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';
import classes from '../../career.module.css';

export default function ProjectsOrPortfolioLinks({
    projectsData,
    onFormDataChange
}) {
    const PROJECTS_OR_PORTFOLIO_LINKS =
        CAREER_RECOMMENDATION_SECTIONS.PROJECTS_OR_PORTFOLIO_LINKS;
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        // Sync the length of projectsData and projectsList on component mount
        // Add an object to the projectsList for each item that exists in projectsData
        // This will ensure that all the items in the projectsData will be displayed on component mount
        // If there are no Datas added (projectsData is empty), then to display one section by default, initialize projectsList with one object
        setProjectsList(
            projectsData?.projects?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [projectsData]); // Runs when `projectsData` changes

    const handleFieldChange = (index, field, value) => {
        const updatedData = projectsData?.projects ?? [];

        updatedData[index] = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );
        const finalObject = {
            ...projectsData,
            projects: updatedData
        };
        // Notify the parent component
        onFormDataChange(PROJECTS_OR_PORTFOLIO_LINKS, finalObject);
    };
    /**
     * Adds a new empty projects entry to the list.
     */
    const handleAddProject = () => {
        setProjectsList([...projectsList, {id: projectsList?.length}]);
    };

    /**
     * Removes a projects entry from the list based on index.
     */
    const handleRemoveProject = index => {
        // Remove the projects section entry at the specified index
        const updatedList = [...projectsList];
        updatedList.splice(index, 1);

        // Remove the projects entry from form data at the specified index
        const updatedProjectsList = projectsData?.projects
            ? [...projectsData.projects]
            : [];
        updatedProjectsList.splice(index, 1);

        setProjectsList(updatedList);

        // Update state and notify parent component
        onFormDataChange(
            PROJECTS_OR_PORTFOLIO_LINKS,
            formUtils.getUpdatedFormData(
                projectsData,
                'projects',
                updatedProjectsList
            )
        );
    };
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                color="primary.main"
            >
                Projects / Portfolio Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={1}>
                {projectsList?.map((Positions, index) => (
                    <Box className="border" p={3} key={index}>
                        <Box
                            display="grid"
                            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                            gap={3}
                        >
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Project Title
                                </Typography>
                                <TextInput
                                    name={`projectTitle${index}`}
                                    label="Project Title"
                                    value={
                                        projectsData?.projects?.[index]
                                            ?.projectTitle
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'projectTitle',
                                            val
                                        )
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Key Responsibilities / Achievements
                                </Typography>
                                <TextAreaField
                                    name={`keyResponsibilities${index}`}
                                    label="Key Responsibilities / Achievements"
                                    hasWordLimit={true}
                                    maxWords={100}
                                    value={
                                        projectsData?.projects?.[index]
                                            ?.keyResponsibilities
                                    }
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'keyResponsibilities',
                                            val
                                        )
                                    }
                                />
                            </Box>
                        </Box>
                        <Box
                            className={
                                classes.infinize__positionActionContainer
                            }
                        >
                            {projectsList?.length > 1 && (
                                <DeleteButton
                                    onClick={() => handleRemoveProject(index)}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <AddButton
                onAdd={handleAddProject}
                name="Add"
                disabled={
                    projectsList.length === projectsData?.projects?.length
                }
            />
        </Box>
    );
}
