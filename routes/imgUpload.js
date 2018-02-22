'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs')

const gcs = storage({
    projectId: 'cool-citadel-192004',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS 
});


const bucketName = 'user_uploaded_images'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {

  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if(!req.file) return next();

  // file names store in bucket must be unique 
  const original = req.file.originalname;
  const uniqueGCSName = original.substring(0, original.lastIndexOf(".")) + Date.now() + original.substring(original.lastIndexOf("."));
  const file = bucket.file(uniqueGCSName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    
    req.file.cloudStorageError = err;
    console.log('on stream error', err)
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = uniqueGCSName;
    req.file.cloudStoragePublicUrl = getPublicUrl(uniqueGCSName);
    next();
  });

  stream.end(req.file.buffer);
}

module.exports = ImgUpload;