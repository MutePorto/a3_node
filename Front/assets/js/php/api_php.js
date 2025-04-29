const url = "https://lightgrey-louse-782029.hostingersite.com/"

const btm = document.getElementById('body-table-motorista') // ID da tabela onde os dados serão exibidos

function getMotorista() {

    $.ajax({
        url: `${url}getUser.php`,
        method: 'POST',
        success: (dados) => { // Função para obter os dados do servidor
            let res = JSON.parse(dados)
            console.log(res.length)

            btm.innerHTML = '' // Limpa o conteúdo da tabela antes de adicionar novos dados

            // Criando o cabeçalho da tabela
            for (let index = 0; index < res.length; index++) {
                btm.innerHTML += '<tr><td>' + res[index]['nome'] +
                    '</td><td>' + res[index]['senha'] +
                    '</td><td>' + res[index]['email'] +
                    '</td><td>' + res[index]['email'] +
                    `<td>
                    <div class="w-50">
                        <button class="btn-link btn-primary" onclick="editMotorista(${res[index]['id']})">
                        <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn-link btn-danger" onclick="deleteMotorista(${res[index]['id']})">
                        <i class="fa fa-times"></i>
                        </button>
                    </div>
                    </td></tr>`
            }
        }
    })
}

getMotorista();

function editMotorista(id) {
    console.log(id + ' edit')
}

function deleteMotorista(id) { // Função para deletar um usuário
    console.log(id + ' delete')
    // $.ajax({
    //     url: `${url}deleteUser.php`,
    //     method: 'POST',
    //     data: { id: id },
    //     dataType: 'json'
    // }).done(function (result) {
    //     console.log(result)
    //     getUser() // Atualiza a tabela após a exclusão
    // })
    //     .fail(function (error) {
    //         console.error('Erro ao deletar usuário:', error)
    //     })
}

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