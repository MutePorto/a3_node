const url = "http://localhost:3306/" // URL do servidor

const bt = document.getElementById('body-table-motorista') // ID da tabela onde os dados serão exibidos

function getMotorista() { // Função para obter os dados do servidor    
    bt.innerHTML = '';
    axios.get(url + 'usuarios') // Fazendo uma requisição GET para o servidor
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
                    '</td><td>' + dados[index]['tipo'] +
                    `<td>
                    <div class="w-50">
                        <button class="btn-link btn-primary" onclick="editMotorista(${dados[index]['id']})">
                        <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn-link btn-danger" onclick="deleteMotorista(${dados[index]['id']})">
                        <i class="fa fa-times"></i>
                        </button>
                    </div>
                    </td></tr>`
            }
        })
        .catch(error => { console.log(error) })
}

getMotorista();

function editMotorista(id) {
    console.log(id + ' edit')
}

function deleteMotorista(id) { // Função para deletar um usuário
    console.log(id + ' delete')
    // $.ajax({
    //     url: `${url}deleteUser.php`,
    //     method: 'POST',
    //     data: { id: id },
    //     dataType: 'json'
    // }).done(function (result) {
    //     console.log(result)
    //     getUser() // Atualiza a tabela após a exclusão
    // })
    //     .fail(function (error) {
    //         console.error('Erro ao deletar usuário:', error)
    //     })
}