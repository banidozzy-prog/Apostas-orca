// index.js corrigido (Sintaxe correta)
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.comandos = new Collection();
client.slashCommands = new Collection();

// Carregamento de comandos e eventos
const loadFiles = (dir) => {
    const files = fs.readdirSync(`./${dir}`).filter(file => file.endsWith('.js'));
    for (const file of files) {
        const item = require(`./${dir}/${file}`);
        if (dir === 'barra') client.slashCommands.set(item.data.name, item);
        else if (dir === 'comandos') client.comandos.set(item.name, item);
    }
};

loadFiles('barra');
loadFiles('comandos');

client.login('SEU_TOKEN_AQUI');
