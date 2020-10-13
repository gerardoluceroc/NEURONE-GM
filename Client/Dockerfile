# This defines our starting point
FROM node:10

# Working directory
RUN mkdir /usr/src/front-neurone-gm
WORKDIR /usr/src/front-neurone-gm

COPY . .

EXPOSE 4200

# Dependencies
RUN npm install -g @angular/cli@9.1.1
RUN npm install

# Serve the app
CMD ["npm", "start"]