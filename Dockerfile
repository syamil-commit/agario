FROM node:latest
WORKDIR /usr/src/app

#RUN apt-get update
#RUN apt-get install --yes gulp


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY npm-shrinkwrap.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#ENTRYPOINT ["/usr/src/app/config.json"]
ENTRYPOINT ["npm","start"]

#CMD ["npm","start"]

EXPOSE 3000
