import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend origin
    methods: ['GET', 'POST'],
    credentials: true
  },
});

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Chat app backend running 🚀');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});