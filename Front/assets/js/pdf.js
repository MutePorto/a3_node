function formatarData() {
    const fdata = new Date()

}

$('#gerar-pdf').click(() => {
    const nomeArquivo = prompt("Digite o nome do arquivo PDF:", "relatorio");

    if (!nomeArquivo) return; // Se o usuário cancelar ou não digitar nada, não gera o PDF

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    doc.autoTable({
        html: '#relatorios-datatables',
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 20 },
        styles: {
            fontSize: 10,
            cellPadding: 2,
        },
        didDrawPage: function (data) {
            doc.setFontSize(14);
            doc.text('Relatório de Dados', 14, 15);
        }
    });

    doc.save(`${nomeArquivo}.pdf`);
});
