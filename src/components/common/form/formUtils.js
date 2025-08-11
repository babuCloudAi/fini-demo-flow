/**
 * Updates the formData object with new value, if the value is not empty.
 * Else removes the field from the formData.
 * @param {Object} formData The object to be updated with the given field name and value
 * @param {string} field The field name to be added/updated in the given form data object.
 * @param {*} value The value of the field
 * @return {Object} The updated form data object after updating with the given field and value
 */
const getUpdatedFormData = (formData, field, value) => {
    // If the listener got invoked because a value of the field was cleared, then remove those keys from the formData object.
    // Else, add/update the formData object with new values.
    if (Array.isArray(value) && value.length === 0) {
        // If the field is of type multi select, then it will have a value of type Array.
        // If all the values are cleared, then it will have empty array as the value.
        // In such case, remove the field from the formData.
        delete formData[field];
    } else if (!value) {
        // If the field is of type select, text, date, number, then it will have a value of type string.
        // If the value is cleared, then it will have an empty string as the value.
        // For all the false values, remove the field from the formData.
        delete formData[field];
    } else {
        // Else, add/update the formData object with new value.
        formData = {...formData, [field]: value};
    }
    return formData;
};

export const formUtils = {getUpdatedFormData};
