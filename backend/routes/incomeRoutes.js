const express = require("express");

const router = express.Router();

const {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");
console.log({
  protect: typeof protect,
  addIncome: typeof addIncome,
  getIncome: typeof getIncome,
  updateIncome: typeof updateIncome,
  deleteIncome: typeof deleteIncome,
});

router.post("/", protect, addIncome);

router.get("/", protect, getIncome);

router.put("/:id", protect, updateIncome);

router.delete("/:id", protect, deleteIncome);

module.exports = router;