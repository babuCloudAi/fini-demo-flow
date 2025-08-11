'use client';
import React, {useState} from 'react';
import {Box, Typography, IconButton} from '@mui/material';
import {useRouter} from 'next/navigation';
import SaveSearchDialog from './saveSearchDialog';
import ActionButtons from './actionButtons';
import SavedSearchesPopup from '../savedSearchesPopup';
import AdvancedSearchForm from './form';
import studentSearchStyles from '../search.module.css';
import advancedSearchStyles from './advancedSearch.module.css';
import {formUtils, InfinizeIcon} from '../../common';
import SearchResults from '../searchResults';

import {
    sanitizeCourseDataFilters,
    sanitizeCourseRequirementsFilters,
    sanitizeSystemActivityFilters,
    sanitizeTestScoresFilters,
    getFilterChips,
    removeFilter
} from './utils';
import {ADVANCED_SEARCH_SECTIONS} from '@/config/constants';

export default function AdvancedSearch() {
    const router = useRouter();
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isShowResults, setIsShowResults] = useState(false);
    const [isFromAdvancedSearchResults, setIsFromAdvancedSearchResults] =
        useState(false);

    // Toggle the results view (show/hide results panel)
    const toggleIsShowResults = () => {
        setIsShowResults(prev => !prev);
    };

    // Called when a filter field changes
    const onFilterChange = (field, value) => {
        if (Object.keys(value).length === 0) {
            // Remove the field if it's empty
            delete formData[field];
            setFormData({...formData});
        } else {
            // Update the field in formData
            setFormData({...formData, [field]: value});
        }
    };

    // Clear all filters
    const handleReset = () => {
        setFormData({});
    };

    // Function to handle the search logic using cleaned and validated form data
    const handleSearch = () => {
        // Create a shallow copy of the form data to avoid mutating the original state
        const requestBody = {...formData};

        /**
         * Step 1: Clean and validate the nested `courseData` section
         * - If valid data exists, add it to the request body
         * - Otherwise, remove the `courseData` key from the request
         */
        const validCourseData = sanitizeCourseDataFilters(formData.courseData);
        if (validCourseData) {
            requestBody.courseData = validCourseData;
        } else {
            delete requestBody.courseData;
        }

        /**
         * Step 2: Clean and validate the nested `courseRequirements` section
         * - If valid, use a helper utility to format and update the structure before adding to the request
         * - If not valid, remove the `courseRequirements` key
         */
        const validCourseRequirements = sanitizeCourseRequirementsFilters(
            formData.courseRequirements
        );
        if (validCourseRequirements) {
            requestBody.courseRequirements = formUtils.getUpdatedFormData(
                validCourseRequirements
            );
        } else {
            delete requestBody.courseRequirements;
        }

        /**
         * Step 3: Clean and validate the nested `testScores` section
         * - Check for valid test score entries using a filter that may include index validation
         * - If valid entries are found, format them properly and retain the `condition` key
         * - If none are valid, remove the `testScores` key
         */
        const validTestScores = sanitizeTestScoresFilters(
            formData?.testScores?.scores || []
        );
        if (validTestScores?.length) {
            requestBody.testScores = {
                condition: formData.testScores?.condition,
                scores: formUtils.getUpdatedFormData(validTestScores)
            };
        } else {
            delete requestBody.testScores;
        }

        // Log the final cleaned request body for debugging or inspection
        console.log('Cleaned request body', requestBody);

        // Trigger UI state to display the search results
        toggleIsShowResults();

        // TODO: Integrate the actual API call using requestBody here
    };

    // Toggle result display state and mark as advanced search triggered
    const handleSearchFormDisplay = () => {
        setIsFromAdvancedSearchResults(true);
        toggleIsShowResults();
    };

    // Handle cancel action
    const handleCancel = () => {
        // If the user navigates to advanced search form from the advanced search results page,
        // then Cancel button should simply close the advanced search form and take the user to the previous
        // search results table. Else, the button should route the user to the previous screen
        if (isFromAdvancedSearchResults) {
            toggleIsShowResults();
        } else {
            // Otherwise go back to the previous page
            router.back();
        }
    };

    // Placeholder for future Save feature
    const handleSave = value => {
        // TODO: Implement save logic
    };

    // For generating filter chips by section
    const getValidFiltersBySection = section => {
        return getFilterChips(section, formData);
    };

    // Remove a chip from a section
    const handleRemoveFilter = (section, index, type) => {
        const updatedFormData = removeFilter(section, index, type, formData);
        setFormData(updatedFormData);
    };

    const getValidFilters = () => {
        return {
            studentInfo: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.STUDENT_INFO
            ),
            systemActivity: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.SYSTEM_ACTIVITY
            ),
            areaOfStudy: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.AREA_OF_STUDY
            ),
            assignedTo: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.ASSIGNED_TO
            ),
            performance: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.PERFORMANCE
            ),
            registrationHistory: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.REGISTRATION_HISTORY
            ),
            courseData: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.COURSE_DATA
            ),
            courseRequirements: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.COURSE_REQUIREMENTS
            ),
            testScores: getValidFiltersBySection(
                ADVANCED_SEARCH_SECTIONS.TEST_SCORES
            )
        };
    };

    // Disable Search button if no filters are applied
    const isSearchButtonDisabled = Object.values(getValidFilters()).every(
        sectionChips => sectionChips.length === 0
    );

    return (
        <Box sx={{width: '100%', overflowX: 'auto'}}>
            {!isShowResults && (
                <Box
                    className={
                        advancedSearchStyles.infinize__advancedSearch__container
                    }
                >
                    <Box
                        className={
                            advancedSearchStyles.infinize__advancedSearch__titleContainer
                        }
                    >
                        <Typography
                            m={0}
                            className={
                                advancedSearchStyles.infinize__advancedSearch__title
                            }
                        >
                            Advanced Search
                        </Typography>
                        <Box display={'flex'} gap={1} alignContent={'baseline'}>
                            <IconButton
                                aria-label="reset"
                                className={
                                    studentSearchStyles.infinize__savedSearches
                                }
                                onClick={handleReset}
                            >
                                <InfinizeIcon icon={'ic:round-reset-tv'} />
                            </IconButton>
                            <Box
                                className={
                                    studentSearchStyles.infinize__savedSearches
                                }
                            >
                                <SavedSearchesPopup
                                    topAlignment="right"
                                    bottomAlignment="left"
                                    anchorVertical="top"
                                    transformVertical="top"
                                />
                            </Box>
                        </Box>
                    </Box>
                    <AdvancedSearchForm
                        onFilterChange={onFilterChange}
                        formData={formData}
                        getFilters={getValidFiltersBySection}
                        onRemoveFilter={handleRemoveFilter}
                    />
                    <Box
                        display="flex"
                        gap={2}
                        width="100%"
                        className={
                            advancedSearchStyles.infinize__advancedSearch__buttons__group
                        }
                    >
                        <ActionButtons
                            formData={formData}
                            handleSearch={handleSearch}
                            handleCancel={handleCancel}
                            handleSave={setIsSaveDialogOpen}
                            isDisabled={isSearchButtonDisabled}
                        />
                        <SaveSearchDialog
                            open={isSaveDialogOpen}
                            onClose={() => setIsSaveDialogOpen(false)}
                            onSave={handleSave}
                        />
                    </Box>
                </Box>
            )}
            {isShowResults && (
                <Box sx={{width: '100%', overflowX: 'auto'}}>
                    <SearchResults
                        appliedFilter={getValidFilters()}
                        isAdvancedSearch={true}
                        onClick={handleSearchFormDisplay}
                    />
                </Box>
            )}
        </Box>
    );
}
