module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // Se não for um botão, o bot ignora
        if (!interaction.isButton()) return;

        const { customId } = interaction;

        // Aqui você cria a lógica de cada botão
        if (customId === 'atender_ss') {
            await interaction.reply({ content: '✅ Você atendeu o chamado!', ephemeral: true });
        } 
        else if (customId === 'ver_pix') {
            await interaction.reply({ content: '💳 **Chave PIX:** XXX.XXX.XXX-XX', ephemeral: true });
        }
        else if (customId === 'finalizar_aposta') {
            await interaction.reply({ content: '🏁 Aposta finalizada!', ephemeral: true });
        }
    }
};
