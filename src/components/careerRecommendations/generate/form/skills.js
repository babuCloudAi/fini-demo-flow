import React, {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {
    AddButton,
    SelectField,
    formUtils,
    DeleteButton,
    AutoCompleteSelect
} from '@/components/common';
import Options from '@/data/careerRecomendation/skills.json';
import {CAREER_RECOMMENDATION_SECTIONS} from '@/config/constants';
import classes from '../../career.module.css';

export default function Skills({onFormDataChange, skillsData}) {
    const [skillsList, setSkillsList] = useState([]);
    const SKILLS = CAREER_RECOMMENDATION_SECTIONS.SKILLS;
    const [type, setType] = useState(Options.type || []);
    const [proficiency, setProficiency] = useState(Options.proficiency || []);

    useEffect(() => {
        // Sync the length of skillsData and skillsList on component mount
        // Add an object to the skillsList for each item that exists in skillsData
        // This will ensure that all the items in the skillsData will be displayed on component mount
        // If there are no Datas added (skillsData is empty), then to display one section by default, initialize skillsList with one object
        setSkillsList(
            skillsData?.skills?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [skillsData]); // Runs when `skillsData` changes

    const handleFieldChange = (index, field, value) => {
        const updatedData = skillsData?.skills ?? [];

        updatedData[index] = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );
        const finalObject = {
            ...skillsData,
            skills: updatedData
        };
        // Notify the parent component
        onFormDataChange(SKILLS, finalObject);
    };
    /**
     * Adds a new empty projects entry to the list.
     */
    const handleAddSkill = () => {
        setSkillsList([...skillsList, {id: skillsList?.length}]);
    };

    /**
     * Removes a projects entry from the list based on index.
     */
    const handleRemoveSkill = index => {
        // Remove the projects section entry at the specified index
        const updatedList = [...skillsList];
        updatedList.splice(index, 1);

        // Remove the projects entry from form data at the specified index
        const updatedSkillsList = skillsData?.skills
            ? [...skillsData.skills]
            : [];
        updatedSkillsList.splice(index, 1);

        setSkillsList(updatedList);

        // Update state and notify parent component
        onFormDataChange(
            SKILLS,
            formUtils.getUpdatedFormData(
                skillsData,
                'skills',
                updatedSkillsList
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
                Skills
            </Typography>

            <Box display="flex" flexDirection="column" gap={2} mb={1}>
                {skillsList.map((skill, index) => (
                    <Box p={3} key={index} className="border">
                        <Box
                            display="grid"
                            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                            gap={3}
                        >
                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Skill
                                </Typography>
                                <AutoCompleteSelect
                                    name={`skill${index}`}
                                    label="Skill"
                                    value={skillsData?.skills?.[index]?.skill}
                                    options={type}
                                    onChange={value =>
                                        handleFieldChange(index, 'skill', value)
                                    }
                                    getOptionLabel={option => option}
                                    isOptionEqualToValue={(option, value) =>
                                        option === value
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography className="infinize__inputLabel">
                                    Proficiency Level
                                </Typography>
                                <SelectField
                                    name={`proficiencyLevel${index}`}
                                    label="Proficiency Level"
                                    value={
                                        skillsData?.skills?.[index]
                                            ?.proficiencyLevel
                                    }
                                    options={proficiency}
                                    onChange={value =>
                                        handleFieldChange(
                                            index,
                                            'proficiencyLevel',
                                            value
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
                            {skillsList.length > 1 && (
                                <DeleteButton
                                    onClick={() => handleRemoveSkill(index)}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <AddButton
                onAdd={handleAddSkill}
                name="Add"
                disabled={skillsList.length === skillsData?.skills?.length}
            />
        </Box>
    );
}
