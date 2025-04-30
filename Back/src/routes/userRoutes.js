const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const newUser = await User.create({ nome, email, senha, tipo });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

module.exports = router;