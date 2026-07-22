const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  saveBudget,
  getBudget,
} = require("../controllers/budgetController");

router.post("/", protect, saveBudget);
router.get("/", protect, getBudget);

module.exports = router;