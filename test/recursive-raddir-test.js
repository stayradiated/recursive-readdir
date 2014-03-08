var assert = require('assert')
var readdir = require('../index')

describe('readdir', function() {

  var TESTDIR = __dirname + '/testdir';

  it('correctly lists all files in nested directories', function (done) {
    var expectedFiles = [
      __dirname + '/testdir/a/a',
      __dirname + '/testdir/a/beans',
      __dirname + '/testdir/b/123',
      __dirname + '/testdir/b/b/hurp-durp',
      __dirname + '/testdir/c.txt',
      __dirname + '/testdir/d.txt'
    ];

    readdir(TESTDIR, function(err, list) {
      assert.ifError(err);
      assert.deepEqual(list.sort(), expectedFiles.sort());
      done();
    })
  });

  it('should ignore files', function (done) {

    var expectedFiles = [
      __dirname + '/testdir/d.txt',
      __dirname + '/testdir/c.txt'
    ];

    var options = {
      filterFile: function (stats) {
        return stats.name.match(/\.txt$/);
      }
    };

    readdir(TESTDIR, options, function (err, list) {
      assert.ifError(err);
      assert.deepEqual(list.sort(), expectedFiles.sort());
      done();
    });

  });

  it('should ignore folders', function (done) {

    var expectedFiles = [
      __dirname + '/testdir/c.txt',
      __dirname + '/testdir/d.txt'
    ];

    var options = {
      filterDir: function (stats) {
        return false;
      }
    };

    readdir(TESTDIR, options, function (err, list) {
      assert.ifError(err);
      assert.deepEqual(list.sort(), expectedFiles.sort());
      done();
    });

  });

  it('should ignore files and folders', function (done) {

    var expectedFiles = [
      __dirname + '/testdir/a/a',
      __dirname + '/testdir/a/beans',
      __dirname + '/testdir/d.txt'
    ];

    var options = {
      filterDir: function (stats) {
        return stats.name !== 'b';
      },
      filterFile: function (stats) {
        console.log(stats);
        return stats.name !== 'c.txt'; 
      }
    };

    readdir(TESTDIR, options, function (err, list) {
      assert.ifError(err);
      assert.deepEqual(list.sort(), expectedFiles.sort());
      done();
    });

  });

})
