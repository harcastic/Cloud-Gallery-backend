require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// ✅ CORS Configuration - Works for both local development and cloud instances
const allowedOrigins = [
  "http://localhost:3000", // Local development
  process.env.FRONTEND_URL, // Production URL from environment variable
  "http://localhost:3001", // Alternative local port
  "http://localhost:8080"  // Alternative local port
].filter(Boolean); // Remove undefined/null values

// Use wildcard for development, specific origins for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? allowedOrigins : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/images", require("./routes/images"));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});