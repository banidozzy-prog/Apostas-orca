module.exports = {

    name: "sw",

    execute(message, args) {

        const user = message.mentions.users.first();

        if (!user) {
            return message.reply(
                "Use: +sw @usuario"
            );
        }

        message.channel.send(`
🏆 PAINEL DA PARTIDA

Mediador: ${message.author}

Jogador Marcado: ${user}

🏆 Vitória Normal

<:wo:1514083677880057916> Vitória por W.O

<:finalizar:1514083336660975848> Finalizar Aposta
        `);

    }

};
