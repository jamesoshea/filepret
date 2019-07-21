const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
const s3 = new AWS.S3();

module.exports.S3GetObjectPromisified = fileName => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "host-with-the-most",
      Key: fileName
    };
    s3.getObject(params, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

module.exports.S3PutObjectPromisified = (fileName, data) => {
  return new Promise((resolve, reject) => {
    try {
      s3.putObject(
        {
          Bucket: "host-with-the-most",
          Key: fileName.slice(5),
          Body: data,
          ACL: "public-read"
        },
        response => {
          resolve(response);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
