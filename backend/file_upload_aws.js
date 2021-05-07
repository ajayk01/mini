const AWS = require('aws-sdk');
const fs = require('fs');
const ID = 'ASIAR6VRTUKZ43MW6NEO';
const SECRET = 'ehKnRu35f5Ey9HmI/1PGyoH/aMMh0Z4Hioi+j91T';
const token='IQoJb3JpZ2luX2VjEIX//////////wEaCXVzLXdlc3QtMiJGMEQCIHgglm6migqFKAGk2IKh8aLUgXsSLzwCSY7nqgWNVkgyAiA0zswJpk+eAiBdwT5T+2zAajV4NOXbNq6QGRaMF2URWyq2Agju//////////8BEAAaDDEzNDU5MDIxMDczOSIM+J/gl7+xX6/2N0c6KooCuL/boCo/ihWVXGPI5Fn7H87MSPSFaZXD1Fy+KcQ8Q7H1A5GaY8urMgI/CISODmTghileM3fYVEeYWjofMZB+eG9owabJ1MUUFWktR+OUTZp7Yoep/XUjXJYwMUZtUaQU7dAqb8M36tx3/aP3hqpjVXj08S7jEfr9uODosyfunzsJLfbtwpdjBxvCUqQvR4UxSh4jVtnVSqgXRsbN59RsLHfkO90tKH267jUK6ldZWRJ8HGLz2VknikmQEcJyhWlrnWeLyhi6TaJGddJHAdQkXhyCEmBP6N827mpMZenSrHRoy2BrrBEIRx14kTJWeOy8ajqi/A4B04OXLpoDWxhKMIzdOSjVNfv1/FUwxbKQhAY6ngGvYVap5zj7hDxwLJO2i6kXnSPgcgHNaUN81jGKG/VqGQKq20+lWyIdlGbwLsJB/9qIQHPTbORt/lXShuQS8Zyz7LTYeBgKdt735R81gelwELvUehTKwduN2jgDHHii6/PXPNoWw3hCAUOXxHiym8hrOxFXsAtfKT33moFk5NOdTHhFNzT6rSObX5uFgVbW9zMedOCh44rpCPfM6iezqQ==';
const BUCKET_NAME = 'ajay-0111';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    sessionToken:token

});

const uploadFile = (fileName,key) => {
    
    const fileContent = fs.readFileSync(fileName);
    console.log("Inside aws");
    
    const params = {
        Bucket: 'sample-0111',
        Key: key, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        return  data.Location;
    });
};
exports.uploadFile = uploadFile;
