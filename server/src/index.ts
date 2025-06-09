import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import http from 'http';
import { Server } from 'socket.io';

import connectionToDB from './config/database'

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

connectionToDB();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend origin
    methods: ['GET', 'POST'],
    credentials: true
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Chat app backend running 🚀');
});

io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});