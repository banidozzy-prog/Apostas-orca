module.exports = {
    name: 'ss',
    async execute(message, args, client) {
        const tipo = args[0]; // mob ou emu
        message.channel.send(`🔎 **Chamando analista de SS (${tipo})...**\nAguarde a equipe técnica.`);
    }
};
