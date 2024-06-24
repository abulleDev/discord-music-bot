import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

type Command = {
  data: SlashCommandBuilder;
  excute: (interaction: CommandInteraction, client: Client) => void;
};

console.log('Loading commands...');

const loadedCommands: { [key in string]: Command } = {};
const commandPath = path.join(__dirname, './commands/');
for (const commandFile of readdirSync(commandPath)) {
  const command = require(path.join(commandPath, commandFile)).default as Command;
  loadedCommands[command.data.name] = command;
}

export default loadedCommands;
