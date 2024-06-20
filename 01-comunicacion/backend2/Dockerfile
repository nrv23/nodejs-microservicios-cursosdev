FROM node:20.9.0-alpine3.18

WORKDIR /app

#COPY package.json . \ 
#        package-lock.json /app/



COPY package*.json .
RUN npm ci
#ci es clean install
COPY . /app
CMD npm start