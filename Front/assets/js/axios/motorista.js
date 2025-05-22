const url = "http://localhost:3000/" // URL do servidor

const bt = document.getElementById('body-table-motorista') // ID da tabela onde os dados serão exibidos

function getMotorista() { // Função para obter os dados do servidor    
    bt.innerHTML = '';
    axios.get(url + 'motoristas/') // Fazendo uma requisição GET para o servidor
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
                        <button class="btn-link btn-primary" onclick="getMotoristaById(${dados[index]['id']})" data-bs-toggle="modal" href="#modalMotorista">
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

function getMotoristaById(id) { // Função para obter um motorista específico pelo ID
    console.log(id + ' get')
    document.getElementById('edit-motorista').style.display = 'block' // Exibe o botão de editar motorista
    document.getElementById('send-form-motorista').style.display = 'none' // Exibe o botão de salvar motorista;
    axios.post(url + 'motoristas/id', { id: id }) // Fazendo uma requisição POST para o servidor
        .then(response => { // Quando a requisição for bem-sucedida

            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console

            $('#idMotorista').val(dados.id) // Preenchendo o campo de ID com os dados do motorista
            $('#nome').val(dados.nome) // Preenchendo o campo de nome com os dados do motorista
            $('#cnh').val(dados.cnh) // Preenchendo o campo de CNH com os dados do motorista
            $('#data_nasc').val(dados.data_nascimento) // Preenchendo o campo de data de nascimento com os dados do motorista
            $('#status').val(dados.status) // Preenchendo o campo de status com os dados do motorista

        })
        .catch(error => { console.log(error.message) })
}

function editMotorista() { // Função para editar um motorista
    const id = document.getElementById('idMotorista').value // Obtendo o valor do campo de ID
    const nome = document.getElementById('nome').value // Obtendo o valor do campo de nome
    const cnh = document.getElementById('cnh').value // Obtendo o valor do campo de CNH
    const data_nasc = document.getElementById('data_nasc').value // Obtendo o valor do campo de data de nascimento
    const status = document.getElementById('status').value // Obtendo o valor do campo de status
    console.log(id, nome, cnh, data_nasc, status) // Exibindo os valores no console

    axios.put(url + 'motoristas/', { id: id, nome: nome, cnh: cnh, data_nascimento: data_nasc, status: status }) // Fazendo uma requisição POST para editar o motorista
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Motorista editado com sucesso ${nome.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#modalMotorista').modal('hide'); // Fecha o modal após o cadastro
                    $('#motorista-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getMotorista() // Atualiza a tabela após a edição
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao editar motorista: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#cnh').val(""); // Limpa o campo de CNH
                    $('#data_nasc').val(""); // Limpa o campo de data de nascimento


                });
        })
}

function setMotorista() { // Função para adicionar um novo motorista
    const nome = document.getElementById('nome').value // Obtendo o valor do campo de nome
    const cnh = document.getElementById('cnh').value // Obtendo o valor do campo de CNH
    const data_nasc = document.getElementById('data_nasc').value // Obtendo o valor do campo de data de nascimento
    const estado = document.getElementById('status').value // Obtendo o valor do campo de status

    console.log(nome, cnh, data_nasc, estado) // Exibindo os valores no console

    axios.post(url + 'motoristas/', { nome: nome, cnh: cnh, data_nascimento: data_nasc, status: estado }) // Fazendo uma requisição POST para adicionar um novo motorista
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
                    $('#modalMotorista').modal('hide'); // Fecha o modal após o cadastro
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#cnh').val(""); // Limpa o campo de CNH
                    $('#data_nasc').val(""); // Limpa o campo de data de nascimento
                    $('#motorista-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getMotorista() // Atualiza a tabela após a adição
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao cadastrar novo motorista: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#cnh').val(""); // Limpa o campo de CNH
                    $('#data_nasc').val(""); // Limpa o campo de data de nascimento


                });
        })
}

function deleteMotorista(id) { // Função para deletar um motorista
    console.log(id + ' delete')
    swal({
        title: "Tem certeza que deseja deletar?",
        icon: "warning",
        buttons: {
            confirm: {
                text: "Sim",
                className: "btn btn-danger",
            },
            cancel: {
                visible: true,
                className: "btn btn-info",
            },
        },
    })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(url + 'motoristas/', { data: { id: id } }) // Fazendo uma requisição DELETE para o servidor
                    .then(response => { // Quando a requisição for bem-sucedida
                        console.log(response) // Exibindo a resposta no console
                        swal(`Motorista deletado com sucesso`, {
                            icon: "success",
                            buttons: {
                                confirm: {
                                    className: "btn btn-success",
                                },
                            },
                        })
                        $('#motorista-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                        getMotorista() // Atualiza a tabela após a deleção
                    })
                    .catch(error => { console.log(error.message) }) // Exibindo erros no console
            } else {
                swal("Deleção cancelada!"); // Mensagem de cancelamento
            }
        });
}

