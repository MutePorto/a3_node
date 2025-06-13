# 💻 Projeto A3 – a3_node

Este é o repositório do **Projeto A3**, uma aplicação full‑stack que combina frontend e backend para entregar uma experiência web completa.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend
- HTML5
- CSS3
- JavaScript (ES6+)

### 🔸 Backend
- Node.js
- Express.js
- Sequelize (ORM para MySQL)
- MySQL2
- bcrypt (criptografia de senhas)
- JSON Web Token (autenticação JWT)
- dotenv (variáveis de ambiente)
- cors (controle de acesso)
- nodemailer (envio de emails)

## 📁 Estrutura Principal do Repositório

a3_node/
├── frontend/
| ├── assets/
│ ├── index.html
│ ├── home.html
│ |── perfil.html
| └── relatorios.html


├── backend/
│ ├── package-lock.json
│ ├── package.json
│ |── node_modules/
| └── src/
└── README.md

## 🚧 Funcionalidades Principais

- **Frontend**: interface responsiva com HTML, CSS e JavaScript puro.  
- **Backend**: servidor em Node.js, configurado via `index.js`, provendo rotas Express para comunicação com o frontend.

---

## 📌 Como executar localmente

1. Clone o repositório:
    ```bash
    git clone https://github.com/MutePorto/a3_node.git
    cd a3_node
    ```

2. Instale as dependências:
    ```bash
    cd backend
    npm install
    ```

4. 🔐 Configuração do Ambiente (.env)

    Este projeto utiliza variáveis de ambiente para armazenar informações sensíveis como credenciais de banco de dados e email.  
    Crie um arquivo chamado `.env` na pasta `backend/src/` com o seguinte conteúdo:

    ```env
    # Configurações do Banco de Dados
    DB_PORT= porta do seu banco de dados
    DB_HOST= host do seu banco de dados
    DB_USER= usuario do seu banco de dados
    DB_PASSWORD= senha do seu banco do dados
    DB_NAME= nome do banco de dados

    # Configurações de Email (para envio de notificações ou recuperação de senha, por exemplo)
    EMAIL_USER= Usuario de email
    EMAIL_PASS= senha do email
    Obs. Deve ser feita a configuração de SMTP no seu email para que o mesmo funcione.
 
5. Inicie o servidor:
    ```bash
    node index.js
    ```

6. Abra o frontend:
   - Acesse `frontend/index.html` no navegador.
   - Opcional: use extensão Live Server no VS Code para recarregamento automático.

---

## 🧠 Como funciona

- O frontend (`index.html`) envia requisições via JavaScript para o backend.
- O backend (Node.js + Express) trata essas requisições e responde com dados ou mensagens.
- Estrutura pensada para facilitar a expansão: novas rotas ou formulários podem ser facilmente adicionados.

---

## 💡 Licença

Distribuído sob a licença **MIT**.

---
Feito por

- [MutePorto](https://github.com/MutePorto)
- [Carlos-CesarP](https://github.com/Carlos-CesarP)
- [Modesxto](https://github.com/Modesxto)
           

