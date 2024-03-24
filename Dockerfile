FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

USER node

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY package*.json ./
COPY  --from=development /usr/src/app/node_modules ./node_modules
COPY . .

RUN npx prisma generate dev
RUN npm run build

RUN npm install --only=production && npm cache clean --force

USER node

FROM node:20-alpine As production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/doc ./doc
COPY --from=build /usr/src/app/.env ./.env

CMD [ "node", "dist/main.js" ]