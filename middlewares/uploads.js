const multer = require('multer');
const path = require('path');

// 1) Decide where and how to save files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // always save into /uploads
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // create a unique filename so we don’t overwrite
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// 2) (Optional) Only accept common image types
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only JPG/PNG images are allowed'), false);
};

module.exports = multer({
  storage,
  fileFilter,
});
