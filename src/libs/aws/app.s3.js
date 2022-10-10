/* eslint-disable no-param-reassign */
const aws = require('aws-sdk');

class S3 {
  /**
   * Get object from bucket
   *
   * @static
   * @param {object} { bucketName = 'examplebucket',
   *     filePath = 'documnetos/reporte.pdf',
   *   }
   * @param {object} [config={}]
   * @returns object with content file as buffer
   * @memberof S3
   */
  static async getObject({
    bucketName = '',
    filePath = ''
  }, config = {}) {
    let result;
    config.apiVersion = '2006-03-01';
    const requestBucket = {
      Bucket: bucketName,
      Key: filePath
    };
    try {
      const s3 = new aws.S3(config);
      const responseBucket = await s3.getObject(requestBucket).promise();
      result = {
        // contentLength: responseBucket.ContentLength,
        contentType: responseBucket.ContentType,
        fileContent: responseBucket.Body,
        filePath
      };
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  static async getHeadObject({ filePath, bucketName }, config = {}) {
    let result;
    // config.apiVersion = '2006-03-01';
    const requestBucket = {
      Bucket: bucketName,
      Key: filePath
    };
    try {
      const s3 = new aws.S3(config);
      result = await s3.headObject(requestBucket).promise();
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  /**
   *
   *
   * @static
   * @param {*} {
   *     bucketName = 'examplebucket',
   *     filePath = 'documnetos/reporte.pdf',
   *     contentType = 'applicaion/pdf',
   *     fileContent = Buffer,
   *   }
   * @param {object} [config={}]
   * @memberof S3
   */
  static async putObject({
    bucketName = '',
    filePath = '',
    contentType = undefined,
    fileContent = ''
  }, config = {}) {
    config.apiVersion = '2006-03-01';
    const requestBucket = {
      Bucket: bucketName,
      Key: filePath,
      Body: fileContent,
      ContentType: contentType
    };
    try {
      // const aws = AwsSdk.getAws();
      const s3 = new aws.S3(config);
      await s3.putObject(requestBucket).promise();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} {
   *     bucketName = 'ue1stgas3pases001',
   *     filePath = 'documnetos/',
   *   }
   * @param {object} [config={}]
   * @memberof S3
   */
  static async getUrl({
    bucketName = '',
    filePath = '',
    expirationTime = 60
  }, config = {}) {
    let url;
    config.apiVersion = '2006-03-01';
    const requestBucket = {
      Bucket: bucketName,
      Key: filePath,
      Expires: expirationTime
    };
    try {
      // const aws = AwsSdk.getAws();
      const s3 = new aws.S3(config);
      url = s3.getSignedUrl('getObject', requestBucket);
    } catch (error) {
      console.log(error);
    }
    return url;
  }

  static async getIfExistFile({
    bucketName = '',
    filePath = ''
  }, config = {}) {
    let result = true;
    config.apiVersion = '2006-03-01';
    const requestBucket = {
      Bucket: bucketName,
      Key: filePath
    };
    try {
      // const aws = AwsSdk.getAws();
      const s3 = new aws.S3(config);
      await s3.headObject(requestBucket).promise();
    } catch (error) {
      console.log('error.code: ', error.code);
      if (error.code === 'NotFound') {
        result = false;
      }
    }
    return result;
  }
}

module.exports = S3;
