import { VoiceConnection } from '@discordjs/voice';
import { musicManagers } from '../music/music_manager';

export default function leaveVoice(guildId: string, connection: VoiceConnection) {
  connection.destroy();

  musicManagers.delete(guildId);
}
