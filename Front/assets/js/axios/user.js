const url = "http://localhost:3000/" // URL do servidor

const bt = document.getElementById('body-table-user') // ID da tabela onde os dados serão exibidos

function getUser() { // Função para obter os dados do servidor    
    bt.innerHTML = '';
    axios.get(url) // Fazendo uma requisição GET para o servidor
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console
            console.log(dados.length) // Exibindo o tamanho dos dados no console

            // Criando o cabeçalho da tabela

            for (let index = 0; index < dados.length; index++) {
                bt.innerHTML += '<tr><td>' + dados[index]['nome'] +
                    '</td><td>' + dados[index]['senha'] +
                    '</td><td>' + dados[index]['email'] + '</td></tr>'
            }
        })
        .catch(error => { console.log(error) })
}

getUser();