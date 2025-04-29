require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./config/sequelize');
const User = require('./models/Users');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🔥 Back-end rodando com Sequelize!');
});

const PORT = process.env.PORT || 3306;

app.listen(PORT,()=>{
    console.log('Servidor rodando na porta ' + PORT)
})