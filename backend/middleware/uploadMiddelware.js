import multer from "multer";

// This is a pre-configured Multer disk storage engine.
// It specifies where to store the files and what to name them.
const storage = multer.diskStorage({
  // The destination folder where files will be stored.
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // The filename is set to a unique value to prevent naming conflicts.
  // It combines the current timestamp with the original filename.
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// This function filters incoming files based on their MIME type.
// It only allows JPEG, JPG, and PNG images.
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    // If the file type is allowed, call the callback with 'true'.
    cb(null, true);
  } else {
    // If the file type is not allowed, call the callback with an error message and 'false'.
    cb(new Error('Only .jpeg, .jpg, and .png formats are allowed.'), false);
  }
};

// This creates a Multer instance with the defined storage and file filter.
const upload = multer({
  storage,
  fileFilter,
});

// Export the Multer instance as a module.
// This allows other files to import and use the 'upload' middleware.
export default upload;
