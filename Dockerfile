
FROM node:12.13.1
ARG LISTENPORT=3000
ENV PORT 3000
WORKDIR /app

COPY package.json /app
RUN npm cache clean --force && npm install --unsafe-perm
COPY . /app


EXPOSE 3000
CMD ["npm", "run", "start"]
