const exceptionConstant = {
  DATABASE_EXCEPTION: { code: 'EDARE-0001', message: 'Database Exception' },
  DATABASE_TIMEOUT_EXCEPTION: { code: 'EDARE-0003', message: 'Database Timeout Exception' },
  INVALID_STATEMENT_DATABASE_EXCEPTION: { code: 'EDARE-0004', message: 'Invalid Statement Database Exception' },
  DATABASE_CONNECTION_IN_USE_EXCEPTION: { code: 'EDARE-0008', message: 'The current database connection is in use' }
};

module.exports = Object.freeze(exceptionConstant);
