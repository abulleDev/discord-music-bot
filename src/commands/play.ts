import { getVoiceConnection } from '@discordjs/voice';
import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import joinVoice from '../voice/join_voice';
import { musicManagers } from '../app';
import getInfo from '../music/get_info';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play YouTube music')
    .addStringOption((option) => {
      return option
        .setName('url')
        .setDescription('YouTube URL')
        .setRequired(true);
    }),

  async excute(interaction: CommandInteraction, client: Client) {
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

    let connection = getVoiceConnection(interaction.guild.id);
    // Bot is not in a voice channel
    if (connection === undefined) {
      connection = joinVoice(voiceChannel);
    }

    // User is not in the same voice channel as the bot
    if (voiceChannel?.id !== connection.joinConfig.channelId) {
      await interaction.editReply(
        'You need to be in the same voice channel as the bot to use this command!'
      );
      return;
    }

    const url = interaction.options.get('url')!.value as string;
    try {
      const { title, uploader, webpage_url, uploader_url, thumbnail } =
        await getInfo(url);
      const embed = new EmbedBuilder()
        .setColor(0xd1d1d1)
        .setTitle(title)
        .setAuthor({
          name: uploader,
          url: uploader_url,
        })
        .setDescription(webpage_url)
        .setThumbnail(thumbnail);
      const musicManager = musicManagers.get(interaction.guild!.id);
      musicManager?.addMusic(webpage_url);
      await interaction.editReply({ content: 'Music added.', embeds: [embed] });
    } catch (error) {
      await interaction.editReply('Invalid URL.');
    }
  },
};
