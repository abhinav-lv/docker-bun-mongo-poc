# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY package.json .
RUN bun install
COPY /client/package.json ./client/
RUN cd client && bun install
COPY . .
RUN cd client && bun run build
RUN bun run build
CMD ["bun", "run", "index.js"]