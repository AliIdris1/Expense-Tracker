const express = require("express")
const { protect } = require("../middleware/authMiddelware")
const {
    registerUser,
    loginUser,
    getUserInfo

} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddelware");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser" , protect,getUserInfo )

router.post("/upload-image", upload.single("image"), (req , res) => {
    if(!req.file) {
        return res.status(400).json({message: "No image uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    return res.status(200).json({ imageUrl })
})




module.exports = router

