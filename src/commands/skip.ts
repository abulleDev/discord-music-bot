import { getVoiceConnection } from '@discordjs/voice';
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { musicManagers } from '../music/music_manager';

export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip current music'),

  async excute(interaction: CommandInteraction) {
    if (interaction.guild === null) return;

    // defer reply (need longer than three seconds)
    await interaction.deferReply();

    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.member!.user.id)!;
    const voiceChannel = member.voice.channel;

    // User is not in a voice channel
    if (voiceChannel === null) {
      await interaction.editReply('Please join a voice channel first!');
      return;
    }

    const connection = getVoiceConnection(interaction.guild.id);
    // Bot is not in a voice channel
    if (connection === undefined) {
      await interaction.editReply('I am not in a voice channel!');
      return;
    }

    // User is not in the same voice channel as the bot
    if (voiceChannel?.id !== connection.joinConfig.channelId) {
      await interaction.editReply(
        'You need to be in the same voice channel as the bot to use this command!'
      );
      return;
    }

    const musicManager = musicManagers.get(interaction.guild!.id);
    // Music is not playing
    if (musicManager?.getIsPlaying() === false) {
      await interaction.editReply('There is no music playing to skip!');
      return;
    }

    const currentMusic = musicManager?.currentMusic();
    musicManager?.skipMusic();
    const { title, webpage_url } = currentMusic!;
    const embed = new EmbedBuilder()
      .setColor(0xd1d1d1)
      .setTitle('Music skipped.')
      .setDescription(`**${title}**: ${webpage_url}.`);
    await interaction.editReply({ embeds: [embed] });
  },
};
