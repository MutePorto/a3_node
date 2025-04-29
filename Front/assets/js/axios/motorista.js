const url = "https://lightgrey-louse-782029.hostingersite.com/" // URL do servidor

const bt = document.getElementById('body-table-motorista') // ID da tabela onde os dados serão exibidos

function getUser() { // Função para obter os dados do servidor    
    bt.innerHTML = '';
    axios.get(url + 'getUser.php') // Fazendo uma requisição GET para o servidor
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console
            console.log(dados.length) // Exibindo o tamanho dos dados no console

            bt.innerHTML = '' // Limpa o conteúdo da tabela antes de adicionar novos dados
            // Criando o cabeçalho da tabela

            for (let index = 0; index < dados.length; index++) {
                bt.innerHTML += '<tr><td>' + dados[index]['nome'] +
                    '</td><td>' + dados[index]['senha'] +
                    '</td><td>' + dados[index]['email'] +
                    '</td><td>' + dados[index]['email'] +
                    `<td>
                    <div class="w-50">
                        <button class="btn-link btn-primary" onclick="editUser(${dados[index]['id']})">
                        <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn-link btn-danger" onclick="deleteUser(${dados[index]['id']})">
                        <i class="fa fa-times"></i>
                        </button>
                    </div>
                    </td></tr>`
            }
        })
        .catch(error => { console.log(error) })
}

getUser();