if (sessionStorage.getItem('token') == null) {
    window.location.href = "index.html";
} else {

    //document.getElementById('nomeUser').innerHTML = sessionStorage.getItem('nome').toUpperCase();
    document.querySelectorAll('.nomeUser').forEach(function (element) {
        element.innerHTML = sessionStorage.getItem('nome').toUpperCase();
    });
    document.getElementById('emailUser').innerHTML = sessionStorage.getItem('email');
    document.getElementById('dataCad').innerHTML = sessionStorage.getItem('dataAt');
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