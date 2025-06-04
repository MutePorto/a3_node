$('#gerarRelatorio').on('click', function () {
    console.log('gerarRelatorio');
    $('#gerarRelatorio').removeClass('btn-success');
    $('#gerarRelatorio').addClass('btn-warning');
    $('#gerarRelatorio').html('<i class="fa fa-spinner fa-spin"></i> Gerando Relatório...');
    setTimeout(function () {
        $('#gerarRelatorio').addClass('btn-success');
        $('#gerarRelatorio').removeClass('btn-warning');
        $('#gerarRelatorio').html('<i class="fa fa-check"></i> GERAR');

    }, 2000);

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

