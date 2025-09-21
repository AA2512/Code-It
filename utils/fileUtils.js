/**
 * File Utilities
 */

const fs = require("fs");
const path = require("path");
const config = require("../config/constants");

/**
 * Check if a file exists
 * @param {string} filePath - Path to the file
 * @returns {boolean} True if file exists
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Read file safely with error handling
 * @param {string} filePath - Path to the file
 * @returns {string|null} File content or null if error
 */
function readFileSafe(filePath) {
  try {
    if (!fileExists(filePath)) {
      return null;
    }
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get problem file path
 * @param {number} problemId - Problem ID (0-based)
 * @returns {string} Path to problem file
 */
function getProblemFilePath(problemId) {
  return path.join(__dirname, "..", config.PATHS.PROBLEMS_DIR, `problem_text_${problemId + 1}.txt`);
}

/**
 * Validate problem ID
 * @param {any} id - ID to validate
 * @returns {boolean} True if valid
 */
function isValidProblemId(id) {
  const numId = Number(id);
  return !isNaN(numId) && 
         Number.isInteger(numId) && 
         numId >= 0 && 
         numId < config.DATASET.TOTAL_DOCUMENTS;
}

module.exports = {
  fileExists,
  readFileSafe,
  getProblemFilePath,
  isValidProblemId,
}; 