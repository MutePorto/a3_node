const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Carro = sequelize.define('Carro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kmAtual: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('disponível', 'manutenção', 'indisponível'),
    defaultValue: 'disponível'
  }
}, {
  tableName: 'carros',
  timestamps: false
});

module.exports = Carro;
