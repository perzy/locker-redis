'use strict';

/**
 * Created by Jerry Wu on 7/30/15.
 */
var crypto = require("crypto");
var fs = require("fs");
var path = require("path");
var debug = require('debug')('redis:locker');

var releaseLua = fs.readFileSync(path.join(__dirname, './release.lua'));


function RedisLocker(name, options) {
  options = options || {};
  this.name = name;
  this.lockerPrefix = options.lockerPrefix || 'redis_locker:';
  this.timeout = options.timeout || 5000; //ms
  this.retries = options.retries || 10;
  this.retryDelay = options.retryDelay || 250;
  if (options.client && options.client.set) {
    this.client = options.client;
  } else {
    try {
      var Redis = require('ioredis');
      this.client = new Redis();
    } catch (e) {
      throw new Error("Please provide a redis client instance to lockredis constructor.")
    }
  }
}

/**
 * acquire the locker you need unit timeout.
 * @param next
 */
RedisLocker.prototype.acquire = function (next) {
  var self = this;
  this._generateToken();
  var timeout = this.timeout;

  this.client.set([this._getKey(), this.token, 'NX', 'PX', timeout], function (err, res) {
    if (err) return next(err);

    if (res !== 'OK') {
      if (self.retries > 0) {
        debug(self.retries);
        setTimeout(function () {
          self.retries--;
          self.acquire(next);
        }, self.retryDelay);
        return;
      }

      return next(new Error("Unable to acquire lock " + self.name));
    }

    // res === OK. acquire locker success.
    next(null, function (next) {
      next = next || function () {};
      self.release(next);
    });
  });
};

RedisLocker.prototype.release = function (next) {
  this.client.eval([releaseLua, 1, this._getKey(), this.token], next);
};

RedisLocker.prototype._getKey = function () {
  return this.lockerPrefix + this.name;
};

RedisLocker.prototype._generateToken = function () {
  var token = crypto.randomBytes(16).toString('hex');
  this.token = token;
};

module.exports = RedisLocker;


