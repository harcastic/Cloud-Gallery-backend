require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// ✅ CORS (ONLY ONCE, properly configured)
const allowedOrigins = [
  "http://localhost:3000", // Local development
  process.env.FRONTEND_URL // Production URL from Vercel
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/images", require("./routes/images"));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});