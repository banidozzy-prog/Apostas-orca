const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('enviarpainel_pix').setDescription('Configura painel de PIX'),
    async execute(interaction) {
        const modal = new ModalBuilder().setCustomId('modal_pix').setTitle('Painel PIX');
        modal.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('chave').setLabel('Chave PIX').setStyle(TextInputStyle.Short)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('nome').setLabel('Nome').setStyle(TextInputStyle.Short)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('url').setLabel('URL Foto').setStyle(TextInputStyle.Short))
        );
        await interaction.showModal(modal);
    }
};
