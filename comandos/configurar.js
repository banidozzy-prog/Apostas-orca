const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configurar')
        .setDescription('Configura o sistema da organização')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Apenas Admins usam
        .addChannelOption(o => o.setName('categoria').setDescription('Categoria onde os tópicos serão criados').setRequired(true))
        .addRoleOption(o => o.setName('cargo_ss').setDescription('Cargo que receberá os chamados de SS').setRequired(true))
        .addChannelOption(o => o.setName('log_blacklist').setDescription('Canal de logs da blacklist').setRequired(true))
        .addNumberOption(o => o.setName('taxa').setDescription('Taxa do ADM (em R$)').setRequired(true)),

    async execute(interaction) {
        const categoria = interaction.options.getChannel('categoria');
        const cargoSS = interaction.options.getRole('cargo_ss');
        const logBlacklist = interaction.options.getChannel('log_blacklist');
        const taxa = interaction.options.getNumber('taxa');

        // Salvando tudo no banco de dados
        await db.set(`config_categoria`, categoria.id);
        await db.set(`config_cargo_ss`, cargoSS.id);
        await db.set(`config_log_blacklist`, logBlacklist.id);
        await db.set(`config_taxa`, taxa);

        await interaction.reply({ 
            content: `✅ **Configurações salvas com sucesso!**\n\n📂 Categoria: ${categoria}\n🛡️ Cargo SS: ${cargoSS}\n📜 Logs: ${logBlacklist}\n💰 Taxa: R$ ${taxa}`, 
            ephemeral: true 
        });
    }
};
