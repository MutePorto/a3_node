if (sessionStorage.getItem('token') == null) {
    window.location.href = "index.html";
} else {

    document.querySelectorAll('.nomeUser').forEach(function (element) {
        element.innerHTML = sessionStorage.getItem('nome').toUpperCase();
    });
    document.getElementById('emailUser').innerHTML = sessionStorage.getItem('email');
    document.getElementById('dataCad').innerHTML = sessionStorage.getItem('dataAt').replace('T', ' ').split('.')[0];
    document.body.style.display = 'block';
}

$('#formSenha').on('submit', function (e) { // Função para enviar o formulário de alteração de senha
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const reNovaSenha = document.getElementById('reNovaSenha').value;
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    const nome = sessionStorage.getItem('nome');
    console.log(token, senhaAtual, novaSenha, reNovaSenha);
    if (novaSenha !== reNovaSenha) {
        swal("As senhas não coincidem!", {
            icon: "error",
            buttons: {
                confirm: {
                    className: "btn btn-danger",
                },
            },
        });
        return;
    }

    axios.put(url + 'usuarios/senha', { senha: senhaAtual, novaSenha: novaSenha, email: email }) // Fazendo uma requisição para alterar a senha
        .then(response => { // Quando a requisição for bem-sucedida
            console.log(response) // Exibindo a resposta no console

            swal(`Senha alterada sucesso`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            })
                .then(() => {
                    $('#senhaAtual').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#novaSenha').val(""); // Limpa o campo de email
                    $('#reNovaSenha').val(""); // Limpa o campo de tipo
                });


        })
        .catch(error => {
            console.log(error)
            swal(`Erro ao alterar senha: ${error.response.data.error}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            })
                .then(() => {
                    $('#senhaAtual').val("").focus(); // Limpa o campo de nome e foca nele
                    $('#novaSenha').val(""); // Limpa o campo de email
                    $('#reNovaSenha').val(""); // Limpa o campo de tipo


                });
        })
}
);

function logout() {
    swal({
        title: "Tem certeza que deseja sair?",
        type: "warning",
        buttons: {
            confirm: {
                text: "Sim",
                className: "btn btn-success",
            },
            cancel: {
                visible: true,
                className: "btn btn-danger",
            },
        },
    }).then((Sair) => {
        if (Sair) {
            sessionStorage.clear();
            window.location.href = "index.html";
        } else {
            swal.close();
        }
    });
}