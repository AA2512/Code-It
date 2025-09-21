/**
 * Problem Service
 * Handles problem data retrieval and formatting
 */

const fs = require("fs");
const path = require("path");
const config = require("../config/constants");
const { titles, urls } = require("../config/dataLoader");
const { readFileSafe, getProblemFilePath, isValidProblemId } = require("../utils/fileUtils");
const { formatTitle } = require("../utils/textProcessing");

/**
 * Get platform type based on problem ID
 * @param {number} id - Problem ID
 * @returns {string} Platform name
 */
function getPlatformType(id) {
  const { LEETCODE_MAX_ID, INTERVIEWBIT_MAX_ID } = config.PLATFORMS;
  
  if (id <= LEETCODE_MAX_ID) return "Leetcode";
  if (id <= INTERVIEWBIT_MAX_ID) return "Interview Bit";
  return "Techdelight";
}

/**
 * Process problem text based on platform
 * @param {string} text - Raw problem text
 * @param {number} id - Problem ID
 * @returns {string} Processed text
 */
function processProblemText(text, id) {
  const { LEETCODE_MAX_ID } = config.PLATFORMS;
  
  // Process LeetCode format
  if (id <= LEETCODE_MAX_ID) {
    const parts = text.split("ListShare");
    text = parts.length > 1 ? parts[1] : text;
  }

  return text;
}

/**
 * Get detailed question data for a specific problem
 * @param {number} id - Problem ID (0-based)
 * @returns {Object} Question data object
 * @throws {Error} If problem not found or invalid ID
 */
function getQuestionData(id) {
  // Validate ID bounds
  if (!isValidProblemId(id)) {
    throw new Error(`Invalid question ID: ${id}`);
  }

  const problemPath = getProblemFilePath(id);
  const text = readFileSafe(problemPath);
  
  if (!text) {
    throw new Error(`Problem file not found: ${problemPath}`);
  }

  // Process text based on platform
  let processedText = processProblemText(text, id);
  
  // Convert newlines to HTML breaks
  processedText = processedText.replace(/\n/g, "<br/>");

  // Format title
  const rawTitle = titles[id] || `Problem ${id + 1}`;
  const formattedTitle = formatTitle(rawTitle);
  
  // Get platform type
  const platform = getPlatformType(id);

  return {
    title: formattedTitle,
    link: urls[id] || "",
    value: processedText,
    type: platform,
  };
}

/**
 * Generate search response with problem summaries
 * @param {Array} searchResults - Array of {id, sim} objects
 * @returns {Array} Array of problem summary objects
 */
function generateSearchResponse(searchResults) {
  return searchResults.map((result) => {
    try {
      const problemPath = getProblemFilePath(result.id);
      const text = readFileSafe(problemPath);
      
      if (!text) {
        console.warn(`Problem file not found: ${problemPath}`);
        return {
          id: result.id,
          title: titles[result.id] || `Problem ${result.id + 1}`,
          problem: "Problem text not available",
        };
      }

      // Process text and extract summary
      let processedText = processProblemText(text, result.id);
      const lines = processedText.split("\n");
      
      let problemDescription = "";
      const { LEETCODE_MAX_ID } = config.PLATFORMS;
      
      if (result.id <= LEETCODE_MAX_ID) {
        // LeetCode problems
        problemDescription = lines[0] || "";
        if (lines.length > 1) problemDescription += " " + lines[1];
      } else {
        // Other platform problems
        problemDescription = lines[0] || "";
        if (lines.length > 1) problemDescription += " " + lines[1];
      }

      return {
        id: result.id,
        title: titles[result.id] || `Problem ${result.id + 1}`,
        problem: problemDescription.trim(),
      };
    } catch (error) {
      console.error(`Error processing problem ${result.id + 1}:`, error);
      return {
        id: result.id,
        title: titles[result.id] || `Problem ${result.id + 1}`,
        problem: "Error loading problem text",
      };
    }
  });
}

module.exports = {
  getQuestionData,
  generateSearchResponse,
  getPlatformType,
  processProblemText,
}; 