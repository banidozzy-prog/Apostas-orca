module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // Ignora mensagens de outros bots ou que não começam com o prefixo '!'
        if (message.author.bot || !message.content.startsWith('!')) return;

        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Procura o comando na coleção que o index.js carregou
        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            // Executa o comando
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('Houve um erro ao tentar executar esse comando!');
        }
    }
};
