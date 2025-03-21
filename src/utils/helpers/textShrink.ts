/**
 * Truncates a string to 25 characters and adds an ellipsis
 * @param {string} string - The string to truncate
 * @returns {string} - Truncated string
 */
const textShrink = (string: string): string => {
    return `${string.slice(0, 25)} ...`;
};

export default textShrink; 