import { spawn } from 'child_process';

interface VideoInfo {
  id?: string;
  title: string;
  description?: string;
  uploader?: string;
  webpage_url: string;
  uploader_url?: string;
  thumbnail?: string;
  extractor: string;
  [key: string]: any;
}

export default function getInfo(url: string): Promise<VideoInfo> {
  const ytdlp = spawn('yt-dlp', ['--no-playlist', '-J', url]);
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('data', async (json) => {
      const info: VideoInfo | null = JSON.parse(json);

      // Check url validity
      if (info === null) reject(new Error('Invalid URL.'));
      else resolve(info);
    });
  });
}
