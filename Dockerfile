FROM node:12.14.1-alpine as build
WORKDIR /build
COPY . /build

RUN yarn --silent && \
    yarn run build
# # Look up multistage builds
FROM node:12.14.1-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/service
COPY --from=build /build/package.json /build/yarn.lock ./
COPY --from=build /build/dist dist/
RUN yarn --production && \
    yarn cache clean

EXPOSE 3000

CMD ["yarn", "run", "serve"]
