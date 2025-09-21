/**
 * Main Routes
 * Defines all application routes
 */

const express = require("express");
const router = express.Router();

const { handleHome, handleQuestionDetail } = require("../controllers/questionController");
const { handleSearch } = require("../controllers/searchController");

// Home page route
router.get("/", handleHome);

// Search route
router.get("/search", handleSearch);

// Question detail route
router.get("/question/:id", handleQuestionDetail);

module.exports = router; 