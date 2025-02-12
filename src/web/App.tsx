import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { VideoInfo } from '../bot/music/get_info';

export default function App() {
  const socket = useRef<Socket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [music, setMusic] = useState<VideoInfo | null>(null);

  useEffect(() => {
    socket.current = io();
    socket.current.on('getInfo', (music: VideoInfo) => setMusic(music));
    return () => {
      socket.current!.disconnect();
    };
  }, []);

  return (
    <>
      <div>{music?.title}</div>
      <div>{music?.webpage_url}</div>
      <input ref={inputRef} placeholder='Search...' />
      <button
        type='button'
        onClick={() => {
          socket.current?.emit('getInfo', inputRef.current!.value);
        }}
      >
        Search
      </button>
    </>
  );
}
