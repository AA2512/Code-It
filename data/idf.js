const fs = require("fs");
const path = require("path");
const idfstr = fs.readFileSync(path.join(__dirname, "IDF.txt")).toString();
const idf = idfstr.split("\n");

for (let i = 0; i < idf.length; i++) {
  idf[i] = Number(idf[i]);
}

module.exports = idf;
