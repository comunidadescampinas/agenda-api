FROM node:alpine

RUN mkdir /app
RUN npm install -g nodemon

WORKDIR /app

CMD ["npm", "run", "dev"]