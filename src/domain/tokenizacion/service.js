/* eslint-disable no-param-reassign */
const moment = require('moment-timezone');
const DataAccess = require('./data-access');
const ServiceSupport = require('./utils/service.support');
const MapperSupport = require('./utils/mapper.support');
const DomainConstant = require('./utils/domain.constant');
const { ERROR_FUNCIONAL } = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {
  async generarToken(event) {
    console.log('service: generarToken');
    let errorMessage = null;
    try {
      // validar dominios de correo
      const { email, cardNumber, expirationYear } = event;
      let countDomainValid = 0;
      DomainConstant.MAIL_DOMAIN_VALID.forEach((element) => {
        if (email.includes(element)) {
          countDomainValid += 1;
        }
      });
      if (countDomainValid === 0) {
        errorMessage = 'Dominio de correo no autorizado.';
        throw new CustomException(
          ERROR_FUNCIONAL.code, ERROR_FUNCIONAL.message, [errorMessage], {}, ERROR_FUNCIONAL.httpCode
        );
      }
      // validar algoritmo luhn
      // if (ServiceSupport.isValidLuhn(cardNumber)) {
      //   errorMessage = 'Tarjeta no cumple con algoritmo Luhn.';
      //   throw new CustomException(
      //     ERROR_FUNCIONAL.code, ERROR_FUNCIONAL.message, [errorMessage], {}, ERROR_FUNCIONAL.httpCode
      //   );
      // }
      // validar hasta 5 años despues del año actual
      const anioActual = moment().format('YYYY');
      const anioMaxValid = Number(anioActual) + DomainConstant.CREDIT_CARD.MAX_VALUE_ANIOS;
      if (Number(expirationYear) > anioMaxValid) {
        errorMessage = 'El año se encuentra fuera de rango de periodo máximo establecido.';
        throw new CustomException(
          ERROR_FUNCIONAL.code, ERROR_FUNCIONAL.message, [errorMessage], {}, ERROR_FUNCIONAL.httpCode
        );
      }

      const tokenGenerated = ServiceSupport.generarTokenTarjeta(16);
      const nowTime = moment();
      const expirationTime = nowTime.add(15, 'minutes');
      const tlsGenerated = expirationTime.valueOf();
      console.log('tlsGenerated::: ', tlsGenerated);
      const infoTarjeta = {
        token: tokenGenerated,
        tls: tlsGenerated, // expiracion del registro
        ...event
      };
      const result = await DataAccess.guardarInfoTarjeta(infoTarjeta);
      console.log(`info credit card saved: ${JSON.stringify(result)}`);
      return MapperSupport.mapperInsertResponse({ token: tokenGenerated });
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ERROR_FUNCIONAL.code,
        ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:crearProducto.'],
        null,
        ERROR_FUNCIONAL.httpCode
      );
    }
  }
};
