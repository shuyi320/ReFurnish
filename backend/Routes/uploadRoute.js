import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js'; 

const upload = multer({ storage });
const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  console.log('Received file:', req.file);
  res.json({ imageUrl: req.file.path });
});

export default router;
