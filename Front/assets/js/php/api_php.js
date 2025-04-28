const url = "https://lightgrey-louse-782029.hostingersite.com/"

const res = document.getElementById('res')

function getUser() {

    $.ajax({
        url: `${url}getUser.php`,
        method: 'POST',
        success: (dados) => {
            console.log(dados)
            var nomes = JSON.parse(dados)
            console.log(nomes.length)

            for (let index = 0; index < nomes.length; index++) {
                document.querySelector('#res').innerHTML += '<label>' + nomes[index]['nome'] + '</label>'
            }
        }
    })
}

getUser();

$('#btn').click(() => { // Insere um novo usuario no banco de dados
    let nomev = document.getElementById('nome').value
    let senhav = document.getElementById('senha').value
    let emailv = document.getElementById('email').value

    $.ajax({
        url: `${url}insertUser.php`,
        method: 'POST',
        data: { nome: nomev, senha: senhav, email: emailv },
        dataType: 'json'
    }).done(function (result) {
        console.log(result)
    })
})