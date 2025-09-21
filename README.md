# DSA Problem Search Engine

An intelligent search engine for Data Structures and Algorithms problems using BM25 algorithm and Natural Language Processing.

## 🔍 Overview

This search engine processes 3,023 DSA problems from LeetCode, InterviewBit, and TechDelight, providing intelligent search capabilities with:
- **BM25 ranking algorithm** for optimal relevance scoring
- **Advanced text preprocessing** with spell-check, lemmatization, and stopword removal
- **Smart query expansion** with number-to-word conversion and camelCase detection
- **Multi-platform integration** from major coding platforms

## 📁 Project Structure

The project follows a **clean, modular architecture** with proper separation of concerns:

```
Code-It/
├── app.js                     # Main application entry point
├── package.json               # Dependencies and scripts
│
├── config/                    # Configuration files
│   ├── constants.js          # Application constants and settings
│   └── dataLoader.js         # Centralized data loading
│
├── controllers/               # Request handlers (HTTP layer)
│   ├── searchController.js   # Search-related endpoints
│   └── questionController.js # Question-related endpoints
│
├── services/                  # Business logic layer
│   ├── searchService.js      # Search algorithms (BM25)
│   └── problemService.js     # Problem data operations
│
├── utils/                     # Utility functions
│   ├── textProcessing.js     # Query preprocessing & NLP
│   └── fileUtils.js          # File operations & validation
│
├── middleware/                # Custom middleware
│   └── errorHandler.js       # Error handling & logging
│
├── routes/                    # Route definitions
│   └── index.js              # Main route configuration
│
├── data/                      # Preprocessed data and loaders
│   ├── *.js                  # Data loader modules  
│   ├── *.txt                 # Preprocessed data files
│   └── README.md             # Data documentation
│
├── preprocessing/             # Data preprocessing pipeline
│   ├── tf-gen.js             # TF-IDF generation script
│   └── README.md             # Preprocessing documentation
│
├── Problems/                  # Problem text files (3,023 files)
├── views/                     # EJS templates
├── public/                    # Static assets
├── ARCHITECTURE.md            # Detailed architecture documentation
└── project_synopsis.md       # Project overview
```

### Architecture Benefits ✨
- **🔧 Modular Design**: Easy to maintain and extend
- **🧪 Testable**: Each component can be tested independently  
- **📈 Scalable**: Clear separation allows easy feature additions
- **🛠️ Configurable**: Centralized configuration management
- **🚀 Professional**: Follows Node.js best practices

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Code-It

# Install dependencies
npm install

# Run the application
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `PORT` environment variable).

## 🛠️ Technology Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **EJS** - Template engine

### NLP Libraries
- **Natural** - Spell checking and text analysis
- **Stopword** - Stopword removal
- **Wink-lemmatizer** - Word lemmatization
- **Remove-punctuation** - Text cleaning
- **String-similarity** - Title similarity scoring

### Data Processing
- **Number-to-words / Words-to-numbers** - Numeric query processing
- **File-based storage** - Efficient text file system for 3,023 problems
- **Pre-computed indices** - TF-IDF matrices for fast retrieval

## 📊 Dataset Information

- **Total Problems**: 3,023
- **Unique Keywords**: 27,602
- **Average Document Length**: 138.27 tokens

### Data Sources
- **LeetCode**: 1,774 problems (indices 0-1773)
- **InterviewBit**: 440 problems (indices 1774-2213) 
- **TechDelight**: 809 problems (indices 2214-3022)

## 🔄 Data Preprocessing

The preprocessing pipeline generates optimized search indices from raw problem text:

### Running Preprocessing
```bash
# Generate all data indices (run when adding new problems)
node preprocessing/tf-gen.js
```

### What It Does
1. **Text Processing**: Tokenization, stopword removal, punctuation cleaning
2. **Keyword Extraction**: Generates unique vocabulary of 27,602 terms
3. **TF-IDF Calculation**: Computes term frequencies and inverse document frequencies
4. **Index Generation**: Creates optimized search indices

See `preprocessing/README.md` for detailed documentation.

## 🔍 Search Features

### Advanced Query Processing
- **Spell Correction**: Automatically corrects misspelled terms
- **Lemmatization**: Converts words to base forms (running → run)
- **Number Conversion**: Handles numeric queries (2 ↔ two)
- **CamelCase Detection**: Recognizes programming terminology

### BM25 Ranking
- **Relevance Scoring**: Term frequency, document length, and collection statistics
- **Platform Weighting**: Higher scores for LeetCode and InterviewBit problems
- **Title Similarity**: Bonus scoring for title matches

### Search Response Format
```json
[
  {
    "id": 0,
    "title": "two-sum",
    "problem": "Given an array of integers..."
  }
]
```

## 🌐 API Endpoints

### GET `/`
Home page with search interface

### GET `/search?query={query}`
Search problems by query
- **Parameters**: `query` (string) - Search terms
- **Response**: JSON array of matching problems

### GET `/question/:id`
Display detailed problem view
- **Parameters**: `id` (number) - Problem ID (0-3022)
- **Response**: HTML page with problem details

## 🧪 Usage Examples

### Search Queries
```
"binary search tree"     → Problems about BST
"two sum array"          → Array-based two sum problems  
"dynamic programming"    → DP problems
"graph traversal"        → Graph algorithms
"2 pointers"            → Two pointer technique
```

### Advanced Features
- **Numeric Queries**: "find 2 elements" matches "find two elements"
- **Spell Tolerance**: "algoritm" matches "algorithm"  
- **CamelCase**: "maxSubArray" matches "max sub array"

## 📈 Performance

- **Search Response Time**: < 1 second
- **Memory Usage**: ~55MB for loaded indices
- **Concurrent Users**: Optimized for multiple simultaneous searches
- **Index Loading**: Fast startup with pre-computed matrices

## 🔧 Configuration

### Environment Variables
```bash
PORT=3000                # Server port (default: 3000)
```

### Search Parameters
Edit constants in `app.js`:
```javascript
const N = 3023;                    // Total documents
const W = 27602;                   // Unique keywords  
const avgdl = 138.27125372146875; // Average document length
```

## 📝 Development

### Adding New Problems
1. Add problem text files to `Problems/` directory
2. Update problem counts in configuration
3. Run preprocessing: `node preprocessing/tf-gen.js`
4. Restart the application

### Modifying Search Algorithm
- Update BM25 parameters (k1, b) in `calculateBM25Scores()`
- Modify query preprocessing in `preprocessQuery()`
- Adjust platform weighting in scoring logic

## 🐛 Troubleshooting

### Common Issues
- **File Not Found**: Ensure `Problems/` directory contains all text files
- **Memory Errors**: Increase Node.js heap size for large datasets
- **Slow Searches**: Verify preprocessing completed successfully

### Debug Mode
Enable detailed logging:
```javascript
console.log("Processed query keywords:", processedQuery);
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run preprocessing if needed
5. Submit a pull request

## 📧 Support

For questions or issues, please refer to:
- `preprocessing/README.md` - Data processing help
- `data/README.md` - Data format documentation
- `project_synopsis.md` - Project overview 