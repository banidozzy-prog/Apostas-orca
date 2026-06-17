// sala.js

module.exports = {
name: "sala",

execute(message, args) {

    const id = args[0];
    const senha = args[1];

    if (!id || !senha) {
        return message.reply(
            "❌ Use: +sala (id) (senha)"
        );
    }

    message.channel.send(`

<:sala:1513246424320577586> SALA LIBERADA

<:ID:1514877094163779644> ID: ${id}

<:copiar:1514876703028019291> SENHA: ${senha}

<a:corfimarr:1513767887368880218> Pagamentos confirmados.

⚠️ Entrem na sala e iniciem a partida.
`);

}

};
