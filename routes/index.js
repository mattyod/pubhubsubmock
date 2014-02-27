'use strict';

var fs = require('fs');

exports.index = function (req, res) {

  fs.readdir('./feeds', function (err, feeds) {

    if (err) {
      res.send(500, 'no feeds found in ./feeds');
    }

    feeds = feeds.filter(function (feed) {
      return !feed.match(/^\./);
    });

    res.render('index', { feeds: feeds });

  });

};
