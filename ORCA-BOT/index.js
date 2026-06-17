const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`🐋 ORCA BOT ONLINE | ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    const args = message.content.split(" ");
    const cmd = args.shift().toLowerCase();

    // PING
    if (cmd === "+ping") {
        return message.reply("🏓 Pong!");
    }

    // SALA
    if (cmd === "+sala") {

        const id = args[0];
        const senha = args[1];

        if (!id || !senha) {
            return message.reply(
                "Use: +sala (id) (senha)"
            );
        }

        return message.channel.send(`
<:sala:1513246424320577586> **SALA LIBERADA**

<:ID:1514877094163779644> **ID:** ${id}

🔑 **Senha:** ${senha}

<a:corfimarr:1513767887368880218> Boa partida!
        `);
    }

});

client.login(process.env.TOKEN);
