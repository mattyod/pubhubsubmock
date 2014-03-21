'use strict';
/*globals require, module, console */

var fs = require('fs'),
    request = require('request'),
    sign = require('../lib/sign'),
    _ = require('underscore'),
    col = require('col');

module.exports = function (req, res, next) {
  var subscriber;

  var response = function (res) {
    col.success('Feed received successfully.');
    col.success('Status code: ' + res.statusCode);
    col.success('Headers:');
    console.log(res.headers);
    res.on('data', function (chunk) {
      col.success('body: ' + chunk.toString());
    });
  };

  var sendFeed = function (feed) {
    var req = request({
      method: 'POST',
      url: subscriber.callback,
      headers: {
        'Content-Type': 'atom/xml',
        'X-Hub-Signature': sign(feed, subscriber.secret)
      },
      body: feed
    });

    req.on('response', function (resp) {
      response(resp);
      res.redirect('/');
    });

    req.on('error', function (err) {
      next(err);
    });

  };

  var getFeed = function () {
    fs.readFile('./feeds/' + req.params.feed, 'utf8', function (err, feed) {
      if (err) {
        res.send(404, 'file not found');
      } else {
        sendFeed(feed);
      }
    });
  };

  var getDatabase = function () {
    fs.readFile('./database.txt', 'utf8', function (err, file) {
      if (err) {
        res.send(500, '500: No subscriber database.txt file found.');
      } else {
        subscriber = JSON.parse(file);

        getFeed();
      }
    });
  };

  getDatabase();

};
