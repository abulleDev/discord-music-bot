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

function isURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export default function getInfo(music: string): Promise<VideoInfo> {
  if (isURL(music)) {
    const ytdlp = spawn('yt-dlp', ['--no-playlist', '-J', music]);
    return new Promise((resolve, reject) => {
      ytdlp.stdout.once('data', async (json) => {
        const info: VideoInfo | null = JSON.parse(json);

        // Check url validity
        if (info === null) reject(new Error('Invalid URL.'));
        else resolve(info);
      });
    });
  } else {
    const ytdlp = spawn('yt-dlp', [
      '--no-playlist',
      '-J',
      '--default-search',
      'ytsearch',
      music,
    ]);
    return new Promise((resolve, reject) => {
      ytdlp.stdout.once('data', async (json) => {
        const searchInfo: SearchInfo | null = JSON.parse(json);

        // Check search results existence
        if (searchInfo === null) reject(new Error('No search results found.'));
        else resolve(searchInfo.entries[0]);
      });
    });
  }
}
