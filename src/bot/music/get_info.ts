import { spawn } from 'child_process';

export interface VideoInfo {
  id: string | null;
  title: string;
  description: string | null;
  uploader: string | null;
  webpage_url: string;
  uploader_url: string | null;
  thumbnail: string | null;
  extractor: string;
}

export default function getInfo(music: string): Promise<VideoInfo> {
  const ytdlp = spawn('yt-dlp', [
    '--skip-download',
    '--no-playlist',
    '--output-na-placeholder',
    'null',
    '--print',
    '{"id":%(id)j, "title":%(title)j, "description":%(description)j, "uploader":%(uploader)j, "webpage_url":%(webpage_url)j, "uploader_url":%(uploader_url)j, "thumbnail":%(thumbnail)j, "extractor":%(extractor)j}',
    '--default-search',
    'ytsearch',
    music,
  ]);
  return new Promise((resolve, reject) => {
    ytdlp.stdout.once('data', (data) => {
      try {
        const info: VideoInfo = JSON.parse(data);
        resolve(info);
      } catch (error) {
        reject(new Error('No results found.'));
      }
    });
    ytdlp.once('close', () => {
      // No data resolved until process termination
      reject(new Error('No results found.'));
    });
  });
}
