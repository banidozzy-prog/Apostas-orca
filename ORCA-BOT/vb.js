module.exports = {

    name: "vb",

    execute(message, args) {

        const id = args[0];

        if (!id) {
            return message.reply(
                "Use: +vb ID"
            );
        }

        message.channel.send(`
<:blacklist:1514507237119365140>

Consulta realizada.

ID pesquisado: ${id}
        `);

    }

};
