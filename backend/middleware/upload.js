const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/modules/"); // Save under uploads/modules
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

// File filter (optional: restrict to PDFs, videos, docs, etc.)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|mp4|docx|pptx|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("Only documents, images and videos allowed!"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
