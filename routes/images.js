const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const { getUserContainer } = require("../config/azure");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE }
});

// Rate limiter for uploads - max 2 uploads per second per user
const uploadRateLimiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 2, // Max 2 requests per window
  keyGenerator: (req) => req.user.id, // Rate limit by user ID
  skip: (req) => !req.user, // Skip if user is not authenticated
  message: { msg: "Too many uploads. Please wait before uploading again." },
  standardHeaders: false, // Don't return rate limit info in headers
  legacyHeaders: false // Disable X-RateLimit headers
});

const {
  uploadImage,
  getImages,
  deleteImage
} = require("../controllers/imageController");

router.post("/", auth, uploadRateLimiter, upload.single("file"), uploadImage);
router.get("/", auth, getImages);
router.delete("/:id", auth, deleteImage);

module.exports = router;