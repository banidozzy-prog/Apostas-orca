const { REST, Routes } = require('discord.js');
const fs = require('fs');

const comandos = [];
const arquivos = fs.readdirSync('./barra').filter(file => file.endsWith('.js'));

for (const file of arquivos) {
    const command = require(`./barra/${file}`);
    comandos.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken('SEU_TOKEN_AQUI');

(async () => {
    try {
        console.log('🔄 Registrando comandos...');
        await rest.put(Routes.applicationCommands('SEU_CLIENT_ID'), { body: comandos });
        console.log('✅ Comandos registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();
