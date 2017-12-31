FROM node:carbon

COPY . /data

WORKDIR /data

RUN npm install

CMD ["npm", "start"]
