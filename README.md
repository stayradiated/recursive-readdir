#recursive-readdir-filter

This is a fork of https://github.com/jergason/recursive-readdir.

It adds support for filtering files and folders.

---

A simple Node module for recursively listing all files in a directory,
or in any subdirectories.

It does not list directories themselves.

## Installation

    npm install recursive-readdir-filter

## Usage

**Just like `recursive-readdir`**

```javascript
var recursive-readdir = require('recursive-readdir-filter');

recursive-readdir('some/path', function (err, files) {
  // Files is an array of filename
  console.log(files);
});
```

**But now with filters**;

```javascript
var options = {
    filterDir: function (stats) {
        return stats.name !== 'node_modules';
    },
    filterFile: function (stats) {
        return stats.name.match(/\.js$/);
    }
};

recursive-readdir('some/path', options, function (err, files) {
    console.log(files);
});
```

### Options

Options are completly optional;

Both options must be a function. A [Stats](http://nodejs.org/api/fs.html#fs_class_fs_stats)
object is passed to them, but with some extra information added:

- path: the full path to the file/folder. e.g. `/Volumes/Home/foo.txt`.
- name: the name of file/folder. e.g `foo.txt`.
- folder: the parent folder of the file/folder. e.g. `/Volumes/Home`.

```javscript
{
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  name: 'a',
  path: '/Volumes/Home/Projects/recursive-readdir/test/testdir/a/a/'
  folder: '/Volumes/Home/Projects/recursive-readdir/test/testdir/a/'
}
```

**filterDir**

Is run whenever a folder is found.

**filterFile**

Is run whenever a file is found.

