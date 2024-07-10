import { VoiceConnection } from '@discordjs/voice';
import { musicManagers } from '../app';

export default function leaveVoice(guildId: string, connection: VoiceConnection) {
  connection.destroy();

  musicManagers.delete(guildId);
}
