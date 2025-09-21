/**
 * Data Loader Configuration
 * Centralized loading of all preprocessed data files
 */

const path = require("path");

// Data loaders
const IDF = require("../data/idf");
const keywords = require("../data/keywords");
const length = require("../data/length");
const TF = require("../data/TF");
const titles = require("../data/titles");
const urls = require("../data/urls");

module.exports = {
  IDF,
  keywords,
  length,
  TF,
  titles,
  urls,
}; 