const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configurar_filas')
        .setDescription('Cria o painel de fila')
        .addStringOption(o => o.setName('tipo').setDescription('Ex: 2x2 Mobile').setRequired(true))
        .addStringOption(o => o.setName('valor').setDescription('Ex: R$ 5,00').setRequired(true)),
    async execute(interaction) {
        const tipo = interaction.options.getString('tipo');
        const valor = interaction.options.getString('valor');

        const embed = new EmbedBuilder()
            .setTitle(`${tipo} | ${valor}`)
            .setDescription('Jogadores:\nNenhum jogador na fila.')
            .setColor('#2b2d31');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`entrar_${tipo}_${valor}`).setLabel('Entrar').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`sair_${tipo}_${valor}`).setLabel('Sair').setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
