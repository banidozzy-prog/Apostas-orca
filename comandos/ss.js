const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ss',
    async execute(message, args) {
        // Verifica se é Mediador
        if (!message.member.roles.cache.some(r => r.name === 'Mediador')) return;

        const cargoAnalista = message.guild.roles.cache.find(r => r.name === 'Analista');
        
        const embed = new EmbedBuilder()
            .setTitle('🔍 | Nova solicitação!')
            .setColor('#FF9900')
            .setDescription(`**Solicitado Por:** ${message.author}\n**Status:** Aguardando Analista`);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('atender_ss').setLabel('Atender').setStyle(ButtonStyle.Success)
        );

        await message.channel.send({ content: `${cargoAnalista}`, embeds: [embed], components: [row] });
    }
};
