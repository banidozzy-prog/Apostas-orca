module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // Ignora mensagens de bots e mensagens que não começam com o prefixo '+'
        if (message.author.bot || !message.content.startsWith('+')) return;

        // Separa o comando dos argumentos
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Busca o comando na nossa collection (carregada no index.js)
        const command = client.commands.get(commandName);

        // Se o comando não existir, ignora
        if (!command) return;

        try {
            // Executa o comando
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('❌ Houve um erro ao tentar executar esse comando!');
        }
    }
};

