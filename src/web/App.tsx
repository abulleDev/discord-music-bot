import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { VideoInfo } from '../bot/music/get_info';
import ListItem from './components/ListItem';
import CurrentMusic from './components/CurrentMusic';
import playList from './placeholderPlayList';

export default function App() {
  const socket = useRef<Socket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [music, setMusic] = useState<VideoInfo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    socket.current = io();
    socket.current.on('getInfo', (music: VideoInfo) => setMusic(music));
    return () => {
      socket.current!.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(music);
  }, [music]);

  return (
    <>
      <div className='h-dvh flex flex-col justify-center items-center gap-y-8 bg-[#070707]'>
        <input
          className='p-4 w-[500px] h-8 text-white outline-2 outline-white rounded-2xl focus:outline-2'
          type='text'
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
              socket.current?.emit('getInfo', e.currentTarget.value);
            }
          }}
        />
        <div className='h-[700px] flex flex-row border-4 border-gray-200 rounded-2xl'>
          <CurrentMusic music={playList[0]} />
          <div className='w-[700px] h-full flex flex-col divide-y-2 divide-white/10 overflow-auto'>
            {playList.map((music, index) => {
              return (
                <ListItem
                  music={music}
                  activate={currentIndex === index}
                  key={`music-${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
