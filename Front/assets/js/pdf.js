function formatarData() {
    const fdata = new Date()

}

$('#gerar-pdf').click(() => {
    const nomeArquivo = prompt("Digite o nome do arquivo PDF:", "relatorio");
    if (!nomeArquivo) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    const table = $('#relatorios-datatables').DataTable(); // pegue a instância da DataTable

    const data = table.rows().data().toArray(); // pega todas as linhas (mesmo fora da página visível)
    const columns = table.columns().header().toArray().map(th => $(th).text());

    const rows = data.map(row => Object.values(row));

    doc.autoTable({
        head: [columns],
        body: rows,
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 20 },
        styles: {
            fontSize: 10,
            cellPadding: 2,
        },
        didDrawPage: function (data) {
            doc.setFontSize(14);
            doc.text('Relatório de Eventos', 14, 15);
        }
    });

    doc.save(`${nomeArquivo}.pdf`);
});

