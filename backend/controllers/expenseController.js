import xlsx from "xlsx";
import Expense from "../models/Expense.js";

//Add expense source
export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const newExpense = Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json({ newExpense });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Get all expense source
export const getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Delete expense source
export const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Download Execl
export const downloadExpenseExecl = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    
    // This part of the code needs a server-side file system to write the file,
    // and then a way to send it to the client. This is a common pattern,
    // but the actual file download logic can vary based on your environment.
    // The res.download() function works with a file path on the server.
    const filePath = "expense_details.xlsx";
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
