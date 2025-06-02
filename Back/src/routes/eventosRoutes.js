const express = require('express');
const router = express.Router();

const Evento = require('../models/Eventos');
const Carro = require('../models/Carros');
const Motorista = require('../models/Motoristas');
const { Op } = require('sequelize');

// Um evento pertence a um motorista
Evento.belongsTo(Motorista, { // Define a relação de um evento com um motorista
  foreignKey: 'id_motorista',
  as: 'motorista'
});

// Um evento pertence a um carro
Evento.belongsTo(Carro, { // Define a relação de um evento com um carro
  foreignKey: 'id_carro',
  as: 'carro'
});

// GET / para listar eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      include: [ // Inclui os modelos relacionados de Motorista e Carro
        {
          model: Motorista,
          as: 'motorista',
          attributes: ['id', 'nome', 'status']
        },
        {
          model: Carro,
          as: 'carro',
          attributes: ['id', 'marca', 'modelo', 'kmAtual', 'status']
        }
      ],
      order: [['data_inicial', 'DESC']]
    });
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar eventos.' });
  }
});

// GET /disponiveis para criação de evento
router.get('/disponiveis', async (req, res) => {
  try {
    //Buscar eventos ativos (em andamento)
    const eventosAtivos = await Evento.findAll({ // Eventos sem data_final
      where: { // Filtrar eventos que ainda estão ativos
        data_final: { // Verifica se a data_final é nula
          [Op.is]: null // ou seja, ainda não foi finalizado
        }
      },
      attributes: ['id_motorista', 'id_carro'] // Seleciona apenas os IDs de motorista e carro
    });

    const motoristasOcupados = eventosAtivos.map(e => e.id_motorista); // Extrai os IDs dos motoristas ocupados
    const carrosOcupados = eventosAtivos.map(e => e.id_carro); // Extrai os IDs dos carros ocupados

    // Motoristas disponíveis (status = Liberado e não em evento ativo)
    const motoristasDisponiveis = await Motorista.findAll({
      where: {
        status: 'Ativo',
        id: {
          [Op.notIn]: motoristasOcupados.length ? motoristasOcupados : [0]
        }
      }
    });

    // Carros disponíveis (status = Liberado e não em evento ativo)
    const carrosDisponiveis = await Carro.findAll({
      where: {
        status: 'Liberado',
        id: {
          [Op.notIn]: carrosOcupados.length ? carrosOcupados : [0]
        }
      }
    });

    res.json({
      motoristas: motoristasDisponiveis,
      carros: carrosDisponiveis
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados disponíveis' });
  }
});

// GET / para buscar o km atual do carro
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const carro = await Carro.findByPk(id);

    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }

    res.json(carro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET / para buscar eventos por ID
router.get('/byId/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id, {
      include: [
        {
          model: Motorista,
          as: 'motorista',
          attributes: ['id', 'nome', 'status']
        },
        {
          model: Carro,
          as: 'carro',
          attributes: ['id', 'marca', 'modelo', 'kmAtual', 'status']
        }
      ]
    });

    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    res.json(evento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => { // Rota para criar um novo evento
  try {
    const { id_motorista, id_carro, data_inicial, km_inicial } = req.body;

    const motorista = await Motorista.findByPk(id_motorista);
    if (!motorista || motorista.status !== 'Ativo') {
      return res.status(400).json({ error: 'Motorista inválido ou inativo.' });
    }

    const carro = await Carro.findByPk(id_carro);
    if (!carro || carro.status !== 'Liberado') {
      return res.status(400).json({ error: 'Carro inválido ou indisponível.' });
    }

    const novoEvento = await Evento.create({
      id_motorista,
      id_carro,
      data_inicial,
      km_inicial
    });

    carro.status = 'Usando';

    await carro.save();

    res.status(201).json(novoEvento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {

    const { id, data_final, km_final } = req.body;

    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    evento.data_final = data_final;
    evento.km_final = km_final;
    await evento.save();

    const carro = await Carro.findByPk(evento.id_carro);
    if (carro) {
      carro.kmAtual = km_final; // Atualiza o kmAtual do carro
      carro.status = 'Liberado'; // Define o status do carro como Liberado
      await carro.save();
    }

    return res.json({ message: 'Devolução registrada com sucesso.', evento });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    if (evento.data_final) {
      return res.status(400).json({ error: 'Evento já finalizado, não pode ser deletado.' });
    }

    const carro = await Carro.findByPk(evento.id_carro);
    if (carro) {
      carro.status = 'Liberado'; // Define o status do carro como Liberado
      await carro.save();
    }

    await evento.destroy();
    res.json({ message: 'Evento deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;