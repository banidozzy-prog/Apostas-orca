const { REST, Routes } = require('discord.js');

// O token e o ID estão no painel do ShardCloud ou no seu Portal de Desenvolvedor
const token = process.env.TOKEN;
const clientId = 'SEU_ID_DO_BOT'; 

const commands = [
  {
    name: 'painel',
    description: 'Abre o painel de gerenciamento da Org',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Registrando comandos / ...');
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log('✅ Comandos / registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar:', error);
  }
})();
