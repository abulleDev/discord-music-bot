import { getVoiceConnection } from '@discordjs/voice';
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import leaveVoice from '../voice/leave_voice';

export default {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave voice channel'),

  async excute(interaction: ChatInputCommandInteraction<CacheType>) {
    if (interaction.guild === null) return;

    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.member!.user.id)!;
    const voiceChannel = member.voice.channel;

    const connection = getVoiceConnection(interaction.guild.id);
    // Bot is not in a voice channel
    if (connection === undefined) {
      await interaction.reply('I am not in a voice channel!');
      return;
    }
    // User is not in the same voice channel as the bot
    else if (voiceChannel?.id !== connection.joinConfig.channelId) {
      await interaction.reply(
        'You need to be in the same voice channel as the bot to use this command!',
      );
      return;
    }

    leaveVoice(interaction.guild.id, connection);
    // Bot successfully leaves the voice channel
    await interaction.reply('Left!');
  },
};
