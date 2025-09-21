/**
 * Text Preprocessing and TF-IDF Generation Script
 * 
 * This script processes all problem text files and generates:
 * - Keywords dictionary
 * - Term Frequency (TF) matrix
 * - Inverse Document Frequency (IDF) values
 * - Document lengths
 * 
 * Run this script when you need to reprocess the data or add new problems.
 */

const { removeStopwords } = require("stopword");
const removePunc = require("remove-punctuation");
const fs = require("fs");
const path = require("path");

// Configuration
const N = 3023; // Total number of documents
const PROBLEMS_DIR = path.join(__dirname, "..", "Problems");
const DATA_DIR = path.join(__dirname, "..", "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

console.log("Starting text preprocessing...");

// Read all problem documents
let documents = [];
for (let i = 1; i <= N; i++) {
  const problemPath = path.join(PROBLEMS_DIR, `problem_text_${i}.txt`);
  console.log(`Reading: ${problemPath}`);
  
  if (fs.existsSync(problemPath)) {
    const question = fs.readFileSync(problemPath).toString();
    documents.push(question);
  } else {
    console.warn(`File not found: ${problemPath}`);
    documents.push(""); // Empty document as placeholder
  }
}

console.log(`Loaded ${documents.length} documents`);

// Extract keywords from each document
let docKeywords = [];
let totalLength = 0;

for (let i = 0; i < documents.length; i++) {
  const lines = documents[i].split("\n");
  const docWords = [];
  
  for (let k = 0; k < lines.length; k++) {
    const temp1 = lines[k].split(" ");
    temp1.forEach((e) => {
      e = e.split("\r");
      if (e[0].length) docWords.push(e[0]);
    });
  }
  
  // Remove stopwords and process
  const newString = removeStopwords(docWords);
  newString.sort();
  
  let temp = [];
  for (let j = 0; j < newString.length; j++) {
    newString[j] = newString[j].toLowerCase();
    newString[j] = removePunc(newString[j]);
    if (newString[j] !== "") temp.push(newString[j]);
  }
  
  docKeywords.push(temp);
  totalLength += temp.length;
}

console.log("Keywords extracted from all documents");

// Calculate average document length
const avgdl = totalLength / N;
console.log(`Average document length: ${avgdl}`);

// Generate unique keywords dictionary
let keywords = [];
for (let i = 0; i < N; i++) {
  docKeywords[i].forEach((key) => {
    if (keywords.indexOf(key) === -1) {
      keywords.push(key);
    }
  });
}

keywords.sort();
const W = keywords.length;
console.log(`Total unique keywords: ${W}`);

// Save keywords to file
const keywordsPath = path.join(DATA_DIR, "keywords.txt");
fs.writeFileSync(keywordsPath, "");
keywords.forEach((word) => {
  fs.appendFileSync(keywordsPath, word + "\n");
});
console.log(`Keywords saved to: ${keywordsPath}`);

// Save document lengths
const lengthPath = path.join(DATA_DIR, "length.txt");
fs.writeFileSync(lengthPath, "");
for (let i = 0; i < N; i++) {
  fs.appendFileSync(lengthPath, docKeywords[i].length + "\n");
}
console.log(`Document lengths saved to: ${lengthPath}`);

// Calculate Term Frequency (TF) matrix
console.log("Calculating Term Frequency matrix...");
let TF = new Array(N);
for (let i = 0; i < N; i++) {
  TF[i] = new Array(W).fill(0);
  let map = new Map();
  
  // Initialize map
  docKeywords[i].forEach((key) => {
    return map.set(key, 0);
  });
  
  // Count frequencies
  docKeywords[i].forEach((key) => {
    let cnt = map.get(key);
    cnt++;
    return map.set(key, cnt);
  });
  
  // Calculate normalized TF
  docKeywords[i].forEach((key) => {
    const id = keywords.indexOf(key);
    if (id !== -1) {
      TF[i][id] = map.get(key) / docKeywords[i].length;
    }
  });
}

// Save TF matrix (sparse format)
const tfPath = path.join(DATA_DIR, "TF.txt");
fs.writeFileSync(tfPath, "");
for (let i = 0; i < N; i++) {
  for (let j = 0; j < W; j++) {
    if (TF[i][j] != 0) {
      fs.appendFileSync(tfPath, i + " " + j + " " + TF[i][j] + "\n");
    }
  }
}
console.log(`TF matrix saved to: ${tfPath}`);

// Calculate Inverse Document Frequency (IDF)
console.log("Calculating Inverse Document Frequency...");
let IDF = new Array(W);
for (let i = 0; i < W; i++) {
  let cnt = 0;
  for (let j = 0; j < N; j++) {
    if (TF[j][i]) {
      cnt++;
    }
  }
  
  if (cnt) {
    // BM25 IDF formula
    IDF[i] = Math.log((N - cnt + 0.5) / (cnt + 0.5) + 1) + 1;
  }
}

// Save IDF values
const idfPath = path.join(DATA_DIR, "IDF.txt");
fs.writeFileSync(idfPath, "");
IDF.forEach((value) => {
  fs.appendFileSync(idfPath, value + "\n");
});
console.log(`IDF values saved to: ${idfPath}`);

console.log("Preprocessing completed successfully!");
console.log(`Generated files in ${DATA_DIR}:`);
console.log("- keywords.txt");
console.log("- length.txt");
console.log("- TF.txt");
console.log("- IDF.txt");
