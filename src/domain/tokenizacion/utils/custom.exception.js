const AppException = require('../../../libs/app.exception');

class CustomException extends AppException {
  constructor(
    code,
    message,
    details,
    params,
    httpStatus,
    exception
  ) {
    super(code, message);
    this.name = 'CustomException';
    this.message = message;
    if (details) this.details = details; // Detail Array
    if (params) this.params = params;
    this.httpStatus = httpStatus;
    if (exception) {
      console.error(exception);
    }
  }
}

module.exports = CustomException;
