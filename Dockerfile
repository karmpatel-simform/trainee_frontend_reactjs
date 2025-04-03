FROM node:22-alpine

ARG BACKENDURL

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_BACKENDURL=http://172.16.1.155:3300

EXPOSE 5173

CMD ["npm", "run", "dev"]