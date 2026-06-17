module.exports = {

    name: "b",

    execute(message, args) {

        const user = message.mentions.users.first();

        if (!user) {
            return message.reply(
                "Use: +b @usuario"
            );
        }

        message.channel.send(`
<:blacklist:1514507237119365140>

${user} foi adicionado à blacklist.
        `);

    }

};
