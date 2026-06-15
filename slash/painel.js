const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fila')
        .setDescription('Cria um painel de fila')
        .addStringOption(option => option.setName('modalidade').setDescription('Ex: 1x1 Mobile').setRequired(true))
        .addStringOption(option => option.setName('valor').setDescription('Ex: R$ 5,00').setRequired(true)),
    async execute(interaction) {
        const modalidade = interaction.options.getString('modalidade');
        const valor = interaction.options.getString('valor');

        const embed = new EmbedBuilder()
            .setTitle(`<:sala:1513246424320577586> ${modalidade} | ${valor}`)
            .setDescription('Jogadores:\nNenhum jogador na fila.')
            .setColor('#2b2d31');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('entrar_fila').setLabel('Entrar').setEmoji('1514854758693863424').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('sair_fila').setLabel('Sair').setEmoji('1514511377958441076').setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
