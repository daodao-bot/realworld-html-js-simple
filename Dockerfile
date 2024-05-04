FROM nginx:latest
COPY . /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
VOLUME /tmp
EXPOSE 80