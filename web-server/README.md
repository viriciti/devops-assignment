# ViriCiti Vehicle Data Webserver!
![enter image description here](https://imgs.xkcd.com/comics/cia.png)

This is the ViriCiti Vehicle Data Webserver it listens to raw data from `nats` and send those data over `WebSocket`. It also have a webserver that serves `html` page to display those data on port `3000`.

You need `nats` to be deployed before this application can run properly.

To run this app all you need to do is:
```
npm i
npm start
```
Then open your browser and go to `http://localhost:3000`

All configurations are stored on `/config` folder, It consist of `default` and `production` config, and to run this app on production make sure that you have an environment variable `NODE_EV` with value `production`

Building docker container for this app is easy, run this following command and you're done:
```
docker build --tag webserver:version .
```