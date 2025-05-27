
async function buscarDisponiveis() {
    try {
        const response = await axios.get(url + 'eventos/disponiveis');
        const { motoristas, carros } = response.data;

        console.log('Motoristas disponíveis:', motoristas);
        console.log('Carros disponíveis:', carros);
    } catch (error) {
        console.error('Erro ao buscar disponíveis:', error.response?.data || error.message);
    }
}
