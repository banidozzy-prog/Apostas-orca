module.exports = {
    name: 'clientReady', // Nome atualizado para evitar avisos de depreciação
    once: true, // Garante que o bot só execute isso uma vez ao ligar
    async execute(client) {
        console.log(`✅ Bot conectado como ${client.user.tag}!`);
        
        // Define o status do bot para ficar com cara de sistema oficial
        client.user.setPresence({
            activities: [{ name: 'Gerenciando Apostas ORCA', type: 0 }], // 0 = Jogando
            status: 'online',
        });

        // Opcional: Verificação de banco de dados
        console.log(`📡 Sistema pronto para operar em ${client.guilds.cache.size} servidor(es).`);
    }
};
