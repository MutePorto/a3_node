const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Evento = sequelize.define('Evento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_motorista: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'motoristas',
      key: 'id',
    },
  },
  id_carro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carros',
      key: 'id',
    },
  },
  data_inicial: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_final: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  km_inicial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  km_final: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'eventos',
  timestamps: true,
});

module.exports = Evento;
