module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // Se for um Slash Command
        if (interaction.isChatInputCommand()) {
            const command = client.slash.get(interaction.commandName);
            if (!command) return;
            try { await command.execute(interaction); } 
            catch (error) { console.error(error); }
        } 
        
        // Se for um clique num botão
        else if (interaction.isButton()) {
            if (interaction.customId === 'entrar_fila') {
                await interaction.reply({ content: 'Entraste na fila! <:corfimar:1514876230787141805>', ephemeral: true });
                // Aqui depois vamos ligar ao banco de dados para salvar o nome
            } else if (interaction.customId === 'sair_fila') {
                await interaction.reply({ content: 'Saíste da fila. <:cancelar:1514876408428494962>', ephemeral: true });
            }
        }
    }
};
