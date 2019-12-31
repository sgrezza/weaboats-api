
FROM node:current-alpine
ARG LISTENPORT=3000
ENV NODE_ENV PRODUCTION
ENV PORT 3000
WORKDIR /app

COPY package.json /app
RUN yarn --production && \
    yarn cache clean
# install -g -s yarn \
 #  && yarn  \
  # && yarn cache clean

COPY . /app

EXPOSE 3000
CMD ["yarn", "run", "start"]
