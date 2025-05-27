function getEventos() {

    axios.get(url + 'eventos')
        .then(response => {
            function formatarDataISO(dataISO) {
                return dataISO.replace('T', ' ').split('.')[0]; // ex: "2025-05-27 14:00:00"
            }
            const eventos = response.data; // Armazena os dados da resposta em uma variável
            const tabelaEventos = document.getElementById('body-table-evento'); // ID da tabela onde os dados serão exibidos
            tabelaEventos.innerHTML = ''; // Limpa a tabela antes de preencher
            eventos.forEach(evento => {
                const dataInicial = formatarDataISO(evento.data_inicial);
                const dataFinal = evento.data_final ? formatarDataISO(evento.data_final) : 'Em andamento';

                if (!evento.data_final) {
                    tabelaEventos.innerHTML += `
                    <tr class="table-warning">                        
                        <td>${evento.motorista.nome}</td>
                        <td>${evento.carro.marca} ${evento.carro.modelo}</td>
                        <td>${dataInicial}</td>
                        <td>${dataFinal}</td>                        
                        <td>
                        <div class="w-50">
                            <button class="btn-link btn-primary" onclick="editarEvento(${evento.id})"><i class="fa fa-edit"></i></button>
                            <button class="btn-link btn-danger" onclick="deletarEvento(${evento.id})"><i class="fa fa-times"></i></button>
                        </div>
                        </td>
                    </tr>
                `;
                } else {
                    tabelaEventos.innerHTML += `
                    <tr>                        
                        <td>${evento.motorista.nome}</td>
                        <td>${evento.carro.marca} ${evento.carro.modelo}</td>
                        <td>${dataInicial}</td>
                        <td>${dataFinal}</td>                        
                        <td>
                        <div class="w-50">
                            <button class="btn-link btn-primary" onclick="editarEvento(${evento.id})"><i class="fa fa-edit"></i></button>
                            <button class="btn-link btn-danger" onclick="deletarEvento(${evento.id})"><i class="fa fa-times"></i></button>
                        </div>
                        </td>
                    </tr>
                `;
                }

            });
            $("#events-datatables").DataTable({}); // Inicializa o DataTable após adicionar os dados
        })
        .catch(error => {
            console.error('Erro ao buscar eventos:', error.response?.data || error.message);
            swal(`Erro ao buscar eventos: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            });
        });
}
getEventos(); // Chama a função para carregar os eventos ao iniciar a página

function preencherSelectsDisponiveis() {
    axios.get(url + 'eventos/disponiveis')
        .then(response => {
            const { motoristas, carros } = response.data;

            console.log('Motoristas disponíveis:', motoristas);
            console.log('Carros disponíveis:', carros);

            const selectMotoristas = document.getElementById('selectMotoristas');
            const selectCarros = document.getElementById('selectCarros');

            // Limpar selects
            selectMotoristas.innerHTML = '<option value="">Selecione um motorista</option>';
            selectCarros.innerHTML = '<option value="">Selecione um carro</option>';

            // Preencher motoristas
            motoristas.forEach(motorista => {
                selectMotoristas.innerHTML += `
                    <option value="${motorista.id}">
                        ${motorista.nome} 
                    </option>
                `;
            });

            // Preencher carros
            carros.forEach(carro => {
                selectCarros.innerHTML += `
                    <option value="${carro.id}">
                        ${carro.marca} ${carro.modelo}
                    </option>
                `;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar disponíveis:', error.response?.data || error.message);
        });
}

function receberKmAtual() {
    const selectCarros = document.getElementById('selectCarros').value; // Obtendo o valor do select de carros

    if (selectCarros) {
        axios.get(url + 'eventos/' + selectCarros)
            .then(response => {
                const carro = response.data;
                document.getElementById('km_inicial').value = carro.kmAtual;
            })
            .catch(error => {
                console.error('Erro ao buscar KM atual:', error.response?.data || error.message);
            });
    } else {
        document.getElementById('kmAtual').value = '';
    }
}

function setEvento() {
    const motoristaId = document.getElementById('selectMotoristas').value; // Obtendo o ID do motorista selecionado
    const carroId = document.getElementById('selectCarros').value; // Obtendo o ID do carro selecionado
    const data_inicial = document.getElementById('data_inicial').value; // Obtendo a data inicial
    const kmInicial = document.getElementById('km_inicial').value; // Obtendo o KM inicial


    if (!motoristaId || !carroId || !kmInicial || !data_inicial) {
        swal("Por favor, preencha todos os campos.", {
            icon: "warning",
            buttons: {
                confirm: {
                    className: "btn btn-warning",
                },
            },
        });
        return;
    }

    axios.post(url + 'eventos', { id_motorista: motoristaId, id_carro: carroId, km_inicial: kmInicial, data_inicial: data_inicial })
        .then(response => {
            console.log(response);
            swal(`Evento cadastrado com sucesso!`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    getEventos(); // Atualiza a lista de eventos
                    $('#modalEventos').modal('hide'); // Fecha o modal após o cadastro

                });
        })
        .catch(error => {
            console.error(error);
            swal(`Erro ao cadastrar evento: ${error.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            });
        });
}

function editarEvento() {
    console.log('Função de edição de evento ainda não implementada.');
}