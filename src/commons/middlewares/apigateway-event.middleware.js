/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
const AWSXRay = require('aws-xray-sdk');
// const jwt = require('jsonwebtoken');

let isApiGatewayRestEvent;
const bindingHeaders = [];

function isOffline(event) {
  return event.isOffline;
}

function getPayload(event) {
  const payload = {
    ...event.body,
    ...event.query,
    ...event.path,
    ...getHeadersValue(event)
  };
  return payload;
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

function getHeadersValue(event) {
  const getSelectedHeaders = (selectedHeaders) => selectedHeaders.reduce((accumulator, currentValue) => {
    accumulator[currentValue.attrName] = event.headers[currentValue.headerName];
    return accumulator;
  }, {});

  return bindingHeaders.reduce((accumulator, currentValue) => {
    accumulator[currentValue.payloadAttrName] = getSelectedHeaders(currentValue.selectedHeaders);
    return accumulator;
  }, {});
}

module.exports = (options) => {
  return {
    async before(handler) {
      const { origin } = handler.event;
      console.log('app.apigateway-event.middleware');
      console.log(`Origin: ${origin}`);
      isApiGatewayRestEvent = (origin === 'API_GATEWAY_REST_EVENT');

      if (isApiGatewayRestEvent) {
        console.log('ApiGatewayEvent - Event');
        console.log(handler.event);
        console.log('ApiGatewayEvent - Context');
        console.log(handler.context);

        const { event } = handler;
        process.env.IS_OFFLINE = isOffline(event);

        const { passthrough } = options || {};
        if (!passthrough) {
          const action = getAction(event);
          const payload = await getPayload(event);
          // setear session
          // const headerToken = CommonUtils.getHeaderToken(event);
          let headerToken = '';
          if (event && event.headers && event.headers.Authorization) {
            headerToken = event.headers.Authorization;
          } else {
            headerToken = event.authorizationToken;
          }
          if (headerToken) {
            payload.headerToken = headerToken.replace('Bearer ', '');
            // payload.
            // const decoded = await jwt.decode(headerToken, { complete: true });
            // console.log('API Gateway decoded: ', decoded);
            // payload.session = decoded.payload;
            // const actionsAnonimo = ['consultarDetalleProducto'];
            // if (payload.session.rol === 'ANONIMO' && !actionsAnonimo.includes(action)) {
            //   throw ({ message: 'El perfil de la sesion no tiene acceso a este componente.' });
            // }
          } else {
            throw ({ message: 'No existe un token en la cabecera.' });
          }

          handler.event = { origin, action, payload };

          console.log('ApiGatewayEvent - Origin');
          console.log(handler.event.origin);
          console.log('ApiGatewayEvent - Action');
          console.log(handler.event.action);
          console.log('ApiGatewayEvent - Payload');
          console.log(handler.event.payload);
        }

        _addXray();
      }
    },
    async after(handler) {
      if (isApiGatewayRestEvent) {
        const { action } = handler.event;
        let payload = {};

        const { passthrough } = options || {};
        if (passthrough) {
          payload.headers = handler.event.headers;
          payload.path = handler.event.path;
          payload.body = handler.event.body ? handler.event.body : undefined;
          payload.query = handler.event.query;
          payload.httpMethod = handler.event.httpMethod;
        } else {
          payload = handler.event.payload;
        }
        const functionToExecute = handler.response[action];
        // exception.throw(!functionToExecute);
        const data = await functionToExecute(payload);
        // handler.response = JSON.stringify({ payload: data });
        handler.response = JSON.stringify({ ...data });
        console.log('ApiGatewayEvent - Success Response');
        console.log(handler.response);
      }
    },
    async onError(handler) {
      if (isApiGatewayRestEvent) {
        console.error('ApiGatewayEvent - Error Response');
        console.error(handler.error);
        console.log('handler.error.message::', handler.error.message);
        console.log('handler::', handler);
        const error = {
          ...handler.error
        };
        // delete error.name;
        // error.httpStatus = 500;
        return Promise.reject(JSON.stringify({ error })); // handler.error.message
      }
    },
    bindHeader(payloadAttrName, selectedHeaders) {
      bindingHeaders.push({
        payloadAttrName,
        selectedHeaders
      });
      return this;
    }
  };
};
