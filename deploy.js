const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const clientId = 'SEU_CLIENT_ID_AQUI'; // Pegue no Portal de Desenvolvedores
const token = 'SEU_TOKEN_AQUI';

const commands = [];
const foldersPath = path.join(__dirname, 'slash');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos...`);
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('✅ Comandos registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();
