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
      const { token } = event;

      const dataTarjeta = await DataAccess.obtenerInfoTarjeta({ token });

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
      const infoTarjeta = dataTarjeta[0];
      delete infoTarjeta.ccv;
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