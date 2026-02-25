import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import type { Command } from '../types';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async excute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.reply('Pong!');
  },
} satisfies Command;
