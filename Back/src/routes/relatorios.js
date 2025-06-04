const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Evento = require('../models/Eventos');

// Relatório do motorista X
router.get('/motorista/:id', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { motoristaId: req.params.id }
    });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X em uma data específica
router.get('/motorista/:id/data/:data', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: {
        motoristaId: req.params.id,
        data: req.params.data
      }
    });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X entre duas datas
// Ex: /relatorios/motorista/1/intervalo?inicio=2024-11-11&fim=2024-12-11
router.get('/motorista/:id/intervalo', async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    const eventos = await Evento.findAll({
      where: {
        motoristaId: req.params.id,
        data: {
          [Op.between]: [inicio, fim]
        }
      }
    });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Relatório por carro
router.get('/carro/:id', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { carroId: req.params.id }
    });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório por data "todos os eventos de uma data"
router.get('/data/:data', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { data: req.params.data }
    });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
