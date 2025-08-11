import React, {useState, useEffect, useMemo} from 'react';
import {Box, Grid, Skeleton, Typography} from '@mui/material';
import {
    AddButton,
    DeleteButton,
    SelectField,
    TextInput,
    formUtils
} from '@/components/common';
import classes from '../advancedSearch.module.css';
import {AndOrToggle, ToggleSwitch} from './andOrToggle';
import SectionAccordion from './accordion';
import {AND, OR} from '@/config/constants';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';
import {isValidTestScoreFilter} from '../utils';
import {advancedSearchService} from '@/dataAccess';

export default function TestScores({
    onFilterChange,
    testScoresFilter,
    filterChips
}) {
    const TEST_SCORES = ADVANCED_SEARCH_SECTIONS.TEST_SCORES;
    const testFilterOptions = [
        {label: '=', value: '='},
        {label: '>', value: '>'},
        {label: '<', value: '<'},
        {label: '>=', value: '>='},
        {label: '<=', value: '<='}
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [testScoreSectionsList, setTestScoreSectionsList] = useState([]);
    const [testScoreOptions, setTestScoreOptions] = useState([]);

    const [isLoadingTestScores, setIsLoadingTestScores] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const loadTestData = async () => {
        try {
            const res = await advancedSearchService.fetchTestScore();
            setTestScoreOptions(res.data);
        } catch (err) {
            console.error('Error fetching testScores lookup:', err);
        } finally {
            setIsLoadingTestScores(false);
            setIsDataFetched(true);
        }
    };

    useEffect(() => {
        if (isExpanded && !isDataFetched) {
            loadTestData();
        }
    }, [isExpanded]);

    useEffect(() => {
        // Sync the length of testScoresFilter and testScoreSectionsList on component mount
        // Add an object to the testScoreSectionsList for each item that exists in testScoresFilter
        // This will ensure that all the items in the testScoresFilter will be displayed on component mount
        // If there are no filters added (testScoresFilter is empty), then to display one section by default, initialize testScoreSectionsList with one object
        setTestScoreSectionsList(
            testScoresFilter?.scores?.map((_, index) => ({
                id: index
            })) ?? [{id: 0}]
        );
    }, [testScoresFilter?.scores]); // Runs when `testScoresFilter` changes

    const handleFieldChange = (index, field, value) => {
        const updatedData = testScoresFilter?.scores ?? [];

        updatedData[index] = formUtils.getUpdatedFormData(
            updatedData[index] ?? {},
            field,
            value
        );

        const finalObject = {
            ...testScoresFilter,
            scores: updatedData
        };

        // If there are more than 1 test score filter, the default condition value should be AND
        if (updatedData.length > 1) {
            if (!testScoresFilter.condition) {
                finalObject.condition = AND;
            }
        }

        // Notify the parent component
        onFilterChange(TEST_SCORES, finalObject);
    };

    const handleChange = (field, value) => {
        // Notify the parent component
        onFilterChange(
            TEST_SCORES,
            formUtils.getUpdatedFormData(
                testScoresFilter ? {...testScoresFilter} : {},
                field,
                value
            )
        );
    };

    /**
     * Adds a new empty test score entry to the list.
     */
    const handleAddSection = () => {
        setTestScoreSectionsList([
            ...testScoreSectionsList,
            {id: testScoreSectionsList?.length}
        ]);
    };

    /**
     * Removes a test score entry from the list based on index.
     */
    const handleRemoveSection = index => {
        // Remove the test score section entry at the specified index
        const updatedList = [...testScoreSectionsList];
        updatedList.splice(index, 1);

        // Remove the test score entry from form data at the specified index
        const updatedScoresList = testScoresFilter?.scores
            ? [...testScoresFilter.scores]
            : [];
        updatedScoresList.splice(index, 1);

        setTestScoreSectionsList(updatedList);

        if (updatedScoresList.length <= 1) {
            delete testScoresFilter.condition;
        }

        // Update state and notify parent component
        onFilterChange(
            TEST_SCORES,
            formUtils.getUpdatedFormData(
                testScoresFilter,
                'scores',
                updatedScoresList
            )
        );
    };

    // Memoize options so they only recompute when testScores changes
    const formattedTestScoreOptions = useMemo(() => {
        return testScoreOptions.map((option, idx) => ({
            label: `${option.DESCRIPTION} (${option.CODE})`, // display both description and code
            value: option.CODE, // use CODE as the value
            key: `test_${option.CODE}_${idx}`
        }));
    }, [testScoreOptions]);

    const isAddButtonEnabled = () => {
        const isAddCourseButtonEnabled = testScoresFilter?.scores ?? [];
        const sectionCount = testScoreSectionsList?.length ?? 0;

        //  Always disable add button if no sections or one was just added
        if (
            sectionCount === 0 ||
            sectionCount > isAddCourseButtonEnabled.length
        ) {
            return false;
        }

        //  All existing isAddCourseButtonEnabled must be valid to enable Add button
        const result = isAddCourseButtonEnabled.every((score, index) => {
            const isValid = isValidTestScoreFilter(score, index);

            return isValid;
        });

        return result;
    };

    return (
        <SectionAccordion
            title="Test Scores"
            isExpanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
            filterChips={filterChips}
        >
            <Box display="flex" flexDirection="column" gap={3} mt={1}>
                {testScoreSectionsList.length > 1 && (
                    <ToggleSwitch
                        labelLeft="All Scores"
                        labelRight="At least one score"
                        checked={testScoresFilter?.condition === OR}
                        onChange={e =>
                            handleChange(
                                'condition',
                                e.target.checked ? OR : AND
                            )
                        }
                    />
                )}

                <Box display="flex" flexDirection="column" gap={2}>
                    {testScoreSectionsList.map((_, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <AndOrToggle
                                    isOr={testScoresFilter?.condition === OR}
                                />
                            )}
                            <Box
                                className={
                                    classes.infinize__advancedSearch__sectionsContainer
                                }
                            >
                                <Grid container spacing={3} mt={1}>
                                    <Grid size={{xs: 12, md: 4}}>
                                        <Typography className="infinize__inputLabel">
                                            Test*
                                        </Typography>
                                        {isLoadingTestScores && (
                                            <Skeleton
                                                width={'100%'}
                                                height={58}
                                                variant="rectangular"
                                            />
                                        )}
                                        {!isLoadingTestScores && (
                                            <SelectField
                                                name={`test-${index}`}
                                                label="Test"
                                                value={
                                                    testScoresFilter?.scores?.[
                                                        index
                                                    ]?.test || ''
                                                }
                                                options={
                                                    formattedTestScoreOptions
                                                }
                                                onChange={val =>
                                                    handleFieldChange(
                                                        index,
                                                        'test',
                                                        val
                                                    )
                                                }
                                            />
                                        )}
                                    </Grid>
                                    <Grid size={{xs: 12, md: 4}}>
                                        <Typography className="infinize__inputLabel">
                                            Test Filter*
                                        </Typography>
                                        <SelectField
                                            name={`testFilter_${index}`}
                                            label="Test Filter"
                                            value={
                                                testScoresFilter?.scores?.[
                                                    index
                                                ]?.testFilter ?? ''
                                            }
                                            options={testFilterOptions}
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'testFilter',
                                                    val
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid size={{xs: 12, md: 4}}>
                                        <Typography className="infinize__inputLabel">
                                            Test Score*
                                        </Typography>
                                        <TextInput
                                            name={`testScore_${index}`}
                                            label="Test Score"
                                            value={
                                                testScoresFilter?.scores?.[
                                                    index
                                                ]?.testScore ?? ''
                                            }
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'testScore',
                                                    val
                                                )
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {testScoreSectionsList.length > 1 && (
                                    <DeleteButton
                                        onClick={() =>
                                            handleRemoveSection(index)
                                        }
                                    />
                                )}
                            </Box>
                        </React.Fragment>
                    ))}
                </Box>

                <AddButton
                    onAdd={handleAddSection}
                    name={'Add'}
                    disabled={isAddButtonEnabled()}
                />
            </Box>
        </SectionAccordion>
    );
}
