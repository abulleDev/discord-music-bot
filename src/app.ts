import { Client, GatewayIntentBits } from 'discord.js';
import loadedCommands from './load_commands';
import dotenv from 'dotenv';
import { getVoiceConnection } from '@discordjs/voice';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const connection = getVoiceConnection(newState.guild.id);
  if (connection === undefined) return;

  // All user leave voice channel
  const channel = newState.guild.channels.cache.get(connection.joinConfig.channelId!)!;
  if (channel.isVoiceBased()) {
    const userExist = channel.members.some((member) => !member.user.bot);
    if (!userExist) return connection.destroy();
  }

  // Bot has been kicked
  if (newState.id === client.user!.id && newState.channelId === null) {
    connection.destroy();
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await loadedCommands[interaction.commandName].excute(interaction, client);
});

client.login(process.env.TOKEN);
