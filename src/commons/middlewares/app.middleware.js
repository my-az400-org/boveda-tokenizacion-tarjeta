const middy = require('@middy/core');
const LambdaEvent = require('./lambda-event.middleware');

module.exports.addMiddleware = addMiddleware;
module.exports.bootstrap = bootstrap;

let _middlewares = [];

function bootstrap(controller) {
  console.log('init bootstrap');
  const handler = middy(async () => controller);
  _middlewares.forEach((obj) => {
    handler.use(obj);
  });
  handler.use(LambdaEvent());
  _middlewares = [];
  return handler;
}

function addMiddleware(middleware) {
  _middlewares.push(middleware);
}
