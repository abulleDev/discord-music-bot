import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content === 'ping') {
    await message.channel.send('pong');
  }
});

client.login(process.env.TOKEN);
