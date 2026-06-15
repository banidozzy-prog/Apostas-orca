const { SlashCommandBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configurar_aposta')
        .setDescription('Configura taxas e categorias')
        .addNumberOption(o => o.setName('taxa').setDescription('Taxa ADM').setRequired(true)),
    async execute(interaction) {
        await db.set('taxa_adm', interaction.options.getNumber('taxa'));
        await interaction.reply({ content: '✅ Taxa configurada!', ephemeral: true });
    }
};
