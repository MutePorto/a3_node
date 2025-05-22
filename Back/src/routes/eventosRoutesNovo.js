const express = require('express');
const router = express.Router();
const Evento = require('../models/Eventos');

// Listar todos os eventos
router.get('/', (req, res) => {
  Evento.findAll()
    .then(eventos => res.json(eventos))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Criar um novo evento
router.post('/', (req, res) => {
  const { nome, data, local, id_motorista, id_carro } = req.body;
  Evento.create({ nome, data, local, id_motorista, id_carro })
    .then(evento => res.status(201).json(evento))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Buscar evento usando o ID
router.post('/id', (req, res) => {
  const { id } = req.body;
  Evento.findByPk(id)
    .then(evento => {
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      res.json(evento);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Atualizar os eventos
router.put('/', (req, res) => {
  const { id, nome, data, local, id_motorista, id_carro } = req.body;
  Evento.findByPk(id)
    .then(evento => {
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      return evento.update({ nome, data, local, id_motorista, id_carro });
    })
    .then(eventoAtualizado => res.json(eventoAtualizado))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Deletar o evento
router.delete('/', (req, res) => {
  const { id } = req.body;
  Evento.findByPk(id)
    .then(evento => {
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      return evento.destroy();
    })
    .then(() => res.json({ message: 'Evento deletado com sucesso' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;