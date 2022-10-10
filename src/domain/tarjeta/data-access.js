/* eslint-disable no-param-reassign */
const DynamoDB = require('../../libs/aws/app.dynamodb');

module.exports = {
  async obtenerInfoTarjeta(payload) {
    console.log('INI obtenerInfoTarjeta----- ');
    const params = {
      TableName: process.env.DYNAMODB_TABLE_VAULT,
      KeyConditionExpression: '#token = :token',
      ExpressionAttributeNames: {
        '#token': 'token'
      },
      ExpressionAttributeValues: {
        ':token': payload.token
      }
    };
    const result = await DynamoDB.callQueryOperation(params);
    console.log(`obtenerInfoTarjeta result: ${JSON.stringify(result)}`);
    return result.Items;
  }

};
