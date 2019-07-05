# ViriCiti Vehicle Data Webserver!
![enter image description here](https://imgs.xkcd.com/comics/cia.png)

This simple Web Server app serves a simple HTTP message.

To run this app all you need to do is:
```
npm install
npm start
```
Then open your browser and go to `http://localhost:3000`

Building docker container for this app is easy, run this following command and you're done:
```
docker build --tag webserver:version .
```
