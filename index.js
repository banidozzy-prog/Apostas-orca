const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();
client.slash = new Collection();

// Carregar pastas de forma simplificada
const folders = ['comandos', 'slash', 'eventos'];

for (const folder of folders) {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) continue;
    
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const item = require(filePath);
        
        if (folder === 'comandos') client.commands.set(item.name, item);
        else if (folder === 'slash') client.slash.set(item.data.name, item);
        else if (folder === 'eventos') {
            if (item.once) client.once(item.name, (...args) => item.execute(...args, client));
            else client.on(item.name, (...args) => item.execute(...args, client));
        }
    }
}

// Escutar Slash Commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.slash.get(interaction.commandName);
    if (command) {
        try { await command.execute(interaction); } 
        catch (error) { console.error(error); }
    }
});

client.login(process.env.TOKEN);
