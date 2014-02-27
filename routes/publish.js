'use strict';
/*globals require, module, console */

var fs = require('fs'),
    http = require('http'),
    sign = require('../lib/sign'),
    _ = require('underscore');

module.exports = function (req, res) {
  var subscriber;
  var config = {
    method: 'POST',
    'Content-Type': 'atom.xml'
  };

  var response = function (res) {
    console.log('Feed received successfully.');
    console.log(res.statusCode);
    console.log(res.headers);
    res.on('data', function (chunk) {
      console.log(chunk.toString());
    });
  };

  var sendFeed = function (feed) {
    var reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'atom/xml',
        'X-Hub-Signature': sign(feed, subscriber.secret)
      }
    };

    var url = subscriber.callback.split(/\:(?=\d*$)/);

    reqObj.url = url[0];

    if (url[1]) {
      reqObj.port = url[1];
    }

    var req = http.request(reqObj, response);

    req.on('error', function (error) {
      console.log('problem with request: ' + error);
    });

    req.write(feed);
    req.end();
    res.redirect('/');
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

  var getConfig = function () {
    fs.readFile('./config.json', 'utf8', function (err, file) {
      if (err) {
        console.log('no config file found using defaults.');
      } else {
        _.extend(config, JSON.parse(file));
        console.log('applied local config:');
        console.log(config);
      }

      getDatabase();
    });
  };

  getConfig();

};
