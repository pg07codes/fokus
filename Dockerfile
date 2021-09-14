FROM node:16-alpine

COPY . /fokus

WORKDIR /fokus

RUN npm install --force && \
    yarn build && \
    yarn global add serve

CMD ["serve", "-s", "build"]
