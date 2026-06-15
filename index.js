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

client.commands = new Collection();
client.slashCommands = new Collection();

// Carregar Slash Commands
const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
for (const file of slashFiles) {
    const command = require(`./slash/${file}`);
    client.slashCommands.set(command.data.name, command);
}

// Carregar Comandos de Prefixo (+ss, +b, +sw)
const cmdFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

// Carregar Eventos (interactionCreate, messageCreate)
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./eventos/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client));
}

client.login('SEU_TOKEN_AQUI');
