module.exports = {
    name: 'b',
    async execute(message, args, client) {
        message.channel.send('🚫 **Blacklist:** Jogador adicionado com sucesso!');
    }
};
