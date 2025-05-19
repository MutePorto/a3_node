const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// Configuração do Nodemailer

const se = function sendEmail(email, senha) { // Função para enviar o email
    const transporter = nodemailer.createTransport({ // Configuração do transporte
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = { // Opções do email
        from: 'a3.project@tsdev.com.br',
        to: email,
        subject: 'Configuração de sistema',
        text: `Corpo do email em texto simples
    fazendo teste de linhas
    e mais linhas`,
        html: `<h1>Bem vindo ao sistema A3 Admin</h1><hr>
    <h2>Suas Credenciais</h2><p>email: <b>${email}</b></p><p>Senhs: <b>${senha}</b></p>`

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar email:', error);
        } else {
            console.log('Email enviado:', info.response);
        }
    });
}

module.exports = se;


