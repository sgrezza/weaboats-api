FROM node:14.17.0-alpine as build
WORKDIR /build
COPY . /build

RUN yarn --silent && \
    yarn run tsc
# # Look up multistage builds
FROM node:14.17.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/service
COPY --from=build /build/package.json /build/yarn.lock ./
COPY --from=build /build/dist dist/
RUN yarn --production && \
    yarn cache clean

EXPOSE 8080

CMD ["yarn", "run", "serve"]
