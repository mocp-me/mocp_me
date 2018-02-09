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
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        projectId: 'cool-citadel-192004',
        keyFilename: './keys.json'
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

    //create a tags array from the labels returned by the google vision call
    createTagsArray: (labels) => {
        const tagsArray = [];
        labels.forEach(label => tagsArray.push(label.description))
        return tagsArray;
      }
}

module.exports = helpers;