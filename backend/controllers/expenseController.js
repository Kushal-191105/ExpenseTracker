const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json({
      message: "Expense Added Successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    // Check if expense exists
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Check ownership
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);


    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Expense Updated Successfully",
      updatedExpense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    // Find expense
    const expense = await Expense.findById(req.params.id);

    // Check if expense exists
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Check ownership
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Delete expense
    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Expense Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};