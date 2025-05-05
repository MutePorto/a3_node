const express = require('express');
const router = express.Router();
const Motorista = require('../models/Motoristas');

router.get('/', async (req, res) => {
  try {
    const driver = await Motorista.findAll();
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/id', async (req, res) => {  // Rota para buscar motorista por ID
  try {
    const { id } = req.body
    const driver = await Motorista.findByPk(id);
    if (!driver) {
      return res.status(404).json({ error: 'Motorista não encontrado' });
    }
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {  // Rota para adicionar um novo motorista
  try {
    const { nome, cnh, data_nascimento } = req.body;
    const newDriver = await Motorista.create({ nome, cnh, data_nascimento });
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.put('/', async (req, res) => { // Rota para editar um motorista existente
  try {
    const { id, nome, cnh, data_nascimento } = req.body;
    const driver = await Motorista.findByPk(id);
    if (!driver) {
      return res.status(404).json({ error: 'Motorista não encontrado' });
    }
    driver.nome = nome;
    driver.cnh = cnh;
    driver.data_nascimento = data_nascimento;
    await driver.save();
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => { // Rota para deletar um motorista
  try {
    const { id } = req.body;
    const driver = await Motorista.findByPk(id);
    if (!driver) {
      return res.status(404).json({ error: 'Motorista não encontrado' });
    }
    await driver.destroy();
    res.json({ message: 'Motorista deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;