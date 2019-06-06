FROM node:8

RUN echo "Europe/Amsterdam" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

COPY . /app

WORKDIR /app

CMD ["npm", "start"]
