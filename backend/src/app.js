const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

// ✅ Allow CORS for all origins (Render sometimes ignores middleware)
app.use(cors());
// ✅ Manually add CORS headers in every response
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Handle preflight requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Middleware
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

module.exports = app;
