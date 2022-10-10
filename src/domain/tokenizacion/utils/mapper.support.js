/* eslint-disable no-param-reassign */
const { RESPONSE_MENSAJES } = require('./domain.constant');

module.exports = {
  mapperInsertResponse(data) {
    const response = {
      data,
      indValidacion: 1,
      msj: RESPONSE_MENSAJES.INSERT_DATA
    };
    return response;
  },
  mapperDataResponse(data) {
    const response = {
      data,
      indValidacion: 1,
      msj: data.length === 0 ? RESPONSE_MENSAJES.EMPTY_DATA_LIST : RESPONSE_MENSAJES.FULL_DATA_LIST
    };
    return response;
  }
};
