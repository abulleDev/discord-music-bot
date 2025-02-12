import express, { Request, Response } from 'express';
import http from 'http';
import socket from './socket';
import path from 'path';

const app = express();
const server = http.createServer(app);
socket(server);

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

export default function startServer() {
  server.listen(80, () => {
    console.log('Server start!');
  });
}
