/**
 * Splits text into words, removing extra spaces.
 * @param {string} text - The input text.
 * @returns {string[]} - An array of words.
 */
const splitWords = text =>
    text ? text.trim().split(/\s+/).filter(Boolean) : [];

/**
 * Returns the word count of a given text.
 * @param {string} text - The input text.
 * @returns {number} - The total word count.
 */
export const getWordCount = text => splitWords(text).length;

/**
 * Trims text to a max word limit.
 * @param {string} text - The input text.
 * @param {number} maxWords - The maximum allowed words.
 * @returns {string} - The trimmed text within the limit, wrapped in quotes.
 */

export const trimText = (text, maxWords) => {
    let wordsArray = splitWords(text);
    return wordsArray.length > maxWords
        ? wordsArray.slice(0, maxWords).join(' ')
        : text;
};
