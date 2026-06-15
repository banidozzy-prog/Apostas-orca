// 1. Silenciar avisos de depreciação (Opcional, mantém o console limpo)
process.removeAllListeners('warning');

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

// 2. Configuração do Cliente com Intents necessários
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// 3. Inicializar Collections
client.comandos = new Collection();
client.slashCommands = new Collection();

// 4. Carregar Slash Commands (Pasta /barra)
const slashFiles = fs.readdirSync('./barra').filter(file => file.endsWith('.js'));
for (const file of slashFiles) {
    const command = require(`./barra/${file}`);
    client.slashCommands.set(command.data.name, command);
}

// 5. Carregar Comandos de Prefixo (Pasta /comandos)
const cmdFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const command = require(`./comandos/${file}`);
    client.comandos.set(command.name, command);
}

// 6. Carregar Eventos (Pasta /eventos)
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./eventos/${file}`);
    
    // Registra o evento de forma limpa
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// 7. Login do Bot
client.login('SEU_TOKEN_AQUI');
