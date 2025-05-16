require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./config/sequelize');
const userRoutes = require('./routes/userRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const carroRoutes = require('./routes/carrosRoutes');
const eventosRoutes = require('./routes/eventosRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Back-end rodando com Sequelize!');
});

app.use('/usuarios', userRoutes);
app.use('/motoristas', motoristaRoutes);
app.use('/carros', carroRoutes);
app.use('/eventos', eventosRoutes);
app.use('/auth', authRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    return sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });