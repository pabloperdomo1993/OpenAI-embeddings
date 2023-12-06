FROM node:20-alpine

COPY package.json /app/
COPY src /app/

WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run","start"]