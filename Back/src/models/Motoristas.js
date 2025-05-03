const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Motorista = sequelize.define('Motorista', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnh: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ativo'
    }
}, {
    tableName: 'motoristas', // Nome da tabela no banco de dados
    timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = Motorista;