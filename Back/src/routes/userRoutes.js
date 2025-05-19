const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const sendEmail = require('../config/sendEmail'); // Importa a função de envio de email

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar um usuário novo
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const newUser = await User.create({ nome, email, senha, tipo });
    res.status(201).json(newUser);

    // Envia o email com as credenciais
    sendEmail(email, newUser._reSenha) // Envia o email com a senha gerada


  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Rota para buscar um usuário pelo ID
router.post('/id', async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para editar um usuário
router.put('/', async (req, res) => {
  try {
    const { id, nome, email, senha } = req.body;
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    usuario.senha = senha || usuario.senha;

    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para editar a senha do usuário
router.put('/senha', async (req, res) => {
  try {
    const { email, senha, novaSenha } = req.body;
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    // Verifica se a senha atual está correta
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    // Atualiza a senha do usuário

    usuario.email = email || usuario.email;
    usuario.senha = novaSenha || usuario.senha;

    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar um usuário
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;