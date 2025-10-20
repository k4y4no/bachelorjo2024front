FROM node:lts-alpine3.22 AS nodepack

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install



FROM nodepack AS dev

COPY . .

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]


FROM nodepack AS build

COPY . .

RUN npm run build 


FROM nginx:mainline-alpine3.22-perl AS prod

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/jofront/browser /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx","-g","daemon off;"]