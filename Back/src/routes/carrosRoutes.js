const express = require('express');
const router = express.Router();
const Carro = require('../models/Carros');

// Rota para criar um novo carro
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

// Rota para listar todos os carros
router.get('/', async (req, res) => {
  try {
    const carros = await Carro.findAll();
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para procurar um carro por ID
router.post('/id', async (req, res) => {
  try {
    const { id } = req.body;
    const carro = await Carro.findByPk(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.json(carro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para editar um carro existente
router.put('/', async (req, res) => {
  try {
    const { id, marca, modelo, kmAtual, status } = req.body;
    const carro = await Carro.findByPk(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    carro.marca = marca;
    carro.modelo = modelo;
    carro.kmAtual = kmAtual;
    carro.status = status;
    await carro.save();

    res.json(carro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar um carro
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const carro = await Carro.findByPk(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    await carro.destroy();
    res.json({ message: 'Carro deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
