const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize'); // Importa a instância do Sequelize
const Evento = require('../models/Eventos');


// Relatório de todos os eventos
router.get('/', async (req, res) => {
  try {

    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X
router.get('/motorista/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE motorista.id = ${id} ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X em um carro específico
router.get('/motorista/:idm/carro/:idc', async (req, res) => {
  try {
    const { idm, idc } = req.params;
    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE motorista.id = ${idm} AND carro.id = ${idc} ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X em uma data inicial
router.get('/motorista/:id/data/:data', async (req, res) => {
  try {
    const { id, data } = req.params;

    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id 
      WHERE id_motorista = :id_motorista 
        AND data_inicial LIKE :data`,
      {
        replacements: {
          id_motorista: id,
          data: `${data}%` // Filtra eventos que começam com a data especificada
        },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X entre duas datas
// Ex: /relatorios/motorista/1/2024-11-01/2024-11-30
router.get('/motorista/:id/:dataInicial/:dataFinal', async (req, res) => {
  try {
    const { id, dataInicial, dataFinal } = req.params;

    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE motorista.id = '${id}' AND Evento.data_inicial >= '${dataInicial}' AND Evento.data_final <= '${dataFinal}' OR motorista.id = '${id}' AND Evento.data_inicial >= '${dataInicial}' ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do motorista X em um carro específico e intervalo de datas
router.get('/motorista/:idm/carro/:idc/:dataInicial/:dataFinal', async (req, res) => {
  try {
    const { idm, idc, dataInicial, dataFinal } = req.params;

    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE motorista.id = '${idm}' AND carro.id = '${idc}' AND Evento.data_inicial >= '${dataInicial}' AND Evento.data_final <= '${dataFinal}' OR motorista.id = '${idc}' AND carro.id = '${idc}' AND Evento.data_inicial >= '${dataInicial}' ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Relatório por carro
router.get('/carro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE carro.id = ${id} ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório do carro X num intervalo data 
router.get('/carro/:id/:dataInicial/:dataFinal', async (req, res) => {
  try {
    const { id, dataInicial, dataFinal } = req.params;

    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE carro.id = '${id}' AND Evento.data_inicial >= '${dataInicial}' AND Evento.data_final <= '${dataFinal}' OR carro.id = '${id}' AND Evento.data_inicial >= '${dataInicial}' ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório por data "todos os eventos de uma data inicial"
router.get('/data/:data', async (req, res) => {
  try {
    const { data } = req.params;
    console.log(`Buscando eventos para a data: ${data}`);
    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE Evento.data_inicial LIKE :data ORDER BY Evento.data_inicial DESC;`,
      {
        replacements: {
          data: `${data}%` // Filtra eventos que começam com a data especificada
        },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Relatório por intervalo de datas
// Exemplo: /relatorios/intervalo/2024-11-01/2024-11-30
router.get('/intervalo/:dataInicial/:dataFinal', async (req, res) => {
  try {
    const { dataInicial, dataFinal } = req.params;

    const eventos = await sequelize.query(
      `SELECT Evento.id AS 'Evento.id', Evento.data_inicial AS 'Evento.data_inicial', Evento.data_final AS 'Evento.data_final', Evento.km_inicial AS 'Evento.km_inicial', Evento.km_final AS 'Evento.km_final', Evento.createdAt AS 'Evento.createdAt', Evento.updatedAt AS 'Evento.updateAt', motorista.id AS 'motorista.id', motorista.nome AS 'motorista.nome', motorista.status AS 'motorista.status', carro.id AS 'carro.id', carro.marca AS 'carro.marca', carro.modelo AS 'carro.modelo', carro.kmAtual AS 'carro.kmAtual', carro.status AS 'carro.status' FROM eventos AS Evento LEFT OUTER JOIN motoristas AS motorista ON Evento.id_motorista = motorista.id LEFT OUTER JOIN carros AS carro ON Evento.id_carro = carro.id WHERE Evento.data_inicial >= '${dataInicial}' AND Evento.data_final <= '${dataFinal}' ORDER BY Evento.data_inicial DESC;`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
