FROM node:10

# Working directory
RUN mkdir /usr/src/back-neurone-gm
WORKDIR /usr/src/back-neurone-gm

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm rebuild
RUN npm install

# Bundle app source
COPY . .
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 4000

CMD [ "node", "app.js" ]