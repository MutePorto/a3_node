const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // biblioteca para gerar string segura


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '123456789'
  },
  tipo: {
    type: DataTypes.ENUM('admin', 'cliente'),
    allowNull: false,
    defaultValue: 'admin'
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    // Hook para criptografar senha antes de criar o usuário
    beforeCreate: async (user) => {
      if (user.senha) {
        // Gera uma senha aleatória com 10 caracteres alfanuméricos
        const randomPassword = crypto.randomBytes(6).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
        user._reSenha = randomPassword; // Armazena a senha original em um campo separado
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(randomPassword, salt);
      }
    },
    // Hook para criptografar senha antes de atualizar caso tenha alterada
    beforeUpdate: async (user) => {
      if (user.changed('senha')) {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
      }
    }
  }
});

module.exports = User;