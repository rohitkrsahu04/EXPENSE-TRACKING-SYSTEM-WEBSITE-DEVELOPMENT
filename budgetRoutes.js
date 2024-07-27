const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add budget
router.post('/', async (req, res) => {
  const budget = new Budget({
    category: req.body.category,
    limit: req.body.limit
  });

  try {
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get budget by ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update budget by ID
router.patch('/:id', async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (budget) {
      if (req.body.category) budget.category = req.body.category;
      if (req.body.limit) budget.limit = req.body.limit;

      const updatedBudget = await budget.save();
      res.json(updatedBudget);
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete budget by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Budget.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Budget deleted' });
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
