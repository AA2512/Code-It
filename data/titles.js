const fs = require("fs");
const path = require("path");
const titlesstr = fs.readFileSync(path.join(__dirname, "problem-titles.txt")).toString();
const titles = titlesstr.split("\n");

module.exports = titles;
