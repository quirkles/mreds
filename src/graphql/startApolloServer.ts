import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import cors from 'cors';
import { Application, Request, Response } from 'express';
import { customSchema } from './schema';
import { getUser } from '../middleware';
import { Logger } from '../services/Logger/Logger';

export const startApolloServer = async (app: Application) => {
  const schema = await customSchema;
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const authCookie = req.cookies;
        const authUser = await getUser(authCookie);
        return { req, res, authUser, logger: (req as Request & {logger: Logger}).logger };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
    .then(() => console.log(`🚀 Server ready at http://localhost:4000/graphql`))
    .catch((err) => console.log(err));
};
