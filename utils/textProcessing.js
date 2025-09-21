/**
 * Text Processing Utilities
 */

const { removeStopwords } = require("stopword");
const removePunc = require("remove-punctuation");
const natural = require("natural");
const lemmatizer = require("wink-lemmatizer");
const converter = require("number-to-words");
const { wordsToNumbers } = require("words-to-numbers");

const { keywords } = require("../config/dataLoader");

// Initialize spell checker
const spellcheck = new natural.Spellcheck(keywords);

/**
 * String prototype extension for capitalization
 */
function setupStringExtensions() {
  Object.defineProperty(String.prototype, "capitalize", {
    value: function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
  });
}

/**
 * Preprocess user query for search
 * @param {string} query - Raw user query
 * @returns {string[]} Array of processed keywords
 */
function preprocessQuery(query) {
  const oldString = query.split(" ");
  const newString = removeStopwords(oldString);
  newString.sort();

  let queryKeywords = [];

  // Extract and convert numbers
  let numbers = query.match(/\d+/g);
  if (numbers) {
    numbers.forEach((num) => {
      queryKeywords.push(num);
      let numStr = converter.toWords(Number(num));
      let numParts = numStr.split("-");
      queryKeywords.push(numStr);

      numParts.forEach((part) => {
        let spaceSplits = part.split(" ");
        if (numParts.length > 1) queryKeywords.push(part);
        if (spaceSplits.length > 1) {
          spaceSplits.forEach((subpart) => {
            queryKeywords.push(subpart);
          });
        }
      });
    });
  }

  // Process text tokens
  for (let j = 0; j < newString.length; j++) {
    // Original keywords
    newString[j] = newString[j].toLowerCase();
    newString[j] = removePunc(newString[j]);
    if (newString[j] !== "") queryKeywords.push(newString[j]);

    // Handle camelCase
    var letters = newString[j].match(/[a-zA-Z]+/g);
    if (letters) {
      letters.forEach((word) => {
        queryKeywords.push(removePunc(word.toLowerCase()));
      });
    }

    // Word to numbers conversion
    let converted = wordsToNumbers(newString[j]).toString();
    if (converted !== newString[j]) queryKeywords.push(converted);
  }

  // Apply lemmatization and spell checking
  let expandedKeywords = [...queryKeywords];
  queryKeywords.forEach((key) => {
    let lemmatized = lemmatizer.verb(key);
    expandedKeywords.push(lemmatized);

    let spellCorrections1 = spellcheck.getCorrections(key);
    let spellCorrections2 = spellcheck.getCorrections(lemmatized);
    
    if (spellCorrections1.indexOf(key) === -1) {
      spellCorrections1.forEach((correction) => {
        expandedKeywords.push(correction);
        expandedKeywords.push(lemmatizer.verb(correction));
      });
    }

    if (spellCorrections2.indexOf(lemmatized) === -1) {
      spellCorrections2.forEach((correction) => {
        expandedKeywords.push(correction);
        expandedKeywords.push(lemmatizer.verb(correction));
      });
    }
  });

  // Filter keywords that exist in our dataset
  const validKeywords = expandedKeywords.filter(keyword => 
    keywords.indexOf(keyword) !== -1
  );

  // Remove duplicates
  const uniqueKeywords = [...new Set(validKeywords)];
  
  return uniqueKeywords.sort();
}

/**
 * Format title for display
 * @param {string} title - Raw title
 * @returns {string} Formatted title
 */
function formatTitle(title) {
  if (!title) return "";
  
  let formattedTitle = title.split("-").join(" ").trim();
  return formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
}

module.exports = {
  setupStringExtensions,
  preprocessQuery,
  formatTitle,
}; 