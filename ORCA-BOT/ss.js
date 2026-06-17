module.exports = {

    name: "ss",

    execute(message, args) {

        const modo = args[0];
        const analise = args.slice(1).join(" ");

        if (!modo || !analise) {
            return message.reply(
                "Use: +ss mob análise 7"
            );
        }

        message.channel.send(`
<:ss:1513765098861105152> SOLICITAÇÃO DE ANÁLISE

👤 Mediador: ${message.author}

📱 Modo: ${modo}

🔊 Call: ${analise}

⚠️ Comparecer imediatamente.
        `);

    }

};
