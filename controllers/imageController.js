const Image = require("../models/Image");
const { containerClient } = require("../config/azure");
const { v4: uuidv4 } = require("uuid");

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ msg: "No file uploaded" });

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ msg: "File size exceeds 5MB limit" });
    }

    // Determine file type based on MIME type
    let fileType = 'image';
    if (file.mimetype.startsWith('video/')) {
      fileType = 'video';
    }

    const blobName = uuidv4() + "-" + file.originalname;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
            blobContentType: file.mimetype
        }
    });

    const image = await Image.create({
      userId: req.user.id,
      url: blockBlobClient.url,
      filename: blobName,
      fileType: fileType
    });

    res.json(image);
  } catch (err) {
    if (err.message && err.message.includes('File size exceeds')) {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Upload failed" });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id });
    res.json(images);
  } catch {
    res.status(500).json({ msg: "Fetch failed" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ msg: "Not found" });

    if (image.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const blockBlobClient = containerClient.getBlockBlobClient(
      image.filename
    );

    await blockBlobClient.deleteIfExists();

    await image.deleteOne();

    res.json({ msg: "Deleted" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
};