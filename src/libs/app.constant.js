module.exports.HttpConstant = {
  OK_STATUS: { code: 200, description: 'OK' },
  CREATED_STATUS: { code: 201, description: 'CREATED' },
  NO_CONTENT_STATUS: { code: 204, description: 'NO CONTENT' },
  BAD_REQUEST_STATUS: { code: 400, description: 'BAD REQUEST' },
  UNAUTHORIZED_STATUS: { code: 401, description: 'UNAUTHORIZED' },
  FORBIDDEN_STATUS: { code: 403, description: 'FORBIDDEN' },
  NOT_FOUND_STATUS: { code: 404, description: 'NOT FOUND' },
  UNPROCESSABLE_ENTITY_STATUS: { code: 422, description: 'UNPROCESSABLE ENTITY' },
  INTERNAL_SERVER_ERROR_STATUS: { code: 500, description: 'INTERNAL SERVER ERROR' },
  BAD_GATEWAY_STATUS: { code: 502, description: 'BAD GATEWAY' },
  GATEWAY_TIMEOUT_STATUS: { code: 504, description: 'GATEWAY TIMEOUT' },
  METHODS: {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete'
  }
};

module.exports.AppConstant = {
  REQUEST_LMB_CONSUMER: 'LMB',
  REQUEST_AWS_CONSUMER: 'AWS',
  TRACE_START_MESSAGE: 'TRACE START:',
  TRACE_END_MESSAGE: 'TRACE END:',
  INTERNAL_ERROR: { code: 'ERROR-001', description: 'Internal Error' },
  REQUEST_BODY_ERROR: { code: 'ERROR-002', message: 'Request Structure Body Error' },
  VALIDATION_ERROR: { code: 'ERROR-003', description: 'Data Validation Error' },
  REQUEST_HANDLER_ERROR: { code: 'ERROR-004', description: 'Request Handler Error' },
  UNHANDLED_ERROR: { code: 'ERROR-005', description: 'Unhandled Error' },
  REQUEST_LAMBDA_ERROR: { code: 'ERROR-006', description: 'Request Lambda Error' },
  SEND_EMAIL_ERROR: { code: 'ERROR-007', description: 'Send Email Error' },
  IDENTITY_NOT_FOUND: { code: 'ERROR-0008', description: 'Identity Not Found' },
  ID_CLIENT_NOT_FOUND: { code: 'ERROR-0009', description: 'Id Client Not Found' },
  USER_SESSION_NOT_FOUND: { code: 'ERROR-0010', description: 'User Session Not Found' },
  USER_SESSION_EXPIRED: { code: 'ERROR-0011', description: 'User Session Expired' },
  DUPLICATED_SESSION_ERROR: { code: 'ERROR-0012', description: 'Duplicated Session Error' }
};

module.exports.AWSConstant = {
  LAMBDA_ERROR: { code: 'CLOUD-ERROR-001', description: 'Lambda Error' },
  DYNAMODB_ERROR: { code: 'CLOUD-ERROR-002', description: 'Dynamodb Error' },
  SSM_ERROR: { code: 'CLOUD-ERROR-003', description: 'SSM Error' },
  SQS_ERROR: { code: 'CLOUD-ERROR-004', description: 'SQS Error' },
  S3_ERROR: { code: 'CLOUD-ERROR-005', description: 'S3 Error' },
  SNS_ERROR: { code: 'CLOUD-ERROR-006', description: 'SNS Error' },
  KINESIS_ERROR: { code: 'CLOUD-ERROR-007', description: 'Kinesis Error' },
  DYNAMODB: {
    API_VERSION: '2012-08-10',
    TRANSACTION_MAX_ITEMS: 10
  },
  LAMBDA: {
    API_VERSION: '2015-03-31'
  },
  SSM: {
    API_VERSION: '2014-11-06'
  },
  S3: {
    API_VERSION: '2006-03-01'
  },
  SNS: {
    API_VERSION: '2010-03-31'
  },
  SQS: {
    API_VERSION: '2012-11-05'
  }
};
