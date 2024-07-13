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

interface SearchInfo {
  entries: VideoInfo[];
  [key: string]: any;
}

export function getInfo(url: string): Promise<VideoInfo> {
  const ytdlp = spawn('yt-dlp', ['--no-playlist', '-J', url]);
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('data', (json) => {
      const info: VideoInfo | null = JSON.parse(json);

      // Check url validity
      if (info === null) reject(new Error('Invalid URL.'));
      else resolve(info);
    });
  });
}

export function getSearchInfo(music: string): Promise<VideoInfo> {
  const ytdlp = spawn('yt-dlp', [
    '--no-playlist',
    '-J',
    '--default-search',
    'ytsearch',
    music,
  ]);
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('data', (json) => {
      const searchInfo: SearchInfo | null = JSON.parse(json);

      // Check search results existence
      if (searchInfo === null) reject(new Error('No search results found.'));
      else resolve(searchInfo.entries[0]);
    });
  });
}
