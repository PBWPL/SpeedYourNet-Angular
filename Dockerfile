FROM nginx:alpine
COPY ./dist/speed-your-net/. /usr/share/nginx/html
