module.exports = {
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
    }
}