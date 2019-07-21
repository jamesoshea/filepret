const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

module.exports.S3PutObjectPromisified = (fileName, data) => {
  const s3 = new AWS.S3();
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
