var fs = require('fs');

var exports = module.exports = {};

var path = "../mediaFiles";


exports.getFileNames = function(callback) {
    fs.readdir(path, function(err, fileNames) {
        if(err) {
            console.log(err)
        } else {
            var fileObjects = []
            for (var fileName of fileNames) {
                fileObjects.push({name: fileName});
            }
            callback(fileObjects);
        }
    });
}