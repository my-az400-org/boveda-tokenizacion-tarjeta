/* eslint-disable no-param-reassign */
const DynamoDB = require('../../libs/aws/app.dynamodb');

module.exports = {
  async guardarInfoTarjeta(payload) {
    console.log('INI guardarInfoTarjeta----- ');
    const params = {
      TableName: process.env.DYNAMODB_TABLE_VAULT,
      Item: payload
    };
    const result = await DynamoDB.callSingleOperation('put', params);
    console.log(`guardarInfoTarjeta result: ${JSON.stringify(result)}`);
    return result;
  }
};
