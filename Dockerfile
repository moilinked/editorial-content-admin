FROM oven/bun:1.3.13-alpine AS deps

WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.3.13-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM node:22.23.1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json ./

EXPOSE 3000

CMD ["node", "./node_modules/@react-router/serve/bin.cjs", "./build/server/index.js"]
