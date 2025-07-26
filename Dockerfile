FROM node:20 as base
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY ./ ./
COPY ./.env ./
RUN npm run build

FROM nginx
COPY ./container/nginx/smkgts.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/dist /app
