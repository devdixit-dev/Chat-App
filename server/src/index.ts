import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectionToDB from './config/database'

const app = express();
const PORT = process.env.PORT || 5000;

connectionToDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Chat app backend running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});