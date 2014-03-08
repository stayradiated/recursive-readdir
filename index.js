var fs = require('fs')

function readdir(path, options, callback) {
  var list = [];

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var dirTest = options.filterDir;
  var fileTest = options.filterFile;

  fs.readdir(path, function (err, files) {
    if (err) return callback(err);

    // Check if we have any files
    var pending = files.length;
    if (! pending) return callback(null, list);

    files.forEach(function (file) {
      var filepath = path + '/' + file;

      fs.stat(filepath, function (err, stats) {
        if (err) return callback(err);

        // Add extra info to stats
        stats.name   = file;
        stats.path   = filepath;
        stats.folder = path;

        // IS DIRECTORY
        if (stats.isDirectory()) {

          if (dirTest && ! dirTest(stats)) {
            pending -= 1;
            if (! pending) callback(null, list);
            return;
          } 

          files = readdir(filepath, options, function (err, res) {
            list = list.concat(res);
            pending -= 1;
            if (! pending) callback(null, list);
          });

        }

        // IS FILE
        else {

          if (! fileTest || fileTest(stats)) {
            list.push(filepath);
          }

          pending -= 1
          if (! pending) callback(null, list);
        }
      });
    });
  });
}

module.exports = readdir;
