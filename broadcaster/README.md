
# ViriCiti Random Vehicle Data Generator!
![](https://imgs.xkcd.com/comics/random_number.png)

This is the  ViriCiti Random Vehicle Data Generator or VRVDG (read ver-ved-geh) in short.
We've deviced a cool (not so) random vehicle data generator for you to use as a base. It basically read out `.csv` data that is located on `/meta` and broadcast out each row in `nats`.

All configurations are stored on `/config` folder, It consist of `default` and `production` config, and to run this app on production make sure that you have an environment variable `NODE_ENV` with value `production`

Building docker container for this app is easy, run this following command and you're done:
```
docker build --tag broadcaster:version .
```

Happy Coding!