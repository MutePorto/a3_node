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


