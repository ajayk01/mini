const AWS = require('aws-sdk');
const fs = require('fs');
const ID = 'ASIAR6VRTUKZQW6YXXPY';
const SECRET = 'IWC26w173VowDeIi0zVJLljTgYAMDd/DhP/vrSY6';
const token='IQoJb3JpZ2luX2VjEO///////////wEaCXVzLXdlc3QtMiJHMEUCIQDf1azLgHL9XMzkrYxfpYG5tWFtd2NvqJ/qxgRiJ1jPHAIgX24rIJjO2bGCG8wLfvOdxednuAd5zBjJhow5ysOpP4gqrQIIeBAAGgwxMzQ1OTAyMTA3MzkiDBAS+ktTUJ4JAjGogyqKAtb8pV/eBtRtwAZxDD86/GdEvM8VQdxyY0O11eaFqiHt7gzkTgYkrHVb+T7YoWtWHqtnOym+/wzwF3f25ZDx2L3CKTLaPzvPXjjlSKDLCnTk40o2Ppx3hzx3G0smSXmYw6QJ5Tol+byJwLmxkuflYj0WD3IhOKqeQgLOMEHcDAiAvR6WVJOUDyCdzGkVUoWtMg8fSAkMi8ouVZOeOh4bTwtAHkA0dRYrS0PC9/IRigM47NUgb+/YtO8cSmfZ7YXX/9XO/GXf5zuMsvrmBMdS3iWBllqTc+hzJ/0oJ6KPyUWJIfbNSkkPdjrItZox2N4eC+WFFlPlscfngc15PMczHyu9t4CqRW7pQmHOMObg34QGOp0BO0g5Z49jHNgBhzL9Eet23Z5qrH65ubZ0Ruy/MwGq5KyJGM4zMp7A/pZuD79kTUPQA+aTrY8Eof6DMgw+OQEuEO1cH/P/V6bNTC7V+KZpei/bFQII5zSdv6O0iOnBo1DRh4/nBgqaB4jBEBIJTjfCJZCpLn5zLqTQs1pDSkunqqf3GuabnnlCY5DwmCGaGaeRnYLyuRoDG0sz4Qm6uQ==';
const BUCKET_NAME = 'ajay-0111';
var url;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    sessionToken:token

});

const uploadFile = (fileName,key) => {
    
    
    console.log("Inside aws");
    
    const params = {
        Bucket: 'sample-0111',
        Key: key, 
        Body: fileName
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        url =  data.Location;
    });
};
exports.uploadFile = uploadFile;
