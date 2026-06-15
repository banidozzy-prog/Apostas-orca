const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Collections para organizar tudo
client.commands = new Collection();
client.slash = new Collection();

// 1. Carregador de Comandos (!)
const cmdPath = path.join(__dirname, 'comandos');
fs.readdirSync(cmdPath).forEach(file => {
    if (file.endsWith('.js')) {
        const cmd = require(`./comandos/${file}`);
        client.commands.set(cmd.name, cmd);
    }
});

// 2. Carregador de Eventos (O cérebro do bot)
const eventPath = path.join(__dirname, 'eventos');
fs.readdirSync(eventPath).forEach(file => {
    if (file.endsWith('.js')) {
        const event = require(`./eventos/${file}`);
        // O bot escuta os eventos (interactionCreate, messageCreate, etc)
        client.on(event.name, (...args) => event.execute(...args, client));
    }
});

// Conexão usando a variável de ambiente do ShardCloud (Visibility)
// Exemplo: process.env.TOKEN_DO_BOT (nome que você definiu no painel)
client.login(process.env.TOKEN);
