module.exports = {
    name: 'sala',
    async execute(message, args, client) {
        // Renomeia o canal
        await message.channel.setName('pagar-2,00');
        message.channel.send('✅ Sala criada! Canal configurado para pagamento.');
    }
};
