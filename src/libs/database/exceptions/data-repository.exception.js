class DataRepositoryException extends Error {
  constructor(
    code,
    message,
    exception
  ) {
    super();
    this.code = code;
    this.message = Array.isArray(message) ? message : [message];
    this.name = 'DataRepositoryException';
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
}

module.exports = DataRepositoryException;
