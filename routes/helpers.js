const helpers = {
// Creates an array of all the photo_ids
    createIdArray: (tags) => {
        const idArray = [];
        tags.forEach(tag => idArray.push(tag.photo_id))
        return idArray;
    },

    // Finds the id that appears most in idArray.
    mostFreqId: (idArr) => {
        const idMap = {};
        let maxId = null;
        let max = 0;
        idArr.forEach(id => {
            idMap[id] = idMap[id] +1 || 1
        })
        for (let id in idMap) {
            if(idMap[id] > max) {
                max = idMap[id];
                maxId = id;
            }
        }
        return maxId
    }, 
    
    //use the file uploaded by dropzone and multer to make the google vision call
    detectLabels: async (filePath) => {
        console.log('file path', filePath)
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        projectId: 'cool-citadel-192004',
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS 
      });
    // Performs label detection on the local file
    const results = await (
        client
          .labelDetection(filePath)
          .then(results => {
            const labels = results[0].labelAnnotations;
            const tagsArray = helpers.createTagsArray(labels);
            return tagsArray;
          })
          .catch(err => {
            console.error('ERROR:', err);
          })
    )
    return results;
  },

  submit: function copyFile(fileName) {

    const Storage = require('@google-cloud/storage');
 
    const storage = new Storage({
        projectId: 'cool-citadel-192004',
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS 
      });

    const srcBucketName = 'user_uploaded_images';
    const srcFilename = fileName;
    const destBucketName = 'submitted_images';
    const destFilename = fileName;
  
    // Copies the file to the other bucket
    storage
      .bucket(srcBucketName)
      .file(srcFilename)
      .copy(storage.bucket(destBucketName).file(destFilename))
      .then(() => {
        console.log(
          `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFilename}.`
        );
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },

    //create a tags array from the labels returned by the google vision call
    createTagsArray: (labels) => {
        const tagsArray = [];
        labels.forEach(label => tagsArray.push(label.description))
        return tagsArray;
      }
}

module.exports = helpers;