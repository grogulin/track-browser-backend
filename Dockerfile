FROM keymetrics/pm2:latest-stretch

# Bundle APP files
COPY . ./

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN sudo n stable

# Expose the listening port of your app
EXPOSE 9900

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "./bin/www" ]
