const exceptionConstant = {
  REQUEST_STRUCTURE_EXCEPTION: { code: 'ECORE-0001', message: 'Request Structure Exception' },
  VALIDATION_EXCEPTION: { code: 'ECORE-0002', message: 'Validation Exception' },
  REQUEST_HANDLER_EXCEPTION: { code: 'ECORE-0003', message: 'Request Handler Exception' },
  UNHANDLED_EXCEPTION: { code: 'ECORE-0004', message: 'Unhandled Exception' },
  IDENTITY_NOT_FOUND_EXCEPTION: { code: 'ECORE-0005', message: 'Identity Not Found' },
  ID_CLIENT_NOT_FOUND_EXCEPTION: { code: 'ECORE-0006', message: 'Id Client Not Found' },
  NOT_FOUND_SESSION_EXCEPTION: { code: 'ECORE-0007', message: 'User Session Not Found' },
  EXPIRED_SESSION_EXCEPTION: { code: 'ECORE-0008', message: 'User Session Expired' },
  DUPLICATED_SESSION_EXCEPTION: { code: 'ECORE-0009', message: 'Duplicated User Session Exception' },
  AUTHENTICATION_EXCEPTION: { code: 'ECORE-0010', message: 'Authentication Exception' },
  AUTHORIZATION_EXCEPTION: { code: 'ECORE-0011', message: 'Authorization Exception' }
};

module.exports = Object.freeze(exceptionConstant);
