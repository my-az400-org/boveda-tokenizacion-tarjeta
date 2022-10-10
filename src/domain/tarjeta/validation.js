/* eslint-disable import/order */
const { HttpConstant } = require('../../libs/app.constant');
const AppCore = require('../../libs/app.core');
const AppValidator = require('../../libs/validator/app.validator');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const ErrorConstant = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {

  async obtenerTarjeta(payload) {
    const schema = Joi.object().keys({
      header_token: Joi.string().length(16).required()
    });

    await AppValidator.validate(schema, payload).catch((reason) => {
      new CustomException(
        ErrorConstant.ERROR_ESTRUCTURA.code,
        ErrorConstant.ERROR_ESTRUCTURA.message,
        reason.message,
        HttpConstant.BAD_REQUEST_STATUS.code
      ).throw(!AppCore.isEmpty(reason));
    });
  }
};
