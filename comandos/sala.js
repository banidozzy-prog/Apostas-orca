const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'sala',
    async execute(message, args, client) {
        // Renomeia o canal
        await message.channel.setName('pagar-2,00');

        // Cria o botão
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ver_pix') // Este ID tem que ser igual ao do interactionCreate.js
                    .setLabel('Ver PIX')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('1513764622677573714') // ID do seu emoji PIX
            );

        message.reply({ 
            content: '✅ **Sala criada!** Clique no botão abaixo para ver os dados de pagamento:', 
            components: [row] 
        });
    }
};
