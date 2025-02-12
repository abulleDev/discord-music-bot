import http from 'http';
import { Server } from 'socket.io';
import getInfo from '../bot/music/get_info';

export default function socket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    socket.on('getInfo', async (music: string) => {
      const info = await getInfo(music);
      socket.emit('getInfo', info);
    });
  });
}
