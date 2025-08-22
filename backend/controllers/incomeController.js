import xlsx from "xlsx";
import Income from "../models/Income.js";

//Add income source
export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const newIncome = Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json({ newIncome });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Get all income source
export const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Delete income source
export const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Download Execl
export const downloadIncomeExecl = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    const filePath = "income_details.xlsx";
    xlsx.writeFile(wb, filePath);
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
