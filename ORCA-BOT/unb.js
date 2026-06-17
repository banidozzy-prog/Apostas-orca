module.exports = {

    name: "unb",

    execute(message, args) {

        const user = message.mentions.users.first();

        if (!user) {
            return message.reply(
                "Use: +unb @usuario"
            );
        }

        message.channel.send(`
<a:corfimarr:1513767887368880218>

${user} removido da blacklist.
        `);

    }

};
