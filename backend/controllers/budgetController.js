const Budget = require("../models/Budget");

// Create or Update Budget
const saveBudget = async (req, res) => {
  try {
    const { monthlyBudget } = req.body;

    let budget = await Budget.findOne({
      user: req.user.id,
    });

    if (budget) {
      budget.monthlyBudget = monthlyBudget;
      await budget.save();
    } else {
      budget = await Budget.create({
        user: req.user.id,
        monthlyBudget,
      });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Budget
const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      user: req.user.id,
    });

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveBudget,
  getBudget,
};