# Preprocessing Pipeline

This folder contains scripts for preprocessing the problem text data and generating the search indices.

## Files

### `tf-gen.js`
Main preprocessing script that generates all the required data files for the search engine.

**What it does:**
- Reads all problem text files from the `Problems/` directory
- Extracts and cleans keywords using NLP techniques:
  - Removes stopwords (is, an, the, etc.)
  - Removes punctuation
  - Converts to lowercase
  - Removes empty strings
- Generates unique keywords dictionary
- Calculates Term Frequency (TF) for each document
- Calculates Inverse Document Frequency (IDF) using BM25 formula
- Saves document lengths for BM25 calculation

**Generated files (saved to `data/` folder):**
- `keywords.txt` - Unique keywords dictionary
- `TF.txt` - Term frequency matrix (sparse format)
- `IDF.txt` - Inverse document frequency values
- `length.txt` - Document lengths

## Usage

### Prerequisites
Make sure you have the required dependencies installed:
```bash
npm install
```

### Running the preprocessing
```bash
# From the project root directory
node preprocessing/tf-gen.js
```

**Note:** This process can take several minutes to complete as it processes 3,023 documents and generates around 27,602 unique keywords.

### When to run preprocessing
- When adding new problem files to the `Problems/` directory
- When updating the NLP pipeline (changing stopword removal, lemmatization, etc.)
- When the search results seem outdated or incorrect
- Initial setup of the project

### Configuration
You can modify the following constants in `tf-gen.js`:
- `N` - Total number of documents (currently 3023)
- `PROBLEMS_DIR` - Path to problems directory
- `DATA_DIR` - Path to data output directory

## Output Structure
After running the preprocessing script, your `data/` folder will contain:
```
data/
├── keywords.txt    # One keyword per line
├── TF.txt         # Format: document_id keyword_id frequency
├── IDF.txt        # One IDF value per line (corresponds to keywords.txt)
└── length.txt     # One document length per line
```

## Technical Details

### Text Processing Pipeline
1. **Tokenization** - Split text into words
2. **Stopword Removal** - Remove common words
3. **Punctuation Removal** - Clean special characters
4. **Normalization** - Convert to lowercase
5. **Deduplication** - Remove empty and duplicate terms

### TF-IDF Calculation
- **Term Frequency (TF)**: `count(term, doc) / length(doc)`
- **Inverse Document Frequency (IDF)**: `log((N - df + 0.5) / (df + 0.5)) + 1`
  - Where N = total documents, df = document frequency of term
  - Uses BM25 IDF formula for better relevance

### Memory Considerations
- Large datasets may require substantial RAM during processing
- Output files use sparse matrix format to save disk space
- Consider processing in batches for very large document collections 