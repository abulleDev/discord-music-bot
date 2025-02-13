import { VideoInfo } from '../../bot/music/get_info';
import skipPrevious from '../assets/skip_previous.svg';
import playPause from '../assets/play_pause.svg';
import skipNext from '../assets/skip_next.svg';

export default function CurrentMusic({ music }: { music: VideoInfo }) {
  return (
    <div className='w-[600px] h-full p-0 flex flex-col justify-center items-center gap-y-4 outline-4 outline-gray-200 rounded-2xl z-0'>
      <img className='w-[500px] mx-auto' src={music.thumbnail ?? undefined} />
      <p className='w-[500px] text-center text-3xl text-white'>{music.title}</p>
      <div>
        <button
          className='rounded-4xl hover:bg-white/10'
          type='button'
          onClick={() => {
            alert('skipPrevious');
          }}
        >
          <img src={skipPrevious} alt='skip_previous_button' />
        </button>
        <button
          className='rounded-4xl hover:bg-white/10'
          type='button'
          onClick={() => {
            alert('playPause');
          }}
        >
          <img src={playPause} alt='play_pause_button' />
        </button>
        <button
          className='rounded-4xl hover:bg-white/10'
          type='button'
          onClick={() => {
            alert('skipNext');
          }}
        >
          <img src={skipNext} alt='skip_next_button' />
        </button>
      </div>
    </div>
  );
}
