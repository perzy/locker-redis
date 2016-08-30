# locker-redis

[![NPM Version][npm-image]][npm-url]

## Installation

```bash
$ npm install locker-redis
$ npm install ioredis
```

## API


```js
var RedisLocker = require('locker-redis');
var LockerTimeoutError = require('locker-redis').LockerTimeoutError;
var redisLocker = new RedisLocker(lockerName, options);
```

### RedisLocker(name,options)

RedisLocker class

### RedisLocker#acquire(function next(){})
 
Acquire redisLocker retry some times.If timeout then throw error.

```js
redisLocker.acquire(function (err) {
  if (err) {
    return callback(new Error());
  }
  callback(null);
});
```

### RedisLocker#release(function next(){})

Release this redisLocker

```js
redisLocker.release();
```


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/locker-redis.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/locker-redis
