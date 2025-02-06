const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

// Enable CORS for all origins
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Allow preflight requests for all routes
app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

module.exports = app;
