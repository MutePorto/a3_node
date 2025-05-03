const express = require('express');
const router = express.Router();
const Motorista = require('../models/Motoristas');

router.get('/getMotorista', async (req, res) => {
  try {
    const driver = await Motorista.findAll();
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/setMotorista', async (req, res) => {
  try {
    const { nome, cnh, data_nascimento } = req.body;
    const newDriver = await Motorista.create({ nome, cnh, data_nascimento });
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

module.exports = router;