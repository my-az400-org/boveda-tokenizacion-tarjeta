class ValidationException extends Error {
  constructor(
    code,
    message,
    exception
  ) {
    super();
    this.code = code;
    this.message = Array.isArray(message) ? message : [message];
    this.name = 'ValidationException';
    if (exception) {
      console.error(exception);
    }
  }

  throw(condition) {
    const validationException = this;
    if (typeof condition === 'undefined') {
      throw validationException;
    }
    if (condition instanceof Function) {
      if (condition()) {
        throw validationException;
      }
    }
    if (condition) {
      throw validationException;
    }
  }
}

module.exports = ValidationException;
