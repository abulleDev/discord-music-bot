import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async excute(interaction: CommandInteraction, client: Client) {
    await interaction.reply('Pong!');
  },
};
