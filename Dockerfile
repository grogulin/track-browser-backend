# # FROM node:ubuntu
# # FROM --platform=linux/amd64 ubuntu
# # FROM --platform=linux/amd64 node:12.18.1
# # set working direction
# WORKDIR /app
# # WORKDIR /usr/src/app
# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install application dependencies
# # COPY package.json ./
# # COPY package-lock.json ./
# COPY package*.json ./
# RUN npm install --production
# # EXPOSE 80
# EXPOSE 9900

# # add app
# COPY . ./

# # start app
# CMD ["pm2", "start", "./bin/www"]
# # RUN pm2 status
# # RUN pm2 logs
# # CMD ["pm2-runtime", "app.js"]
# # CMD ["node", "app.js"]

FROM keymetrics/pm2:latest-stretch

# Bundle APP files
COPY . ./
# COPY package.json .
# COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 9900

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "./bin/www" ]
