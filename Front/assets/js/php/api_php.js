const url = "https://lightgrey-louse-782029.hostingersite.com/"

const bt = document.getElementById('body-table-motorista') // ID da tabela onde os dados serão exibidos

function getUser() {

    $.ajax({
        url: `${url}getUser.php`,
        method: 'POST',
        success: (dados) => {
            console.log(dados)
            let res = JSON.parse(dados)
            console.log(res.length)

            bt.innerHTML = '' // Limpa o conteúdo da tabela antes de adicionar novos dados

            // Criando o cabeçalho da tabela

            for (let index = 0; index < dados.length; index++) {
                bt.innerHTML += '<tr><td>' + res[index]['nome'] +
                    '</td><td>' + res[index]['senha'] +
                    '</td><td>' + res[index]['email'] +
                    '</td><td>' + res[index]['email'] +
                    `</td><td>
                    <div class="h-50 w-50">
                        <button onclick="${res[index]['id']}" class="btn-link btn-primary" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button onclick="${res[index]['id']}" class="btn-link btn-danger" data-original-title="Remove">
                            <i class="fa fa-times"></i>
                        </button>
                    </div></td></tr>`
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