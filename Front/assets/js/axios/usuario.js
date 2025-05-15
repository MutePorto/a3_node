
const url = "http://localhost:3000/" // URL do servidor

const btu = document.getElementById('body-table-usuario') // ID da tabela onde os dados serão exibidos
let senha = ""

function getUsuario() { // Função para obter os dados do servidor    
    btu.innerHTML = '';
    axios.get(url + 'usuarios') // Fazendo uma requisição GET para o servidor
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console
            console.log(dados.length) // Exibindo o tamanho dos dados no console

            btu.innerHTML = '' // Limpa o conteúdo da tabela antes de adicionar novos dados
            // Criando o cabeçalho da tabela

            for (let index = 0; index < dados.length; index++) {
                btu.innerHTML += '<tr><td>' + dados[index]['nome'] +
                    '</td><td>' + dados[index]['email'] +
                    '</td><td>' + dados[index]['tipo'] +
                    `<td>
                    <div class="w-50">
                        <button class="btn-link btn-primary" onclick="getUsuarioById(${dados[index]['id']})" data-bs-toggle="modal" href="#modalUsuario">
                        <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn-link btn-danger" onclick="deleteUsuario(${dados[index]['id']})">
                        <i class="fa fa-times"></i>
                        </button>
                    </div>
                    </td></tr>`
            }
            document.getElementById('qUsuarios').innerHTML = dados.length // Atualiza o contador de usuarios na tabela             
            $("#usuario-datatables").DataTable({}); // Inicializa o DataTable após adicionar os dados
        })
        .catch(error => { console.log(error) })
}

getUsuario();

function getUsuarioById(idu) { // Função para obter um usuario específico pelo ID
    console.log(idu + ' get')
    document.getElementById('edit-usuario').style.display = 'block' // Exibe o botão de editar usuario
    document.getElementById('send-form-usuario').style.display = 'none' // Exibe o botão de salvar usuario;
    axios.post(url + 'usuarios/id', { id: idu }) // Fazendo uma requisição POST para o servidor
        .then(response => { // Quando a requisição for bem-sucedida

            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console

            $('#idUsuario').val(dados.id) // Preenchendo o campo de ID com os dados do usuario
            $('#nome').val(dados.nome) // Preenchendo o campo de nome com os dados do usuario
            $('#email').val(dados.email) // Preenchendo o campo de email com os dados do usuario
            $('#tipo').val(dados.tipo) // Preenchendo o campo de tipo com os dados do usuario
            senha = dados.senha

        })
        .catch(error => { console.log(error.message) })
}

function editUsuario() { // Função para editar um usuario
    const idu = document.getElementById('idUsuario').value // Obtendo o valor do campo de ID
    const nome = document.getElementById('nome').value // Obtendo o valor do campo de nome
    const email = document.getElementById('email').value // Obtendo o valor do campo de email  
    console.log(idu, nome, email) // Exibindo os valores no console

    axios.put(url + 'usuarios/', { id: idu, nome: nome, email: email, senha: senha }) // Fazendo uma requisição POST para editar o usuario
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Usuario editado com sucesso ${nome.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#usuario-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getUsuario() // Atualiza a tabela após a edição
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao editar usuario: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#email').val(""); // Limpa o campo de email
                    $('#tipo').val(""); // Limpa o campo de tipo


                });
        })
}

function setUsuario() { // Função para adicionar um novo usuario
    const nome = document.getElementById('nome').value // Obtendo o valor do campo de nome
    const email = document.getElementById('email').value // Obtendo o valor do campo de email


    console.log(nome, email) // Exibindo os valores no console

    axios.post(url + 'usuarios/', { nome: nome, email: email }) // Fazendo uma requisição POST para adicionar um novo usuario
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Novo usuario cadastrado ${nome.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#email').val(""); // Limpa o campo de email
                    $('#tipo').val(""); // Limpa o campo de tipo
                    $('#modalUsuario').modal('hide')
                    $('#usuario-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getUsuario() // Atualiza a tabela após a adição
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao cadastrar novo usuario: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#nome').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#email').val(""); // Limpa o campo de email
                    $('#tipo').val(""); // Limpa o campo de tipo


                });
        })
}

function deleteUsuario(idu) { // Função para deletar um usuario
    console.log(idu + ' delete')
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
                axios.delete(url + 'usuarios/', { data: { id: idu } }) // Fazendo uma requisição DELETE para o servidor
                    .then(response => { // Quando a requisição for bem-sucedida
                        console.log(response) // Exibindo a resposta no console
                        swal(`Usuario deletado com sucesso`, {
                            icon: "success",
                            buttons: {
                                confirm: {
                                    className: "btn btn-success",
                                },
                            },
                        })
                        $('#usuario-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                        getUsuario() // Atualiza a tabela após a deleção
                    })
                    .catch(error => { console.log(error.message) }) // Exibindo erros no console
            } else {
                swal("Deleção cancelada!"); // Mensagem de cancelamento
            }
        });
}