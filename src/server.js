import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import pino from 'pino-http';
import dotenv from 'dotenv';

import { env } from './utils/env.js';

import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

import contactRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use('/contacts', contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
