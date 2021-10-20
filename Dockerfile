FROM node:15

WORKDIR /usr/src/app

COPY . ./
RUN npm install
RUN npm run build

# FROM nginx
# COPY build /usr/share/nginx/html
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf