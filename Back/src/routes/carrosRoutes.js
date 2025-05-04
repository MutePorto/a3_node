const express = require('express');
const router = express.Router();
const Carro = require('../models/Carros');

// Ação de criar um novo carro
router.post('/', async (req, res) => {
  try {
    const { marca, modelo, kmAtual, status } = req.body;

    const novoCarro = await Carro.create({
      marca,
      modelo,
      kmAtual,
      status
    });

    res.status(201).json(novoCarro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lista de carros
router.get('/', async (req, res) => {
  try {
    const carros = await Carro.findAll();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
