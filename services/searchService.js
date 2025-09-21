/**
 * Search Service
 * Handles all search-related business logic
 */

const stringSimilarity = require("string-similarity");
const config = require("../config/constants");
const { IDF, keywords, length, TF, titles, urls } = require("../config/dataLoader");

/**
 * Calculate BM25 scores for all documents given query keywords
 * @param {string[]} queryKeywords - Preprocessed query keywords
 * @param {string} originalQuery - Original user query
 * @returns {Array} Array of {id, sim} objects sorted by relevance
 */
function calculateBM25Scores(queryKeywords, originalQuery) {
  const { K1, B, PLATFORM_WEIGHT_MULTIPLIER } = config.BM25;
  const { TOTAL_DOCUMENTS, AVERAGE_DOCUMENT_LENGTH } = config.DATASET;
  const { LEETCODE_MAX_ID, INTERVIEWBIT_MAX_ID } = config.PLATFORMS;
  
  // Get keyword IDs
  const keywordIds = queryKeywords.map(keyword => keywords.indexOf(keyword));
  
  const scores = [];

  for (let docId = 0; docId < TOTAL_DOCUMENTS; docId++) {
    let score = 0;
    
    keywordIds.forEach((keywordId) => {
      const idfValue = IDF[keywordId];
      let termFreq = 0;
      
      // Find term frequency in document
      for (let k = 0; k < TF[docId].length; k++) {
        if (TF[docId][k].id === keywordId) {
          termFreq = TF[docId][k].val / length[docId];
          break;
        }
      }
      
      // BM25 formula
      const numerator = termFreq * (K1 + 1);
      const denominator = termFreq + K1 * (1 - B + B * (length[docId] / AVERAGE_DOCUMENT_LENGTH));
      let bm25Score = (numerator / denominator) * idfValue;
      
      // Give higher weight to LeetCode and InterviewBit problems
      if (docId <= INTERVIEWBIT_MAX_ID) {
        bm25Score *= PLATFORM_WEIGHT_MULTIPLIER;
      }
      
      score += bm25Score;
    });

    // Apply title similarity bonus
    const titleSimilarity = stringSimilarity.compareTwoStrings(
      titles[docId] || "",
      originalQuery.toLowerCase()
    );
    score *= (titleSimilarity + 0.1); // Add small base to avoid zero multiplication

    scores.push({ id: docId, sim: score });
  }

  return scores.sort((a, b) => b.sim - a.sim);
}

/**
 * Search for problems based on query
 * @param {string} query - User search query
 * @param {Function} preprocessQuery - Query preprocessing function
 * @returns {Array} Search results
 */
function searchProblems(query, preprocessQuery) {
  if (!query || query.trim() === "") {
    return [];
  }

  // Preprocess query
  const processedQuery = preprocessQuery(query);
  console.log("Processed query keywords:", processedQuery);

  if (processedQuery.length === 0) {
    return [];
  }

  // Calculate BM25 scores for all documents
  const scores = calculateBM25Scores(processedQuery, query);
  
  // Return top results with non-zero scores
  const topResults = scores
    .slice(0, config.SEARCH.MAX_RESULTS)
    .filter(result => result.sim > 0);

  return topResults;
}

module.exports = {
  calculateBM25Scores,
  searchProblems,
}; 