FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install pnpm -g
RUN pnpm install

COPY . . 
RUN pnpm run build


EXPOSE 8000 
CMD ["node", "public/bundle.js"] 