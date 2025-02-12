import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import loadedCommands from './load_commands';
import dotenv from 'dotenv';
dotenv.config();

const commands: SlashCommandBuilder[] = [];
for (const commandName in loadedCommands) {
  commands.push(loadedCommands[commandName].data);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

(async function () {
  try {
    console.log('Started registering slash commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log('Successfully registered slash commands.');
  } catch (error) {
    console.error(error);
  }
})();
