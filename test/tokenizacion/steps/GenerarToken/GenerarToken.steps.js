const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const { handler } = require('../../../../src/domain/tokenizacion/app');
const GenerarTokenInput = require('../../input/GenerarTokenInput');
const GenerarTokenOutput = require('../../output/GenerarTokenOutput');
const EventDefault = require('../../util/EventDefault');
const { ACTIONS } = require('../../util/Constants');
const { DATA_GUARDAR_INFO_TARJETA } = require('./mocks/DataMock');

const DataAccess = require('../../../../src/domain/tokenizacion/data-access');

describe('API TOKENIZADOR', () => {
  test('Generar token - caso exitoso', async () => {
    const payloadInput = GenerarTokenInput.SUCCESS;
    let response;
    const requestEvent = EventDefault.getEventDefault(ACTIONS.GENERAR_TOKEN);
    requestEvent.body = payloadInput;
    jest.spyOn(DataAccess, 'guardarInfoTarjeta').mockImplementation(() => DATA_GUARDAR_INFO_TARJETA);
    try {
      response = await handler(requestEvent);
      response = JSON.parse(response);
    } catch (error) {
      response = JSON.parse(error.toString());
    }
    console.log('response jest -> ', JSON.stringify(response));
    expect(response.data).toBeDefined();
    expect(response.indValidacion).toBe(GenerarTokenOutput.SUCCESS.indValidacion);
    expect(response.msj).toBe(GenerarTokenOutput.SUCCESS.msj);
  });
});
