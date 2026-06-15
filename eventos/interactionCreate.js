// Dentro do seu evento interactionCreate.js
if (interaction.isButton()) {
    const [action, tipo, valor] = interaction.customId.split('_');
    const embed = interaction.message.embeds[0];
    
    // Filtra jogadores e remove quem saiu
    let lista = embed.description.split('\n').slice(1).filter(j => j !== 'Nenhum jogador na fila.');

    if (action === 'entrar') {
        if (!lista.includes(`<@${interaction.user.id}>`)) lista.push(`<@${interaction.user.id}>`);
    } else if (action === 'sair') {
        lista = lista.filter(j => j !== `<@${interaction.user.id}>`);
    }

    const novoEmbed = EmbedBuilder.from(embed)
        .setDescription(`Jogadores:\n${lista.length > 0 ? lista.join('\n') : 'Nenhum jogador na fila.'}`);

    await interaction.update({ embeds: [novoEmbed] });
}
// Parte do Modal no interactionCreate
if (interaction.isButton() && interaction.customId === 'atender_ss') {
    const modal = new ModalBuilder().setCustomId('modal_laudo').setTitle('Laudo do Analista');
    const input = new TextInputBuilder()
        .setCustomId('texto_laudo')
        .setLabel('Resultado da análise:')
        .setStyle(TextInputStyle.Paragraph);
        
    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
}

if (interaction.isModalSubmit() && interaction.customId === 'modal_laudo') {
    const laudo = interaction.fields.getTextInputValue('texto_laudo');
    await interaction.reply({ content: `✅ **Laudo enviado:** ${laudo}` });
}
