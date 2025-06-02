FROM node:22.16-alpine3.21 AS base

RUN npm i -g pnpm

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the app with cache dependencies
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build


# Production image, copy all the files and run next
FROM base AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist


CMD [ "node","dist/main" ]