/* eslint-disable no-param-reassign */
const AWS = require('aws-sdk');

class DynamoDB {
  static async callSingleOperation(action, params) {
    let result;
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    try {
      result = await dynamoDb[action](params).promise();
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  static async callQueryOperation(params) {
    let result;
    const dynamoDb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.REGION });
    try {
      result = await dynamoDb.query(params).promise();
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}

module.exports = DynamoDB;
