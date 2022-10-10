const Validation = require('./validation');
const Service = require('./service');

module.exports = {
  async generarToken(payload) {
    console.log('----- generarToken -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.generarToken(payload);
    const result = await Service.generarToken(payload);
    return result;
  }
};
