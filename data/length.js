const fs = require("fs");
const path = require("path");
const lengthstr = fs.readFileSync(path.join(__dirname, "length.txt")).toString();
const length = lengthstr.split("\n");

for (let i = 0; i < length.length; i++) {
  length[i] = Number(length[i]);
}

module.exports = length;
