import { Client, GatewayIntentBits } from 'discord.js';
import loadedCommands from './load_commands';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  loadedCommands[interaction.commandName].excute(interaction, client);
});

client.login(process.env.TOKEN);
