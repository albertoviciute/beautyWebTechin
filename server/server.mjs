import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/postgresConnection.mjs';
import cors from 'cors';
import usersRouter from './routes/index.mjs';
import proceduresRouter from './routes/index.mjs';
import passport from './strategies/auth.mjs';

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    const message = await connectDB();
    console.log(message);

    app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      }),
    );
    app.use(express.json());
    app.use(passport.initialize());

    app.use('/api/v1/beautyWeb', usersRouter, proceduresRouter);

    const PORT = process.env.PORT || 1000;

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the server or database', error);
  }
};

startServer();
