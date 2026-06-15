const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Verifica a latência do bot'),
    
    async execute(interaction) {
        await interaction.reply({ content: `🏓 Pong! Latência: ${Date.now() - interaction.createdTimestamp}ms`, ephemeral: true });
    }
};

