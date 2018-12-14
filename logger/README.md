# ViriCiti Vehicle Data Generator Logger!
![enter image description here](https://imgs.xkcd.com/comics/eyelash_wish_log.png)

This is the ViriCiti Vehicle Data Generator Logger it logs data from `nats` and store them on `mongodb`
You need `mongodb` and `nats` to be deployed before this application can run properly.

To run this app all you need to do is:
```
npm i
npm start
```
All configurations are stored on `/config` folder, It consist of `default` and `production` config, and to run this app on production make sure that you have an environment variable `NODE_ENV` with value `production`

Building docker container for this app is easy, run this following command and you're done:
```
docker build --tag logger:version .
```