const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

module.exports = (data) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: process.env.S3_FILE_NAME,
    Body: data,
  };

  s3.upload(params, (err) => {
    console.log("S3 Upload Error", err);
  });
};
