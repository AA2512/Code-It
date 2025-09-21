/**
 * Question Controller
 * Handles question-related HTTP requests
 */

const { isValidProblemId } = require("../utils/fileUtils");
const { getQuestionData } = require("../services/problemService");

/**
 * Handle home page requests
 * GET /
 */
function handleHome(req, res) {
  res.render("index");
}

/**
 * Handle question detail requests
 * GET /question/:id
 */
function handleQuestionDetail(req, res) {
  try {
    const id = Number(req.params.id);
    
    // Validate ID
    if (!isValidProblemId(id)) {
      return res.status(404).send("Question not found");
    }

    // Get question data
    const questionData = getQuestionData(id);
    
    // Set response locals for template
    res.locals.questionObject = questionData;
    res.locals.questionBody = questionData.value;
    res.locals.questionTitle = questionData.title;
    res.locals.questionUrl = questionData.link;
    
    res.render("question");
    
  } catch (error) {
    console.error(`Error loading question ${req.params.id}:`, error);
    return res.status(404).send("Question not found");
  }
}

module.exports = {
  handleHome,
  handleQuestionDetail,
}; 