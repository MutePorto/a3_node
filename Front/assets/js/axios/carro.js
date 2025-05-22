//const url = "http://localhost:3000/" // URL do servidor

const btc = document.getElementById('body-table-carro') // ID da tabela onde os dados serão exibidos

function getCarro() { // Função para obter os dados do servidor    
    btc.innerHTML = '';
    axios.get(url + 'carros/') // Fazendo uma requisição GET para o servidor
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console
            console.log(dados.length) // Exibindo o tamanho dos dados no console

            btc.innerHTML = '' // Limpa o conteúdo da tabela antes de adicionar novos dados
            // Criando o cabeçalho da tabela

            for (let index = 0; index < dados.length; index++) {
                btc.innerHTML += '<tr><td>' + dados[index]['marca'] +
                    '</td><td>' + dados[index]['modelo'] +
                    '</td><td>' + dados[index]['kmAtual'] +
                    '</td><td>' + dados[index]['status'] +
                    `<td>
                    <div class="w-50">
                        <button class="btn-link btn-primary" onclick="getCarroById(${dados[index]['id']})" data-bs-toggle="modal" href="#modalCarros">
                        <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn-link btn-danger" onclick="deleteCarro(${dados[index]['id']})">
                        <i class="fa fa-times"></i>
                        </button>
                    </div>
                    </td></tr>`
            }
            document.getElementById('qCarros').innerHTML = dados.length // Atualiza o contador de carros na tabela             
            $("#cars-datatables").DataTable({}); // Inicializa o DataTable após adicionar os dados
        })
        .catch(error => { console.log(error) })
}

getCarro();

function getCarroById(idc) { // Função para obter um carro específico pelo ID
    console.log(idc + ' get')
    document.getElementById('edit-carro').style.display = 'block' // Exibe o botão de editar carro
    document.getElementById('send-form-carro').style.display = 'none' // Exibe o botão de salvar carro;
    axios.post(url + 'carros/id', { id: idc }) // Fazendo uma requisição POST para o servidor
        .then(response => { // Quando a requisição for bem-sucedida

            console.log(response) // Exibindo a resposta no console
            const dados = response.data // Armazenando os dados da resposta em uma variável
            console.log(dados)  // Exibindo os dados no console

            $('#idCarro').val(dados.id) // Preenchendo o campo de ID com os dados do carro
            $('#marca').val(dados.marca) // Preenchendo o campo de marca com os dados do carro
            $('#modelo').val(dados.modelo) // Preenchendo o campo de CNH com os dados do carro
            $('#kmAtual').val(dados.kmAtual) // Preenchendo o campo de data de nascimento com os dados do carro

        })
        .catch(error => { console.log(error.message) })
}

function editCarro() { // Função para editar um carro
    const idc = document.getElementById('idCarro').value // Obtendo o valor do campo de ID
    const marca = document.getElementById('marca').value // Obtendo o valor do campo de marca
    const modelo = document.getElementById('modelo').value // Obtendo o valor do campo de CNH
    const kmAtual = document.getElementById('kmAtual').value // Obtendo o valor do campo de data de nascimento
    const status = document.getElementById('status').value // Obtendo o valor do campo status   
    console.log(idc, marca, modelo, kmAtual, status) // Exibindo os valores no console

    axios.put(url + 'carros/', { id: idc, marca: marca, modelo: modelo, kmAtual: kmAtual, status: status }) // Fazendo uma requisição POST para editar o carro
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Carro editado com sucesso ${marca.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#modalCarros').modal('hide'); // Fecha o modal após o cadastro
                    $('#cars-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getCarro() // Atualiza a tabela após a edição
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao editar carro: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#marca').val("").focus(); // Limpa o campo de marca e foca nele
                    $('#modelo').val(""); // Limpa o campo de CNH
                    $('#kmAtual').val(""); // Limpa o campo de data de nascimento


                });
        })
}

function setCarro() { // Função para adicionar um novo carro
    const marca = document.getElementById('marca').value // Obtendo o valor do campo de marca
    const modelo = document.getElementById('modelo').value // Obtendo o valor do campo de CNH
    const kmAtual = document.getElementById('kmAtual').value // Obtendo o valor do campo de data de nascimento

    console.log(marca, modelo, kmAtual) // Exibindo os valores no console

    axios.post(url + 'carros/', { marca: marca, modelo: modelo, kmAtual: kmAtual }) // Fazendo uma requisição POST para adicionar um novo carro
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Novo carro cadastrado ${marca.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#modalCarros').modal('hide'); // Fecha o modal após o cadastro
                    $('#marca').val("").focus(); // Limpa o campo de marca e foca nele
                    $('#modelo').val(""); // Limpa o campo de CNH
                    $('#kmAtual').val(""); // Limpa o campo de data de nascimento
                    $('#cars-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                    getCarro() // Atualiza a tabela após a adição
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao cadastrar novo carro: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#marca').val("").focus(); // Limpa o campo de marca e foca nele
                    $('#modelo').val(""); // Limpa o campo de modelo
                    $('#kmAtual').val(""); // Limpa o campo de kmAtual


                });
        })
}

function deleteCarro(idc) { // Função para deletar um carro
    console.log(idc + ' delete')
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
                axios.delete(url + 'carros/', { data: { id: idc } }) // Fazendo uma requisição DELETE para o servidor
                    .then(response => { // Quando a requisição for bem-sucedida
                        console.log(response) // Exibindo a resposta no console
                        swal(`Carro deletado com sucesso`, {
                            icon: "success",
                            buttons: {
                                confirm: {
                                    className: "btn btn-success",
                                },
                            },
                        })
                        $('#cars-datatables').DataTable().clear().destroy(); // Limpa e destrói a tabela DataTable
                        getCarro() // Atualiza a tabela após a deleção
                    })
                    .catch(error => { console.log(error.message) }) // Exibindo erros no console
            } else {
                swal("Deleção cancelada!"); // Mensagem de cancelamento
            }
        });
}

