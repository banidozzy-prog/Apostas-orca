const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'b',
    async execute(message, args) {
        // 1. Verificação de Cargo (Segurança)
        if (!message.member.roles.cache.some(r => r.name === 'Mediador')) {
            return message.reply('❌ Apenas Mediadores podem banir.');
        }

        // 2. Captura o usuário/ID e o motivo
        const target = message.mentions.members.first() || args[0];
        const motivo = args.slice(1).join(' ') || "Motivo não informado (Blacklist aplicada)";

        if (!target) {
            return message.reply('❌ Você precisa marcar o usuário ou colocar o ID. Ex: `+b @usuario motivo`');
        }

        const id = target.id || target;

        // 3. Salva no banco de dados
        await db.set(`blacklist_${id}`, {
            motivo: motivo,
            staff: message.author.tag,
            data: new Date().toLocaleDateString()
        });

        // 4. Feedback
        message.reply(`✅ Usuário **${id}** adicionado à Blacklist.\n📝 Motivo: ${motivo}`);
        
        // Opcional: Enviar log em canal específico
        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs-blacklist');
        if (logChannel) {
            logChannel.send(`🚫 **Blacklist Aplicada**\nUsuário: ${id}\nStaff: ${message.author}\nMotivo: ${motivo}`);
        }
    }
};
