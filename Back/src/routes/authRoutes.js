const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Rota para verifica se o usuário já existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Rota para verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Rota par gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, tipo: user.tipo },
      'seu_segredo_super_secreto',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login realizado com sucesso', token, nome: user.nome });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;