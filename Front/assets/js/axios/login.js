
const url = "http://localhost:3000/" // URL do servidor


$('#form').on('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const formData = {
        email: $('#email').val(),
        senha: $('#senha').val()
    };
    console.log(formData);

    axios.post(url + 'auth/login', formData)
        .then(function (response) {
            const dados = response.data;
            sessionStorage.setItem('token', dados.token);
            sessionStorage.setItem('nome', dados.nome);

            swal(`Seja bem vindo ${dados.nome.toUpperCase()}`, {
                icon: "success",
                buttons: {
                    confirm: {
                        className: "btn btn-success",
                    },
                },
            }).then(() => {
                window.location.href = 'home.html';
            });

        })
        .catch(function (error) {
            console.error(error);
            swal("Usuario e/ou senha incorretos", {
                icon: "error",
                buttons: {
                    confirm: {
                        className: "btn btn-danger",
                    },
                },
            }).then(() => {
                $('#email').val("").focus();
                $('#senha').val("");
            });
        });
})
