const express = require('express');
const router = express.Router();
const Account = require('../models/account');

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add account
router.post('/', async (req, res) => {
  const account = new Account({
    name: req.body.name,
    balance: req.body.balance
  });

  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get account by ID
router.get('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update account by ID
router.patch('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (account) {
      if (req.body.name) account.name = req.body.name;
      if (req.body.balance) account.balance = req.body.balance;

      const updatedAccount = await account.save();
      res.json(updatedAccount);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete account by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Account.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Account deleted' });
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
