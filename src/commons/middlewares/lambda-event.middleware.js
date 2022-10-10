/* eslint-disable no-param-reassign */
const AWSXRay = require('aws-xray-sdk');

let isLambdaEvent;

function isOffline(event) {
  return event.isOffline;
}

async function getPayload(event) {
  const bool = isLambdaEvent;
  if (bool) {
    return event.payload;
  }
  return null;
}

function getAction(event) {
  return event.action;
}

function _addXray() {
  if (process.env.IS_OFFLINE) {
    AWSXRay.setContextMissingStrategy('LOG_ERROR');
  }
  // eslint-disable-next-line global-require
  AWSXRay.captureHTTPsGlobal(require('http'));
  // eslint-disable-next-line global-require
  AWSXRay.captureHTTPsGlobal(require('https'));
}

module.exports = () => {
  return {
    async before(handler) {
      const { origin } = handler.event;
      console.log('app.lambda-event.middleware');
      console.log(`Origin: ${origin}`);
      isLambdaEvent = (origin === 'LAMBDA_EVENT');

      if (isLambdaEvent) {
        console.log('LambdaEvent - Request');
        console.log(handler.event);
        console.log(handler.context);

        const { event } = handler;
        process.env.IS_OFFLINE = isOffline(event);
        const action = getAction(event);
        const payload = await getPayload(event);
        handler.event = { action, payload };
        console.log(handler.event);
        _addXray();
      }
    },
    async after(handler) {
      if (isLambdaEvent) {
        const { action, payload } = handler.event;
        const functionToExecute = handler.response[action];
        const data = await functionToExecute(payload);
        handler.response = JSON.stringify({ payload: data });
        console.log('LambdaEvent - Success Response');
        console.log(handler.response);
      }
    },
    async onError(handler) {
      if (isLambdaEvent) {
        console.error('LambdaEvent - Error Response');
        console.error(handler.error);
        const error = {
          ...handler.error
        };
        delete error.name;
        error.httpStatus = 400;
        return Promise.reject(JSON.stringify({ error }));
      }
      return null;
    }
  };
};
