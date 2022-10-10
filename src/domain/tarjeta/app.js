const AppFactory = require('../../commons/middlewares/app.middleware');
const ApiGatewayEvent = require('../../commons/middlewares/apigateway-event.middleware');

const controller = require('./controller');

AppFactory.addMiddleware(ApiGatewayEvent());

module.exports.handler = AppFactory.bootstrap(controller);
