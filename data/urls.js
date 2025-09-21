const fs = require("fs");
const path = require("path");
const urlsstr = fs.readFileSync(path.join(__dirname, "problem-urls.txt")).toString();
const urls = urlsstr.split("\n");

module.exports = urls;
