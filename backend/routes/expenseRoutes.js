const express = require("express")
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExecl
} = require("../controllers/expenseController")
const { protect } = require("../middleware/authMiddelware")

const router = express.Router()

router.post("/add", protect, addExpense)
router.get("/get", protect, getAllExpense)
router.get("/downloadexcel", protect, downloadExpenseExecl)
router.delete("/:id", protect, deleteExpense)


module.exports = router