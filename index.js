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

// Collections para comandos e slash commands
client.commands = new Collection();
client.slash = new Collection();

// --- 1. CARREGAR COMANDOS (!) ---
const cmdPath = path.join(__dirname, 'comandos');
const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const cmd = require(`./comandos/${file}`);
    client.commands.set(cmd.name, cmd);
}

// --- 2. CARREGAR SLASH COMMANDS (/) ---
const slashPath = path.join(__dirname, 'slash');
const slashFiles = fs.readdirSync(slashPath).filter(file => file.endsWith('.js'));
for (const file of slashFiles) {
    const slash = require(`./slash/${file}`);
    client.slash.set(slash.data.name, slash);
}

// --- 3. CARREGAR EVENTOS ---
const eventPath = path.join(__dirname, 'eventos');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./eventos/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// --- 4. ESCUTAR SLASH COMMANDS (/) ---
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.slash.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Erro ao executar este comando!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Erro ao executar este comando!', ephemeral: true });
        }
    }
});

// Login do Bot
client.login(process.env.TOKEN);
