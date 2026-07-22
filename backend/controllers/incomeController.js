const Income = require("../models/Income");

// Add Income
const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    const income = await Income.create({
      user: req.user.id,
      source,
      amount,
      date,
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Income
const getIncome = async (req, res) => {
  try {
    const income = await Income.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Income
const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Income
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};