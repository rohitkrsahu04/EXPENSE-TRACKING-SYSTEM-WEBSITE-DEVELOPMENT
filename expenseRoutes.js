const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    amount: req.body.amount,
    category: req.body.category
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update expense by ID
router.patch('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense) {
      if (req.body.amount) expense.amount = req.body.amount;
      if (req.body.category) expense.category = req.body.category;
      
      const updatedExpense = await expense.save();
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Expense deleted' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
