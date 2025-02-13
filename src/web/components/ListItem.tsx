import { VideoInfo } from '../../bot/music/get_info';
import Remove from '../assets/remove.svg';

export default function ListItem({
  music,
  activate,
}: {
  music: VideoInfo;
  activate: boolean;
}) {
  return (
    <section
      className={`pr-2 h-[70px] shrink-0 overflow-hidden hover:font-bold  ${
        activate ? 'bg-[linear-gradient(90deg,#070707,13%,#232323)]' : ''
      }`}
    >
      <a
        className='pl-15 w-full h-full flex flex-row justify-center items-center gap-x-2 overflow-hidden '
        href={music.webpage_url}
        target='_blank'
        tabIndex={-1}
      >
        <img
          className='min-w-0 min-h-0 basis-0 grow-[2] '
          src={music.thumbnail ?? undefined}
        />
        <div className='basis-0 grow-[18] font-sans-serif'>
          <p className='text-white'>{music.title}</p>
          <p className='text-white/40'>{music.uploader}</p>
        </div>
        <button
          className='mr-2 p-2 rounded-4xl text-white hover:bg-white/10'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            alert(`Remove ${music.title}`);
          }}
        >
          <img src={Remove} alt='remove_music_button' />
        </button>
      </a>
    </section>
  );
}
