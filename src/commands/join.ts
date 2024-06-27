import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the voice channel'),

  async excute(interaction: CommandInteraction, client: Client) {
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

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    // Bot successfully joins the voice channel
    await interaction.reply('Joined!');
  },
};
