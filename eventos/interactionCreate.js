const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // 1. Responder a Slash Commands
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;
            try { await command.execute(interaction); } 
            catch (error) { console.error(error); }
        }

        // 2. Responder a Botões (Filas, Atender SS, Finalizar)
        else if (interaction.isButton()) {
            // Se for botão de fila, atende a lógica de lista
            if (interaction.customId.startsWith('entrar_') || interaction.customId.startsWith('sair_')) {
                // (Coloque aqui a lógica da fila que passei antes)
            }
            // Se for botão de "Atender SS"
            else if (interaction.customId === 'atender_ss') {
                // (Coloque aqui a lógica de abrir o Modal de Laudo)
            }
        }

        // 3. Responder a Modals (PIX, Regras da Partida, Laudo do SS)
        else if (interaction.type === InteractionType.ModalSubmit) {
            // (Coloque aqui o tratamento para o Modal de PIX ou Laudo)
        }
    }
};
