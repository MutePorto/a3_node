# https://obfuscator.io/#code - ofuscator

Codigo do index.js

sessionStorage.clear();

$('#form').on('submit', function (e) {
    e.preventDefault();

    const nome = $('#nome').val();
    const senha = $('#senha').val();

    if (senha == "a" && nome == "marcos") {
        const token = gerarToken();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('nome', nome);
        swal(`Seja bem vindo ${nome.toUpperCase()}`, {
            icon: "success",
            buttons: {
                confirm: {
                    className: "btn btn-success",
                },
            },
        }).then(() => {
            window.location.href = 'home.html';
        });

    } else {
        swal("Usuario e/ou senha incorretos", {
            icon: "error",
            buttons: {
                confirm: {
                    className: "btn btn-danger",
                },
            },
        }).then(() => {
            $('#nome').val("").focus();
            $('#senha').val("");
        });
    }

})

function gerarToken(tamanho = 32) {
    const array = new Uint8Array(tamanho);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

_________________________________________________________________________

Codigo do home.js

if (sessionStorage.getItem('token') == null) {
    window.location.href = "index.html";
} else {
    document.getElementById('nomeUser').innerHTML = sessionStorage.getItem('nome').toUpperCase();
    document.body.style.display = 'block';
}

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
