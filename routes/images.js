const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const {
  uploadImage,
  getImages,
  deleteImage
} = require("../controllers/imageController");

router.post("/", auth, upload.single("file"), uploadImage);
router.get("/", auth, getImages);
router.delete("/:id", auth, deleteImage);

module.exports = router;