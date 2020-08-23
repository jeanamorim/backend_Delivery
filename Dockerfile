FROM postgres:latest
WORKDIR /usr/app
COPY package*.json/
RUN npm install
COPY . .
CMD NODE_URLS=http://*:$PORT npm start

EXPOSE 3005

cmd ["yarn", "dev"]
