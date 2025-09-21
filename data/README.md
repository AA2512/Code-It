# Data Directory

This folder contains all preprocessed data files and data loading modules required by the search engine.

## Data Files

### Text Data Files
- **`keywords.txt`** - Dictionary of unique keywords (27,602 keywords)
- **`TF.txt`** - Term Frequency matrix in sparse format
- **`IDF.txt`** - Inverse Document Frequency values for each keyword
- **`length.txt`** - Document lengths for BM25 calculation
- **`problem-titles.txt`** - Problem titles for each document
- **`problem-urls.txt`** - Source URLs for each problem
- **`Magnitude.txt`** - Document vector magnitudes (if using cosine similarity)
- **`TFIDF.txt`** - TF-IDF matrix in sparse format (legacy)

### Data File Formats

#### `keywords.txt`
```
algorithm
array
binary
...
```
One keyword per line, sorted alphabetically.

#### `TF.txt`
```
0 15 0.023
0 42 0.045
1 15 0.012
...
```
Format: `document_id keyword_id normalized_frequency`

#### `IDF.txt`
```
2.1
1.8
3.4
...
```
One IDF value per line, corresponding to keywords in `keywords.txt`.

#### `length.txt`
```
156
234
189
...
```
One document length per line (number of tokens after preprocessing).

## Data Loader Modules

### Core Loaders
- **`idf.js`** - Loads IDF values from `IDF.txt`
- **`keywords.js`** - Loads keywords dictionary from `keywords.txt`
- **`TF.js`** - Loads TF matrix from `TF.txt` (sparse format)
- **`length.js`** - Loads document lengths from `length.txt`
- **`titles.js`** - Loads problem titles from `problem-titles.txt`
- **`urls.js`** - Loads problem URLs from `problem-urls.txt`

### Additional Loaders
- **`magnitude.js`** - Loads document magnitudes from `Magnitude.txt`
- **`TFIDF.js`** - Loads legacy TF-IDF matrix from `TFIDF.txt`

## Usage in Application

The main application (`app.js`) imports these modules:
```javascript
const IDF = require("./data/idf");
const keywords = require("./data/keywords");
const length = require("./data/length");
const TF = require("./data/TF");
const titles = require("./data/titles");
const urls = require("./data/urls");
```

## Data Statistics

- **Total Documents**: 3,023
- **Unique Keywords**: 27,602
- **Average Document Length**: 138.27 tokens
- **Data Sources**:
  - LeetCode: 1,774 problems (indices 0-1773)
  - InterviewBit: 440 problems (indices 1774-2213)
  - TechDelight: 809 problems (indices 2214-3022)

## Regenerating Data

To regenerate all data files:
```bash
node preprocessing/tf-gen.js
```

This will:
1. Process all problem files in `Problems/` directory
2. Generate new keywords dictionary
3. Calculate new TF and IDF matrices
4. Update document lengths
5. Save all files to this directory

## File Dependencies

```
problem-titles.txt ← External data source
problem-urls.txt   ← External data source
Problems/          ← Problem text files
     ↓
tf-gen.js         ← Preprocessing script
     ↓
keywords.txt      ← Generated
TF.txt           ← Generated
IDF.txt          ← Generated
length.txt       ← Generated
```

## Memory Usage

Approximate memory usage when loaded:
- Keywords array: ~1MB
- TF matrix (sparse): ~50MB
- IDF array: ~1MB
- Titles/URLs: ~1MB each
- Total: ~55MB

## Notes

- All text files use UTF-8 encoding
- Sparse matrix format saves significant disk space
- Data loaders use synchronous file reading for simplicity
- Path resolution is relative to each module's location 