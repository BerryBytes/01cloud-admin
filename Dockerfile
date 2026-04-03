FROM node:12-slim as base
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

FROM base AS lint
RUN npm run lint

FROM base AS test
RUN CI=true npm run test

FROM base as build
RUN npm run build

FROM zeronecloud/nginx:latest as final

RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app

COPY --from=build /app/build/ /usr/share/nginx/html/