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
        html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        .card {
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 3px solid #000000;
            border-radius: 0.25rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .card-secondary {
            border-top: 3px solid #6c757d;
            /* Cor "secondary" do Bootstrap */
        }

        .bg-secondary-gradient {
            background: linear-gradient(90deg, #6500fd 0%, #ffffff 100%);
            color: #fff;
        }

        p {
            font-size: 30px;
            text-align: center;
            text-decoration: none
        }

        p.footer {
            font-size: 20px;
            text-align: center;
            color: #7e0404;
        }
        a {
            text-decoration: none;
            text-decoration-color: #7e0404;
        }
    </style>
</head>

<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <div class="card card-secondary bg-secondary-gradient"
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #cce0ff; border-radius: 8px; padding: 20px;">
        <h1 style="color: #ffffff; text-align: center;">Bem-vindo ao sistema A3 Admin</h1>
        <hr style="border: 1px solid #cce0ff; margin: 20px 0;">
        <p><strong style=" color: #ffffff;">Email:</strong> <span style="color: #1e90ff;"><b>${email}</b></span></p>
        <p><strong style="color: #ffffff;">Senha:</strong> <span style="color: #1e90ff;"><b>${senha}</b></span></p>
        <p class="footer">Por favor, trocar a senha no primeiro acesso.
        </p>
    </div>
</body>

</html>`

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


