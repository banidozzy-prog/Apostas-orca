module.exports = {
    name: 'clientReady', 
    once: true,
    async execute(client) {
        console.log(`✅ Bot conectado como ${client.user.tag}!`);
        
        client.user.setPresence({
            activities: [{ name: 'Gerenciando Apostas ORCA', type: 0 }],
            status: 'online',
        });
    }
};
