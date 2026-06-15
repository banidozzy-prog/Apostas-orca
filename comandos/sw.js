const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'sw',
    async execute(message, args) {
        // 1. Verifica se o usuário tem cargo de Staff/Mediador
        if (!message.member.roles.cache.some(r => r.name === 'Mediador')) {
            return message.reply('❌ Apenas mediadores podem finalizar partidas.');
        }

        const vencedor = message.mentions.users.first();
        if (!vencedor) return message.reply('❌ Use: `+sw @vencedor`');

        // 2. Busca a taxa configurada no comando /configurar_aposta
        const taxa = await db.get('config_taxa') || 0;
        
        // 3. Envia o aviso de encerramento
        const embed = new EmbedBuilder()
            .setTitle('🏆 | PARTIDA FINALIZADA')
            .setDescription(`O vencedor da partida é **${vencedor}**!\n\n💰 **Taxa ADM aplicada:** R$ ${taxa}`)
            .setColor('#2ecc71')
            .setFooter({ text: 'ORCA APOSTAS - Canal será fechado em 5 segundos...' });

        await message.channel.send({ embeds: [embed] });

        // 4. Aguarda 5 segundos e deleta o canal/tópico
        setTimeout(async () => {
            try {
                await message.channel.delete();
            } catch (err) {
                console.log('Erro ao deletar canal:', err);
            }
        }, 5000);
    }
};
