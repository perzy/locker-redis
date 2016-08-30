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
```

### RedisLocker(name,options)

RedisLocker class

```js
var lockerName = 'user:100:account';
var options = {};
var redisLocker = new RedisLocker(lockerName, options);
```

### RedisLocker#acquire(function next(){})
 
Acquire redisLocker retry some times.If timeout then throw error.

```js
redisLocker.acquire(function (err, release) {
  if (err) {
    return callback(new Error());
  }
  
  // release();  You can call release function here to exec redis locker release.
  callback(null);
});
```

### RedisLocker#release(function next(){})

Release this redisLocker

```js
redisLocker.release();
```

## Use generator version for koa

[co-redis-locker](https://github.com/perzy/co-redis-locker)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/locker-redis.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/locker-redis
