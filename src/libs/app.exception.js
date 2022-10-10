const AppCore = require('./app.core');

class AppException extends Error {
  constructor(
    code = '0000',
    message = 0,
    exception
  ) {
    super();
    if (AppCore.isEmpty(code, message)) {
      throw new Error('Code and message are required');
    }

    this.code = code;
    this.message = Array.isArray(message) ? message : [message];
    this.name = 'AppException';
    if (exception) {
      console.error(exception);
    }
  }

  throw(condition) {
    const appException = this;
    if (typeof condition === 'undefined') {
      throw appException;
    }
    if (condition instanceof Function) {
      if (condition()) {
        throw appException;
      }
    }
    if (condition) {
      throw appException;
    }
  }

  toString() {
    return JSON.stringify({ code: this.code, message: this.message });
  }
}

module.exports = AppException;
