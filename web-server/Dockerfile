FROM node:8

RUN echo "Europe/Amsterdam" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

COPY . /app

WORKDIR /app

RUN npm i

CMD ["npm", "start"]