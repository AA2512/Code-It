/**
 * Application Configuration Constants
 */

module.exports = {
  // Dataset configuration
  DATASET: {
    TOTAL_DOCUMENTS: 3023,
    TOTAL_KEYWORDS: 27602,
    AVERAGE_DOCUMENT_LENGTH: 138.27125372146875,
  },

  // Platform boundaries for document classification
  PLATFORMS: {
    LEETCODE_MAX_ID: 1773,
    INTERVIEWBIT_MAX_ID: 2213,
    TECHDELIGHT_START_ID: 2214,
  },

  // BM25 Algorithm parameters
  BM25: {
    K1: 1.2,
    B: 0.75,
    PLATFORM_WEIGHT_MULTIPLIER: 2, // Higher weight for LeetCode and InterviewBit
  },

  // Search configuration
  SEARCH: {
    MAX_RESULTS: 10,
    RESPONSE_DELAY_MS: 1000,
  },

  // Server configuration
  SERVER: {
    DEFAULT_PORT: 3000,
    STATIC_PATH: "/public",
    VIEW_ENGINE: "ejs",
  },

  // File paths
  PATHS: {
    PROBLEMS_DIR: "Problems",
    DATA_DIR: "data",
    VIEWS_DIR: "views",
    PUBLIC_DIR: "public",
  },
}; 