import { readdirSync } from 'fs';
import path from 'path';
import type { Command } from './types';

console.log('Loading commands...');

const loadedCommands: Record<string, Command> = {};
const commandPath = path.join(__dirname, './commands/');
for (const commandFile of readdirSync(commandPath)) {
  const command = require(path.join(commandPath, commandFile))
    .default as Command;
  loadedCommands[command.data.name] = command;
}

export default loadedCommands;
