const express = require("express")
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExecl
} = require("../controllers/incomeController")
const { protect } = require("../middleware/authMiddelware")

const router = express.Router()

router.post("/add", protect, addIncome)
router.get("/get", protect, getAllIncome)
router.get("/downloadexcel", protect, downloadIncomeExecl)
router.delete("/:id", protect, deleteIncome)


module.exports = router