import { getVoiceConnection } from '@discordjs/voice';
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import joinVoice from '../voice/join_voice';
import type { Command } from '../types';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the voice channel'),

  async excute(interaction: ChatInputCommandInteraction<CacheType>) {
    if (interaction.guild === null) return;

    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.member!.user.id)!;
    const voiceChannel = member.voice.channel;

    // User is not in a voice channel
    if (voiceChannel === null) {
      await interaction.reply('Please join a voice channel first!');
      return;
    }
    // Bot is already in a voice channel
    else if (getVoiceConnection(interaction.guild.id) !== undefined) {
      await interaction.reply('I am already in a voice channel!');
      return;
    }

    joinVoice(voiceChannel);

    // Bot successfully joins the voice channel
    await interaction.reply('Joined!');
  },
} satisfies Command;
