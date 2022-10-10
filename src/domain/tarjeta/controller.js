const Validation = require('./validation');
const Service = require('./service');

module.exports = {

  async obtenerTarjeta(payload) {
    console.log('----- obtenerTarjeta -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.obtenerTarjeta(payload);
    const result = await Service.obtenerTarjeta(payload);
    return result;
  }

};
