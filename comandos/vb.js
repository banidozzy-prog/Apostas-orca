const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'vb',
    async execute(message, args) {
        const targetId = args[0];
        if (!targetId) return message.reply('❌ Use: +vb [ID]');
        
        const isBlacklisted = await db.get(`blacklist_${targetId}`);
        if (isBlacklisted) {
            message.reply(`⚠️ O usuário **${targetId}** ESTÁ na blacklist.`);
        } else {
            message.reply(`✅ O usuário **${targetId}** NÃO está na blacklist.`);
        }
    }
};
