var fs = require('fs');

var exports = module.exports = {};

var walkSync = function(dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
        }
        else {
            if(!file.startsWith('.')) {
                filelist.push({name: file, fullPath: dir + file});
            }
        }
    });
    return filelist;
};

exports.getFileNames = function(path) {
    var files = walkSync(path + '/');
    var fileObjs = [];
    for(var file of files) {
        file.fullPath = file.fullPath.substring(path.length + 1);
        fileObjs.push(file)
    }
    return fileObjs;
}