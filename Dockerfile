FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat && \
    npm i -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production
ENV BASE_URL=/

# Hasura GraphQL API
ARG VITE_GRAPHQL_API
ENV VITE_GRAPHQL_API=${VITE_GRAPHQL_API}
ARG VITE_GRAPHQL_WS
ENV VITE_GRAPHQL_WS=${VITE_GRAPHQL_WS}
ARG VITE_GRAPHQL_SECRET_KEY
ENV VITE_GRAPHQL_SECRET_KEY=${VITE_GRAPHQL_SECRET_KEY}

# Nest backend API
ARG VITE_BASE_API
ENV VITE_BASE_API=${VITE_BASE_API}

# Firebase credentials
ARG VITE_API_KEY
ENV VITE_API_KEY=${VITE_API_KEY}
ARG VITE_AUTH_DOMAIN
ENV VITE_AUTH_DOMAIN=${VITE_AUTH_DOMAIN}
ARG VITE_PROJECT_ID
ENV VITE_PROJECT_ID=${VITE_PROJECT_ID}
ARG VITE_STORAGE_BUCKET
ENV VITE_STORAGE_BUCKET=${VITE_STORAGE_BUCKET}
ARG VITE_MESSAGING_SENDER_ID
ENV VITE_MESSAGING_SENDER_ID=${VITE_MESSAGING_SENDER_ID}
ARG VITE_APP_ID
ENV VITE_APP_ID=${VITE_APP_ID}
ARG VITE_MEASUREMENT_ID
ENV VITE_MEASUREMENT_ID=${VITE_MEASUREMENT_ID}

RUN yarn build

FROM nginx:alpine
COPY /docker/nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=builder /app/dist /usr/share/nginx/html/admin

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
