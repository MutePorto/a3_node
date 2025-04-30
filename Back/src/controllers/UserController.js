const User = require('../models/User');

const UserController = {
  async listarUsuarios(req, res) {
    try {
      const usuarios = await User.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },

  async criarUsuario(req, res) {
    const { nome, email, senha, tipo } = req.body;
    try {
      const novoUsuario = await User.create({ nome, email, senha, tipo });
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  }
};

module.exports = UserController;
