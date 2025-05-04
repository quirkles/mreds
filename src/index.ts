import 'reflect-metadata';
import * as fs from 'node:fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import mongoose, { Mongoose, MongooseError } from 'mongoose';
import { v4 } from 'uuid';
import { DATABASE, PORT } from './constants/constants';
import { startApolloServer } from './graphql/startApolloServer';
import { router as mail } from './restapi/verification';
import { org, team, player, user } from './services/images';
import { Logger } from './services/Logger/Logger';
import { createLogger } from './services/Logger/Pino.Logger';

const app: Application = express();

async function startServer() {

  app.use("*", (req: Request & { logger?: Logger }, res, next) => {
    req.logger = createLogger({
      logName: "madrid-reds",
      labels: {
        requestId: v4(),
        reqHost: req.hostname,
        url: req.url,
      }
    })
    req.logger.info("Incoming request", {
      req
    })
    return next()
  })

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(org);
  app.use(team);
  app.use(player);
  app.use(user);
  app.use(mail);

  startApolloServer(app);

  mongoose
    .connect(DATABASE as string)
    .then((res: Mongoose) => {
      console.log(`DATABASE connected to ${res.connections[0].host}`);
    })
    .catch((err: MongooseError) => console.log('DATABASE ERROR', err));

  if (process.env.NODE_ENV === 'production') {
    console.log('production env, mounting web app at static folder');
    const appDir = path.resolve(__dirname, '../client', 'build');
    app.use(express.static(appDir));
    app.get('*', (req: Request, res: Response) => {
      const { logger } = req as Request & { logger: Logger }
      logger.info("Deffering Incoming request to static web app")
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
  } else {
    console.log('development env, not mounting web app');
  }
  app.use((err: Error, req: Request, res: Response, next: () => void) => {
    const { logger } = req as Request & { logger: Logger }
    logger.error("Error handling request", {
      err
    })
    if (res.headersSent) {
      return next()
    }
    res.status(500).send('Something broke!');
  });

  const port = PORT || 3002;
  app.listen(port, () => {
    console.log(`app running at port ${port}`);
  });
}

startServer().catch((err) => console.log(err)).then(() => console.log('App started'));