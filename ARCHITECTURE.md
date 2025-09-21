# Architecture Documentation

## 📁 Project Structure

The codebase has been reorganized into a clean, modular architecture following Node.js best practices:

```
Code-It/
├── app.js                     # Main application entry point
├── package.json               # Dependencies and scripts
│
├── config/                    # Configuration files
│   ├── constants.js          # Application constants and settings
│   └── dataLoader.js         # Centralized data loading
│
├── controllers/               # Request handlers
│   ├── searchController.js   # Search-related endpoints
│   └── questionController.js # Question-related endpoints
│
├── services/                  # Business logic
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
├── data/                      # Preprocessed data & loaders
├── preprocessing/             # Data preprocessing pipeline
├── Problems/                  # Problem text files
├── views/                     # EJS templates
└── public/                    # Static assets
```

## 🏗️ Architecture Layers

### 1. **Application Layer** (`app.js`)
- Express.js server configuration
- Middleware setup
- Route mounting
- Graceful shutdown handling

### 2. **Configuration Layer** (`config/`)
- **constants.js**: All application constants (BM25 parameters, dataset info, etc.)
- **dataLoader.js**: Centralized loading of preprocessed data files

### 3. **Route Layer** (`routes/`)
- Route definitions and HTTP method mappings
- Delegates to appropriate controllers

### 4. **Controller Layer** (`controllers/`)
- HTTP request/response handling
- Input validation
- Calls to service layer
- Response formatting

### 5. **Service Layer** (`services/`)
- **searchService.js**: BM25 algorithm implementation, search logic
- **problemService.js**: Problem data retrieval and formatting

### 6. **Utility Layer** (`utils/`)
- **textProcessing.js**: Query preprocessing, NLP operations
- **fileUtils.js**: File operations, validation helpers

### 7. **Middleware Layer** (`middleware/`)
- Error handling
- Request logging
- Authentication (if needed in future)

## 🔄 Data Flow

```
HTTP Request → Routes → Controllers → Services → Utils → Data Layer
                ↓
HTTP Response ← Response Formatting ← Business Logic ← File Operations
```

### Search Flow Example:
1. **Route**: `/search?query=binary+tree` → `routes/index.js`
2. **Controller**: `searchController.handleSearch()` validates input
3. **Service**: `searchService.searchProblems()` processes search logic
4. **Utility**: `textProcessing.preprocessQuery()` cleans the query
5. **Service**: `searchService.calculateBM25Scores()` computes relevance
6. **Service**: `problemService.generateSearchResponse()` formats results
7. **Controller**: Returns JSON response with search results

### Question Detail Flow:
1. **Route**: `/question/123` → `routes/index.js`
2. **Controller**: `questionController.handleQuestionDetail()` validates ID
3. **Utility**: `fileUtils.isValidProblemId()` checks bounds
4. **Service**: `problemService.getQuestionData()` retrieves problem
5. **Utility**: `fileUtils.readFileSafe()` safely reads file
6. **Controller**: Renders EJS template with question data

## 🛠️ Key Benefits

### ✅ **Separation of Concerns**
- Each layer has a single responsibility
- Business logic separated from HTTP handling
- Configuration centralized and easily modifiable

### ✅ **Modularity**
- Components can be tested independently
- Easy to add new features without affecting existing code
- Clear dependencies between modules

### ✅ **Maintainability**
- Code is organized by functionality
- Easy to locate and modify specific features
- Consistent error handling across the application

### ✅ **Scalability**
- Easy to add new routes, services, or utilities
- Database integration can be added at service layer
- Caching can be implemented at multiple layers

### ✅ **Testability**
- Each function has clear inputs/outputs
- Services can be unit tested independently
- Controllers can be tested with mocked services

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Example test structure
describe('searchService', () => {
  describe('calculateBM25Scores', () => {
    it('should return sorted results by relevance', () => {
      // Test BM25 scoring algorithm
    });
  });
});

describe('textProcessing', () => {
  describe('preprocessQuery', () => {
    it('should handle camelCase queries', () => {
      // Test query preprocessing
    });
  });
});
```

### Integration Tests
- Test complete request/response cycles
- Verify data flow between layers
- Test error handling scenarios

## 🔧 Configuration Management

All configuration is centralized in `config/constants.js`:

```javascript
// Easy to modify search parameters
BM25: {
  K1: 1.2,        // Term frequency saturation
  B: 0.75,        // Field length normalization
}

// Easy to update dataset info
DATASET: {
  TOTAL_DOCUMENTS: 3023,
  TOTAL_KEYWORDS: 27602,
}
```

## 🚀 Future Enhancements

The modular architecture makes it easy to add:

### Database Integration
- Add database service layer
- Implement caching strategies
- User authentication system

### Advanced Features
- Personalized search results
- Search analytics and logging
- API rate limiting
- Real-time search suggestions

### Performance Optimizations
- Query result caching
- Lazy loading of data
- Search result pagination
- Background index updates

## 📝 Development Guidelines

### Adding New Features
1. **Routes**: Define endpoint in `routes/index.js`
2. **Controller**: Create handler in appropriate controller file
3. **Service**: Implement business logic in service layer
4. **Utils**: Add utility functions if needed
5. **Config**: Add any new constants to `config/constants.js`

### Error Handling
- Use try/catch blocks in controllers
- Let middleware handle global errors
- Log errors with context information
- Return appropriate HTTP status codes

### Code Style
- Use descriptive function and variable names
- Add JSDoc comments for all functions
- Follow consistent indentation and formatting
- Keep functions small and focused on single responsibility 