const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addExpense,
  getExpenses,
  updateExpense,
   deleteExpense,
} = require("../controllers/expenseController");
console.log("protect:", typeof protect);
console.log("addExpense:", typeof addExpense);
console.log("getExpenses:", typeof getExpenses);
console.log("updateExpense:", typeof updateExpense);

router.post("/", protect, addExpense);
router.get("/", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
module.exports = router;