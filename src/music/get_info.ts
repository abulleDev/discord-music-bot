import { spawn } from 'child_process';

interface Info {
  title: string;
  uploader: string | undefined;
  webpage_url: string;
  uploader_url: string | undefined;
  thumbnail: string | undefined;
  extractor: string;
}

export default function getInfo(url: string): Promise<Info> {
  const ytdlp = spawn('yt-dlp', ['--no-playlist', '-J', url]);
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('data', async (json) => {
      const info: Info | null = JSON.parse(json);

      // Check url validity
      if (info === null) reject(new Error('Invalid URL.'));
      else resolve(info);
    });
  });
}
