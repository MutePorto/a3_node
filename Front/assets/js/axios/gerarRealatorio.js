function formatarDataISO(dataISO) { // Função para formatar a data no formato "YYYY-MM-DD HH:mm:ss"
    return dataISO.replace('T', ' ').split('.')[0]; // ex: "2025-05-27 14:00:00"
}
let t = 0;
$('#gerarRelatorio').on('click', async () => {

    if (t == 1) {   // Verifica se já foi clicado
        $('#relatorios-datatables').DataTable().clear().destroy(); // Destrói a tabela existente para evitar conflitos
    }
    if (t == 0) { t = 1 }
    const motoristaId = document.getElementById('selectMotoristas').value;
    const carroId = document.getElementById('selectCarros').value;
    const dataInicial = document.getElementById('data_inicial').value;
    const dataFinal = document.getElementById('data_final').value;

    console.log('Motorista ID:', motoristaId);
    console.log('Carro ID:', carroId);
    console.log('Data Inicial:', dataInicial);
    console.log('Data Final:', dataFinal);


    if (new Date(dataInicial) > new Date(dataFinal)) {  // Verifica se a data inicial é menor que a data final
        console.log('Data inicial é menor que a data final');
        swal({
            title: "Erro",
            text: "A data inicial não pode ser maior que a data final.",
            icon: "warning",
            buttons: {
                confirm: {
                    className: "btn btn-danger",
                },
            },
        });

        return;
    }
    // Limpar tabela
    const tbody = document.getElementById('body-table-relatorios');
    const tthead = document.getElementById('thead-table-relatorios');
    tthead.innerHTML = '';
    tbody.innerHTML = '';

    try {
        let endpoint = '';
        let response;

        if (motoristaId && carroId && dataInicial && dataFinal) {
            endpoint = `relatorios/motorista/${motoristaId}/carro/${carroId}/${dataInicial}/${dataFinal}`;
        } else if (motoristaId && dataInicial && dataFinal) {
            endpoint = `relatorios/motorista/${motoristaId}/${dataInicial}/${dataFinal}`;
        } else if (carroId && dataInicial && dataFinal) {
            endpoint = `relatorios/carro/${carroId}/${dataInicial}/${dataFinal}`;
        } else if (motoristaId && carroId && dataInicial) {
            endpoint = `relatorios/motorista/${motoristaId}/carro/${carroId}/data/${dataInicial}`;
        } else if (motoristaId && dataInicial) {
            endpoint = `relatorios/motorista/${motoristaId}/data/${dataInicial}`;
        } else if (carroId && dataInicial) {
            endpoint = `relatorios/carro/${carroId}`;
            swal({
                title: "Atenção",
                text: "Você selecionou apenas um carro e data inicial. O relatório foi gerado para todas as datas desse carro. Se precisar de um intervalo, selecione uma data final, ou utilize o filtro dinâmico da tabela gerada.",
                icon: "info",
                buttons: {
                    confirm: {
                        className: "btn btn-info",
                    },
                },
            });
        } else if (motoristaId && carroId) {
            endpoint = `relatorios/motorista/${motoristaId}/carro/${carroId}`;
        } else if (dataInicial && dataFinal) {
            endpoint = `relatorios/intervalo/${dataInicial}/${dataFinal}`;
        } else if (motoristaId) {
            endpoint = `relatorios/motorista/${motoristaId}`;
        } else if (carroId) {
            endpoint = `relatorios/carro/${carroId}`;
        } else if (dataInicial) {
            endpoint = `relatorios/data/${dataInicial}`;
        } else if (dataFinal) {
            endpoint = `relatorios/data/${dataFinal}`;
        } else {
            endpoint = `relatorios`
        }
        console.log('Endpoint:', endpoint);
        // Exibe botão de carregamento
        $('#gerarRelatorio').removeClass('btn-success').addClass('btn-warning').html('<i class="fa fa-spinner fa-spin"></i> Gerando Relatório...');

        response = await axios.get(url + endpoint);

        if (response.data.length === 0) {
            t = 0; // Reseta o contador para permitir novas consultas
            tbody.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum dado encontrado.</td></tr>`;
        } else {
            if (!motoristaId && carroId) {

                tthead.innerHTML = `
            <tr>                
                <th>Veiculo</th>
                <th>Data inicial</th>
                <th>Data Final</th>
                <th>km inicial</th>
                <th>km Final</th>
            </tr>
            `;

                response.data.forEach(evento => {
                    let dataInicialIso = formatarDataISO(evento['Evento.data_inicial']);
                    let dataFinalIso = 'em andamento'; // Valor padrão para data final
                    if (evento['Evento.data_final']) {
                        dataFinalIso = formatarDataISO(evento['Evento.data_final']);
                    }
                    tbody.innerHTML += `
              <tr>                
                <td>${evento['carro.marca'] || '---'} ${evento['carro.modelo'] || '---'}</td>
                <td>${dataInicialIso}</td>
                <td>${dataFinalIso}</td>
                <td>${evento['Evento.km_inicial'] || '---'}</td>
                <td>${evento['Evento.km_final'] || '---'}</td>                
              </tr>
            `;
                });
            } else {
                tthead.innerHTML = `
            <tr>  
                <th>Motorista</th>              
                <th>Veiculo</th>
                <th>Data inicial</th>
                <th>Data Final</th>
                <th>km inicial</th>
                <th>km Final</th>
            </tr>
            `;

                response.data.forEach(evento => {
                    let dataInicialIso = formatarDataISO(evento['Evento.data_inicial']);
                    let dataFinalIso = 'em andamento'; // Valor padrão para data final
                    if (evento['Evento.data_final']) {
                        dataFinalIso = formatarDataISO(evento['Evento.data_final']);
                    }
                    tbody.innerHTML += `
              <tr>
                <td>${evento['motorista.nome'] || '---'}</td>                
                <td>${evento['carro.marca'] || '---'} ${evento['carro.modelo'] || '---'}</td>
                <td>${dataInicialIso}</td>
                <td>${dataFinalIso}</td>
                <td>${evento['Evento.km_inicial'] || '---'}</td>
                <td>${evento['Evento.km_final'] || '---'}</td>                
              </tr>
            `;
                });
            }

            $("#relatorios-datatables").DataTable({}); // Inicializa o DataTable após adicionar os dados


            console.log(response.data);
        }

        // Restaura o botão
        $('#gerarRelatorio').addClass('btn-success').removeClass('btn-warning').html('<i class="fa fa-check"></i> GERAR');

    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        swal({
            title: "Consulta não disponível",
            text: "Não foi possivel gerar essa consulta. Se preferir limpe todos os campos para uma consulta geral e utilize o filtro dinâmico da tabela gerada.",
            icon: "error",
            buttons: {
                confirm: {
                    className: "btn btn-danger",
                },
            },
        });
        // Restaura o botão
        $('#gerarRelatorio').addClass('btn-success').removeClass('btn-warning').html('<i class="fa fa-check"></i> GERAR');
    }

})

function receberDados() {

    const selectMotoristas = document.getElementById('selectMotoristas');
    const selectCarros = document.getElementById('selectCarros');

    axios.get(url + 'motoristas/') // Faz uma requisição GET para buscar os motoristas
        .then(function (response) {
            selectMotoristas.innerHTML = '<option value="">Selecione um motorista</option>';
            response.data.forEach(function (motorista) {
                selectMotoristas.innerHTML += `<option value="${motorista.id}">${motorista.nome}</option>`;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar motoristas:', error);
        })

        .then(function () {
            axios.get(url + 'carros') // Faz uma requisição GET para buscar os carros
                .then(function (response) {
                    selectCarros.innerHTML = '<option value="">Selecione um carro</option>';
                    response.data.forEach(function (carro) {
                        selectCarros.innerHTML += `<option value="${carro.id}">${carro.modelo}</option>`;
                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar carros:', error);
                });
        });
}

receberDados(); // Chama a função para preencher os selects ao carregar a página

