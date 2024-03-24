FROM node:20-alpine

WORKDIR /usr/src/app
# WORKDIR /app

COPY package*.json ./

RUN npm install --omit dev

COPY . .

# RUN npx prisma migrate deploy
RUN npx prisma generate dev
RUN npm run build


CMD [ "node", "dist/main.js" ]