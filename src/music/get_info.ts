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
  let jsonString = '';
  const ytdlp = spawn('yt-dlp', ['--no-playlist', '-J', url]);
  ytdlp.stdout.on('data', (data) => {
    jsonString += data;
  });
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('close', () => {
      const info: VideoInfo | null = JSON.parse(jsonString);

      // Check url validity
      if (info === null) reject(new Error('Invalid URL.'));
      else resolve(info);
    });
  });
}

export function getSearchInfo(music: string): Promise<VideoInfo> {
  let jsonString = '';
  const ytdlp = spawn('yt-dlp', [
    '--no-playlist',
    '-J',
    '--default-search',
    'ytsearch',
    music,
  ]);
  ytdlp.stdout.on('data', (data) => {
    jsonString += data;
  });
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('close', () => {
      const searchInfo: SearchInfo | null = JSON.parse(jsonString);

      // Check search results existence
      if (searchInfo === null) reject(new Error('No search results found.'));
      else resolve(searchInfo.entries[0]);
    });
  });
}
