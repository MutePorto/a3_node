const express = require('express');
const router = express.Router();

const Evento = require('../models/Eventos');
const Carro = require('../models/Carros');
const Motorista = require('../models/Motoristas');
const { Op } = require('sequelize');

// Um evento pertence a um motorista
Evento.belongsTo(Motorista, {
  foreignKey: 'id_motorista',
  as: 'motorista'
});

// Um evento pertence a um carro
Evento.belongsTo(Carro, {
  foreignKey: 'id_carro',
  as: 'carro'
});

// GET / para listar eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.findAll({
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
    const eventosAtivos = await Evento.findAll({
      where: {
        data_final: {
          [Op.is]: null
        }
      },
      attributes: ['id_motorista', 'id_carro']
    });

    const motoristasOcupados = eventosAtivos.map(e => e.id_motorista);
    const carrosOcupados = eventosAtivos.map(e => e.id_carro);

    // Motoristas disponíveis (status = Liberado e não em evento ativo)
    const motoristasDisponiveis = await Motorista.findAll({
      where: {
        status: 'Livre',
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

router.post('/', async (req, res) => {
  try {
    const { id_motorista, id_carro, data_inicial, km_inicial } = req.body;

    const motorista = await Motorista.findByPk(id_motorista);
    if (!motorista || motorista.status !== 'Livre') {
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
    motorista.status = 'Indisponivel';
    await carro.save();

    res.status(201).json(novoEvento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/devolucao', async (req, res) => {
  try {
    const { id } = req.params;
    const { data_final, km_final } = req.body;

    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    evento.data_final = data_final;
    evento.km_final = km_final;
    await evento.save();

    const carro = await Carro.findByPk(evento.id_carro);
    if (carro) {
      carro.status = 'disponível';
      await carro.save();
    }

    return res.json({ message: 'Devolução registrada com sucesso.', evento });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;