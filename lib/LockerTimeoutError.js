/**
 * Created by Jerry Wu on 7/31/15.
 */


/**
 * `LockerTimeoutError` error.
 *
 * @api public
 */
function LockerTimeoutError(message) {
  Error.call(this); //
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'LockerTimeoutError';
  this.message = message  || 'locker timeout error';
  this.status = status || 500;
}

/**
 * Inherit from `Error`.
 */
LockerTimeoutError.prototype.__proto__ = Error.prototype;


/**
 * Expose `LockerTimeoutError`.
 */
module.exports = LockerTimeoutError;