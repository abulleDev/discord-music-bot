import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
} from '@discordjs/voice';
import { spawn } from 'child_process';
import { VideoInfo } from './get_info';

export default class MusicManager {
  private readonly player: AudioPlayer = createAudioPlayer();
  private readonly playList: VideoInfo[] = [];
  private currentPlayerIndex = 0;
  private isPlaying = false;

  constructor() {
    // Play the next music when the player stops
    this.player.on(AudioPlayerStatus.Idle, () => {
      this.isPlaying = false;
      this.currentPlayerIndex += 1;
      if (this.playList[this.currentPlayerIndex] === undefined) return;

      this.playMusic();
      this.isPlaying = true;
    });
  }

  private playMusic() {
    try {
      const stream = spawn('yt-dlp', [
        '--no-playlist',
        '-o',
        '-',
        '-f',
        'bestaudio',
        this.playList[this.currentPlayerIndex].webpage_url,
      ]).stdout;
      const resource = createAudioResource(stream);
      this.player.play(resource);
      this.isPlaying = true;
    } catch (error) {
      console.log(error);
    }
  }

  public getPlayer() {
    return this.player;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public addMusic(music: VideoInfo) {
    this.playList.push(music);
    if (this.isPlaying === false) this.playMusic();
  }

  public skipMusic() {
    this.player.stop();
  }

  public currentMusic() {
    return this.playList[this.currentPlayerIndex];
  }
}

export const musicManagers = new Map<string, MusicManager>();
