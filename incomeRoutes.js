javascript
const express = require('express');
const router = express.Router();
const Income = require('../models/income');

// Get all incomes
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add income
router.post('/', async (req, res) => {
  const income = new Income({
    amount: req.body.amount,
    source: req.body.source
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;