const { HttpConstant } = require('./app.constant');

module.exports = class {
  static async buildErrorResponse(event, context, callback, error) {
    context.callbackWaitsForEmptyEventLoop = false;
    const response = {
      payload: null,
      status: {
        success: false,
        error
      }
    };

    if (this.isLambdaProxyIntegration(event)) {
      callback(null, {
        statusCode: error.httpCode,
        body: JSON.stringify(response),
        headers: {
          'Access-Control-Allow-Origin': process.env.ORIGIN || '*',
          'Access-Control-Allow-Credentials': true,
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'X-Frame-Options': 'SAMEORIGIN',
          'Referrer-Policy': 'no-referrer-when-downgrade',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        }
      });
      return;
    }

    if (this.isLambdaIntegration(event)) {
      callback(JSON.stringify(response));
      return;
    }
    callback(null, response);
  }

  static async buildResponse(event, context, callback, payload) {
    context.callbackWaitsForEmptyEventLoop = false;
    const response = {
      payload,
      status: {
        success: true
      }
    };

    if (this.isLambdaProxyIntegration(event)) {
      callback(null, {
        statusCode: HttpConstant.OK_STATUS.code,
        body: JSON.stringify(response),
        headers: {
          'Access-Control-Allow-Origin': process.env.ORIGIN || '*',
          'Access-Control-Allow-Credentials': true,
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'X-Frame-Options': 'SAMEORIGIN',
          'Referrer-Policy': 'no-referrer-when-downgrade',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        }
      });
      return;
    }
    if (this.isLambdaIntegration(event)) {
      callback(null, JSON.stringify(response));
      return;
    }
    callback(null, response);
  }

  static isLambdaProxyIntegration(event) {
    return !!event.requestContext;
  }

  static isLambdaIntegration(event) {
    return !!event.requestPath;
  }

  static getPayloadRequest(event) {
    const requestBody = this.getRequestBody(event);
    console.log(`payload: ${JSON.stringify(requestBody.payload)}`);
    return requestBody.payload;
  }

  static isEmpty(...valores) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < valores.length; i++) {
      const valor = valores[i];
      if ([null, undefined, 'undefined', 'null', '', 0, false, 'false', []].includes(valor)
      || (Array.isArray(valor) && valor.length === 0)
      || (valor.constructor === Object && Object.entries(valor).length === 0)) {
        return true;
      }
    }
    return false;
  }

  static getRequestBody(event) {
    let requestbody = event;
    if (this.isLambdaProxyIntegration(event)) {
      requestbody = JSON.parse(event.body);
      if (requestbody.request) requestbody = requestbody.request;
      return requestbody;
    }
    if (event.body) {
      requestbody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      return requestbody;
    }
    return requestbody;
  }
};
