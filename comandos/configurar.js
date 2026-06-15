module.exports = {
    name: 'configurar',
    async execute(message, args) {
        if (!message.member.permissions.has('Administrator')) return message.reply('❌ Você não tem permissão.');

        // Exemplo: +configurar #canal-de-filas 1x1-Mobile
        const canal = message.mentions.channels.first();
        const nomeFila = args[1];

        if (!canal || !nomeFila) {
            return message.reply('Uso correto: `+configurar #canal nome-da-fila`');
        }

        // Aqui o bot salva essa config no arquivo JSON (banco de dados)
        // O bot vai "entender" que toda vez que alguém pedir uma fila, ela abre nesse canal.
        message.reply(`✅ Configurado! Filas de **${nomeFila}** serão enviadas em ${canal}`);
    }
};

