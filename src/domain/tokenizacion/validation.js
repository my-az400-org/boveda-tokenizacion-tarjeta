/* eslint-disable import/order */
const { HttpConstant } = require('../../libs/app.constant');
const AppCore = require('../../libs/app.core');
const AppValidator = require('../../libs/validator/app.validator');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { CREDIT_CARD } = require('./utils/domain.constant');
const ErrorConstant = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {
  async generarToken(payload) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      cardNumber: Joi.number().integer().min(CREDIT_CARD.MIN_NUMBER).max(CREDIT_CARD.MAX_NUMBER)
        .required(),
      cvv: Joi.number().integer().min(CREDIT_CARD.MIN_CVV).max(CREDIT_CARD.MAX_CVV)
        .required(),
      expirationYear: Joi.string().length(4).required(),
      expirationMonth: Joi.string().length(2).required(),
      header_token: Joi.string().required()
    });
    await AppValidator.validate(schema, payload).catch((reason) => {
      new CustomException(
        ErrorConstant.ERROR_ESTRUCTURA.code,
        ErrorConstant.ERROR_ESTRUCTURA.message,
        reason.message, null,
        HttpConstant.BAD_REQUEST_STATUS.code
      ).throw(!AppCore.isEmpty(reason));
    });
  }
};
