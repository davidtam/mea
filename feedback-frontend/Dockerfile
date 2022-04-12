FROM node:17.8.0-alpine as build

LABEL version="1.0"

WORKDIR "/app"
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

ADD src/ ./src
COPY .babelrc ./
COPY webpack.config.js ./

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
