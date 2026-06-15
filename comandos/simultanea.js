const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'simultanea',
    async execute(message, args) {
        // 1. Pega o ID da categoria que salvamos na configuração
        const categoriaId = await db.get(`config_categoria_id`);
        if (!categoriaId) return message.reply('❌ A categoria de apostas não foi configurada.');

        const categoria = message.guild.channels.cache.get(categoriaId);
        if (!categoria) return message.reply('❌ Categoria não encontrada no servidor.');

        // 2. Conta quantos canais existem dentro daquela categoria
        const partidasAtivas = categoria.children.cache.size;

        // 3. Cria o Embed com o resumo
        const embed = new EmbedBuilder()
            .setTitle('<:partidas:1514876230787141805> STATUS DAS PARTIDAS')
            .setDescription(`No momento, temos **${partidasAtivas}** partidas acontecendo simultaneamente.`)
            .setColor('#2b2d31')
            .setFooter({ text: 'Sistema ORCA - Partidas Simultâneas' });

        await message.reply({ embeds: [embed] });
    }
};

