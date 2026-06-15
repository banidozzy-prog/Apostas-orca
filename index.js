// Blinda o terminal contra avisos de depreciação do Discord.js
process.removeAllListeners('warning');
process.on('warning', (warning) => {
    if (warning.name !== 'DeprecationWarning') console.warn(warning);
});

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

// Carregar Slash Commands (Pasta /barra)
const slashFiles = fs.readdirSync('./barra').filter(file => file.endsWith('.js'));
for (const file of slashFiles) {
    const command = require(`./barra/${file}`);
    client.slashCommands.set(command.data.name, command);
}

// Carregar Comandos de Prefixo (Pasta /comandos)
const cmdFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const command = require(`./comandos/${file}`);
    client.comandos.set(command.name, command);
}

// Carregar Eventos (Pasta /eventos)
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./eventos/${file}`);
    
    // Vincula o evento. Se for clientReady, usa o nome correto para evitar avisos
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login('SEU_TOKEN_AQUI');
