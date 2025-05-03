const url = "http://localhost:3000/" // URL do servidor

const bt = document.getElementById('body-table-motorista') // ID da tabela onde os dados serão exibidos

function getMotorista() { // Função para obter os dados do servidor    
    bt.innerHTML = '';
    axios.get(url + 'motoristas/getMotorista') // Fazendo uma requisição GET para o servidor
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console
            console.log(dados.length) // Exibindo o tamanho dos dados no console

            bt.innerHTML = '' // Limpa o conteúdo da tabela antes de adicionar novos dados
            // Criando o cabeçalho da tabela

            for (let index = 0; index < dados.length; index++) {
                bt.innerHTML += '<tr><td>' + dados[index]['nome'] +
                    '</td><td>' + dados[index]['cnh'] +
                    '</td><td>' + dados[index]['data_nascimento'] +
                    '</td><td>' + dados[index]['status'] +
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
            document.getElementById('qMotoristas').innerHTML = dados.length // Atualiza o contador de motoristas na tabela             
            $("#motorista-datatables").DataTable({}); // Inicializa o DataTable após adicionar os dados
        })
        .catch(error => { console.log(error) })
}

getMotorista();

function editMotorista(id) {
    console.log(id + ' edit')
}

function setMotorista() { // Função para adicionar um novo motorista
    const nome = document.getElementById('nome').value // Obtendo o valor do campo de nome
    const cnh = document.getElementById('cnh').value // Obtendo o valor do campo de CNH
    const data_nasc = document.getElementById('data_nasc').value // Obtendo o valor do campo de data de nascimento

    console.log(nome, cnh, data_nasc) // Exibindo os valores no console

    axios.post(url + 'motoristas/setMotorista', { nome: nome, cnh: cnh, data_nascimento: data_nasc }) // Fazendo uma requisição POST para adicionar um novo motorista
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Novo motorista cadastrado ${nome.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#cnh').val(""); // Limpa o campo de CNH
                    $('#data_nasc').val(""); // Limpa o campo de data de nascimento
                    $('#motorista-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getMotorista() // Atualiza a tabela após a adição
                });


        })
        .catch(error => { console.log(error) }) // Exibindo erros no console
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