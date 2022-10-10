module.exports.getEventDefault = (actionCtr) => {
  const eventDefaultRequest = {
    origin: 'API_GATEWAY_REST_EVENT',
    action: actionCtr,
    body: '',
    headers: {
      clientId: '6e390435-ee63-4cc2-abd8-24626945b266',
      Authorization: 'pk_test_123456789'
    },
    query: {},
    path: {},
    accountId: '$context.accountId',
    apiId: '$context.apiId',
    authorizer: {
      principalId: '$context.authorizer.principalId',
      claims: {},
      context: {}
    },
    awsEndpointRequestId: '$context.awsEndpointRequestId',
    domainName: '$context.domainName',
    domainPrefix: '$context.domainPrefix',
    error: {},
    extendedRequestId: '$context.extendedRequestId',
    httpMethod: '$context.httpMethod',
    identity: {
      apiKey: '$context.identity.apiKey',
      apiKeyId: '$context.identity.apiKeyId'
    },
    stageVariables: {},
    requestPath: '$context.path',
    protocol: '$context.protocol',
    requestId: '$context.requestId',
    requestTime: '$context.requestTime',
    requestTimeEpoch: '$context.requestTimeEpoch',
    resourceId: '$context.resourceId',
    resourcePath: '$context.resourcePath',
    stage: '$context.stage',
    wafResponseCode: '$context.wafResponseCode',
    webaclArn: '$context.webaclArn',
    xrayTraceId: '$context.xrayTraceId'
  };
  return eventDefaultRequest;
};
