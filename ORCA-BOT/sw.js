// sw.js

module.exports = {
name: "sw",

execute(message, args) {

    const jogador = message.mentions.users.first();

    if (!jogador) {
        return message.reply(
            "❌ Use: +sw @jogador"
        );
    }

    message.channel.send(`

<:COROA:1513767660825874524> PAINEL DA PARTIDA

👤 Jogador: ${jogador}

🏆 Escolha o resultado da aposta:

1️⃣ Vitória Normal

<:wo:1514083677880057916> Vitória por W.O

<:finalizar:1514083336660975848> Finalizar Partida

⚠️ Apenas o mediador responsável deve registrar o resultado.
`);

}

};
