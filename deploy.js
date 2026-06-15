const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const token = 'SEU_TOKEN_AQUI';
const clientId = 'SEU_CLIENT_ID_AQUI';

const commands = [];
const commandFiles = fs.readdirSync('./barra').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./barra/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🔄 Registrando comandos Slash...');
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('✅ Todos os comandos Slash foram registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();
