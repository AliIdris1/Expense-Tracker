import express from "express";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExecl,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddelware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExecl);
router.delete("/:id", protect, deleteIncome);

export default router;
