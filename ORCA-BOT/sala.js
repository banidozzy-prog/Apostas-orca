module.exports = {

    name: "sala",

    execute(message, args) {

        const id = args[0];
        const senha = args[1];

        if (!id || !senha) {
            return message.reply(
                "<:cancelar:1514876408428494962> Use: +sala (id) (senha)"
            );
        }

        message.channel.send(`
<:sala:1513246424320577586> **SALA LIBERADA**

<:ID:1514877094163779644> **ID DA SALA:** ${id}

🔑 **SENHA:** ${senha}

<a:corfimarr:1513767887368880218> Os pagamentos foram confirmados.

⚠️ Entrem na sala e iniciem a partida.
        `);

    }

};
