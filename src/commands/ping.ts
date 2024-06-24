import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  excute(interaction: CommandInteraction, client: Client) {
    interaction.reply('Pong!');
  },
};
