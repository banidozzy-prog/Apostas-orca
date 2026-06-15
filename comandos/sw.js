module.exports = {
    name: 'sw',
    async execute(message, args, client) {
        message.channel.send('📊 **Painel de Resultados:**\nEscolha o resultado da partida abaixo:', {
            // Aqui você adicionaria os componentes (botões) depois
        });
    }
};
