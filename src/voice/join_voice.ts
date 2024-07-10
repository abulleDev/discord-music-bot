import { joinVoiceChannel } from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';
import { musicManagers } from '../app';
import MusicManager from '../music/music_manager';

export default function joinVoice(voiceChannel: VoiceBasedChannel) {
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  musicManagers.set(voiceChannel.guild.id, new MusicManager());
  connection.subscribe(musicManagers.get(voiceChannel.guild.id)!.getPlayer());

  return connection;
}
