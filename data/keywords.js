const fs = require("fs");
const path = require("path");
const keywordsstr = fs.readFileSync(path.join(__dirname, "keywords.txt")).toString();
const keywords = keywordsstr.split("\n");
module.exports = keywords;
