const express = require('express');
const router = express.Router();

const Evento = require('../models/Eventos');
const Carro = require('../models/Carros');
const Motorista = require('../models/Motoristas');

router.post('/', async (req, res) => {
  try {
    const { id_motorista, id_carro, data_inicial, km_inicial } = req.body;

    const motorista = await Motorista.findByPk(id_motorista);
    if (!motorista || motorista.status !== 'ativo') {
      return res.status(400).json({ error: 'Motorista inválido ou inativo.' });
    }

    const carro = await Carro.findByPk(id_carro);
    if (!carro || carro.status !== 'disponivel') {
      return res.status(400).json({ error: 'Carro inválido ou indisponível.' });
    }

    const novoEvento = await Evento.create({
      id_motorista,
      id_carro,
      data_inicial,
      km_inicial
    });

    carro.status = 'ocupado';
    await carro.save();

    res.status(201).json(novoEvento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

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