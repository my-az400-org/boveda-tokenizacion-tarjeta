/* eslint-disable no-param-reassign */
const DataAccess = require('./data-access');
// const ServiceSupport = require('./utils/service.support');
const MapperSupport = require('./utils/mapper.support');
const ErrorConstant = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {

  async obtenerTarjeta(event) {
    console.log('service: obtenerTarjeta');
    let errorMessage = null;
    try {
      const { headerToken } = event;

      const dataTarjeta = await DataAccess.obtenerInfoTarjeta({ token: headerToken });

      // validacion username único
      if (!dataTarjeta) {
        errorMessage = 'No existe información con el token brindado en la base de datos.';
        throw new CustomException(
          ErrorConstant.ERROR_FUNCIONAL.code,
          ErrorConstant.ERROR_FUNCIONAL.message,
          [errorMessage], null,
          ErrorConstant.ERROR_FUNCIONAL.httpCode
        );
      }
      const { expirationYear, expirationMonth, cardNumber, email } = dataTarjeta[0];
      const infoTarjeta = {
        expirationYear,
        expirationMonth,
        cardNumber,
        email,
      };
      return MapperSupport.mapperDataResponse(infoTarjeta);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:obtenerTarjeta.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  }
};
