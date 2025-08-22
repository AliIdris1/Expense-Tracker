import express from "express";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExecl,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddelware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExecl);
router.delete("/:id", protect, deleteExpense);

export default router;
