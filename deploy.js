const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const commands = [];
// Lê todos os arquivos da pasta slash
const commandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./slash/${file}`);
    commands.push(command.data.toJSON());
}

// Configura a conexão com a API do Discord
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos...`);

        // Registra globalmente (pode levar alguns minutos para aparecer em todos os servidores)
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Comandos registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
})();
