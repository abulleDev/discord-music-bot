import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import loadedCommands from './load_commands';
import dotenv from 'dotenv';
dotenv.config();

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
for (const commandName in loadedCommands) {
  commands.push(loadedCommands[commandName].data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN!);

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
