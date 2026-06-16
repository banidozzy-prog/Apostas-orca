const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  Partials
} = require("discord.js");

const fs = require("fs");
const path = require("path");

// =========================
// CLIENT
// =========================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

// =========================
// COLLECTIONS
// =========================

client.commands = new Collection();

// =========================
// CARREGAR COMANDOS
// =========================

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.name) {
      client.commands.set(command.name, command);
    }
  }
}

// =========================
// READY
// =========================

client.once(Events.ClientReady, (c) => {
  console.log(`🤖 BOT ONLINE: ${c.user.tag}`);
});

// =========================
// INTERACTIONS (BOTÕES / SLASH / MODALS)
// =========================

client.on(Events.InteractionCreate, async (interaction) => {

  // =========================
  // SLASH COMMANDS
  // =========================
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "❌ Erro ao executar comando.",
        ephemeral: true
      });
    }
  }

  // =========================
  // BOTÕES
  // =========================
  if (interaction.isButton()) {

    const file = require(`./buttons/${interaction.customId}.js`);

    if (!file) return;

    try {
      await file.execute(interaction, client);
    } catch (err) {
      console.log(err);
    }
  }

  // =========================
  // MODALS
  // =========================
  if (interaction.isModalSubmit()) {

    const file = require(`./modals/${interaction.customId}.js`);

    if (!file) return;

    try {
      await file.execute(interaction, client);
    } catch (err) {
      console.log(err);
    }
  }
});

// =========================
// LOGIN (SHARDCLOUD)
// =========================

client.login(process.env.TOKEN);
