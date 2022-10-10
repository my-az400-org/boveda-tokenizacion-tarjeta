const validationMessages = require('./validation-messages');
const ValidationException = require('./validation.exception');
const ExceptionConstant = require('./exception.constant');

module.exports.validate = async (schema, payload) => {
  const validation = schema.validate(payload, {
    allowUnknown: false,
    abortEarly: false,
    convert: false,
    errors: { language: 'spanish' },
    messages: validationMessages
  });
  if (validation.error) {
    const messagesError = [];
    validation.error.details.forEach((value) => {
      messagesError.push(value.message);
    });

    new ValidationException(
      ExceptionConstant.VALIDATION_EXCEPTION.code,
      messagesError
    ).throw();
  }
};
