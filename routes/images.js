const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE }
});

const {
  uploadImage,
  getImages,
  deleteImage
} = require("../controllers/imageController");

router.post("/", auth, upload.single("file"), uploadImage);
router.get("/", auth, getImages);
router.delete("/:id", auth, deleteImage);

module.exports = router;