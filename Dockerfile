FROM node:19.0.0-alpine
WORKDIR /srv/app
COPY package.json package-lock.json tsconfig.json ./
COPY src ./src/
COPY client ./client/

RUN npm install
RUN npm run clean
RUN npm run build
RUN npm run copy-files
RUN rm -rf src

RUN cd client && npm install && npm run build
RUN rm -rf client/src

ARG PORT=3002
ARG DATABASE

EXPOSE $PORT
ENV PORT=$PORT
ENV DATABASE=$DATABASE
ENV NODE_ENV='production'

CMD ["node", "dist/index.js"]
