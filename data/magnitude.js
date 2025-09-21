const fs = require("fs");
const path = require("path");
const magnitudestr = fs.readFileSync(path.join(__dirname, "Magnitude.txt")).toString();
const magnitude = magnitudestr.split("\n");
// console.log(magnitude);
for (let i = 0; i < magnitude.length; i++) {
  magnitude[i] = Number(magnitude[i]);
}

// console.log(magnitude);

module.exports = magnitude;
