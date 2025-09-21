/**
 * Search Controller
 * Handles search-related HTTP requests
 */

const config = require("../config/constants");
const { preprocessQuery } = require("../utils/textProcessing");
const { searchProblems } = require("../services/searchService");
const { generateSearchResponse } = require("../services/problemService");

/**
 * Handle search requests
 * GET /search?query={query}
 */
async function handleSearch(req, res) {
  try {
    const query = req.query.query;
    
    if (!query || query.trim() === "") {
      return res.json([]);
    }

    // Search for problems
    const searchResults = searchProblems(query, preprocessQuery);
    
    if (searchResults.length === 0) {
      return res.json([]);
    }

    // Generate response with problem details
    const response = generateSearchResponse(searchResults);
    
    // Return results after configured delay (for UX consistency)
    setTimeout(() => {
      res.json(response);
    }, config.SEARCH.RESPONSE_DELAY_MS);

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal search error" });
  }
}

module.exports = {
  handleSearch,
}; 