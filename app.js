/**
 * DSA Problem Search Engine
 * Main Application Entry Point
 */

const express = require("express");
const path = require("path");

// Configuration
const config = require("./config/constants");

// Utilities
const { setupStringExtensions } = require("./utils/textProcessing");

// Routes
const routes = require("./routes");

// Middleware
const { globalErrorHandler, notFoundHandler, requestLogger } = require("./middleware/errorHandler");

// Initialize Express app
const app = express();

// Setup string extensions
setupStringExtensions();

// Middleware
app.use(requestLogger);

// Configure Express
app.set("view engine", config.SERVER.VIEW_ENGINE);
app.use(express.static(path.join(__dirname, config.PATHS.PUBLIC_DIR)));

// Routes
app.use("/", routes);

// Error handling middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start server
const port = process.env.PORT || config.SERVER.DEFAULT_PORT;

app.listen(port, () => {
  console.log(`🚀 Search engine server running on port ${port}`);
  console.log(`📊 Dataset: ${config.DATASET.TOTAL_DOCUMENTS} problems with ${config.DATASET.TOTAL_KEYWORDS} unique keywords`);
  console.log(`🔍 BM25 Parameters: k1=${config.BM25.K1}, b=${config.BM25.B}`);
  console.log(`⚡ Ready to serve search requests at http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});

module.exports = app;
