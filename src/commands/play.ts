import { getVoiceConnection } from '@discordjs/voice';
import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import joinVoice from '../voice/join_voice';
import { musicManagers } from '../music/music_manager';
import getInfo from '../music/get_info';
import type { Command } from '../types';

const embedColor: Record<string, number> = {
  youtube: 0xff0000,
  soundcloud: 0xff5500,
  'chzzk:video': 0x00ffa3,
  'chzzk:live': 0x00ffa3,
  'twitch:stream': 0x9146ff,
  'twitch:clips': 0x9146ff,
  'twitch:vod': 0x9146ff,
  Instagram: 0xff0069,
  'instagram:story': 0xff0069,
  Naver: 0x03c75a,
  'Naver:live': 0x03c75a,
  navernow: 0x03c75a,
  vimeo: 0x17d5ff,
};

const a = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play music')
  .addStringOption((option) =>
    option
      .setName('music')
      .setDescription('The title or URL of the music you want to play')
      .setRequired(true),
  );

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music')
    .addStringOption((option) =>
      option
        .setName('music')
        .setDescription('The title or URL of the music you want to play')
        .setRequired(true),
    ),

  async excute(interaction: ChatInputCommandInteraction<CacheType>) {
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
        'You need to be in the same voice channel as the bot to use this command!',
      );
      return;
    }

    const music = interaction.options.get('music')!.value as string;
    try {
      const info = await getInfo(music);
      const {
        title,
        uploader,
        webpage_url,
        uploader_url,
        thumbnail,
        extractor,
      } = info;

      const author =
        uploader === null
          ? null
          : {
              name: uploader,
              url: uploader_url ?? undefined,
            };
      const embed = new EmbedBuilder()
        .setColor(embedColor[extractor] ?? 0xd1d1d1)
        .setTitle(title)
        .setAuthor(author)
        .setDescription(webpage_url)
        .setThumbnail(thumbnail);
      const musicManager = musicManagers.get(interaction.guild!.id);
      musicManager?.addMusic(info);
      await interaction.editReply({ content: 'Music added.', embeds: [embed] });
    } catch (error) {
      if (error instanceof Error) {
        await interaction.editReply(error.message);
      }
    }
  },
} satisfies Command;
