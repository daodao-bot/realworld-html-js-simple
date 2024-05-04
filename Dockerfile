FROM nginx:latest
COPY ./public /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
VOLUME /tmp
EXPOSE 80