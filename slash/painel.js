const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('painel')
        .setDescription('Abre o painel de gerenciamento da Org'),
    async execute(interaction) {
        // Aqui você pode colocar o seu Embed profissional de painel
        await interaction.reply({ 
            content: '⚙️ **Painel de Controle da Org**\nSelecione uma opção abaixo:', 
            ephemeral: true 
        });
    }
};
