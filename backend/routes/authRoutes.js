import express from "express";
import { protect } from "../middleware/authMiddelware.js";
import {
  registerUser,
  loginUser,
  getUserInfo
} from "../controllers/authController.js";
import upload from "../middleware/uploadMiddelware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser" , protect, getUserInfo )

router.post("/upload-image", upload.single("image"), (req , res) => {
    if(!req.file) {
        return res.status(400).json({message: "No image uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    return res.status(200).json({ imageUrl })
})




export default router
