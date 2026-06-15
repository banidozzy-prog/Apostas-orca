module.exports = {
    name: 'simultanea',
    async execute(message, args, client) {
        // Emojis que você me passou
        const simultaneaEmoji = '<:simultnea:1514876848553725993>';
        const setaEmoji = '<:seta:1513765246781886645>';

        // Aqui você buscaria a contagem real no banco de dados do ShardCloud
        // Exemplo: const count = await db.get('salas_ativas');
        
        const count = 0; // Substitua pelo seu código de busca do banco

        message.reply({
            content: `${simultaneaEmoji} **Relatório de Salas Simultâneas**\n\n` +
                     `${setaEmoji} Salas ativas no momento: **${count}**\n` +
                     `${setaEmoji} Mediadores em plantão: **Carregando...**`
        });
    }
};
