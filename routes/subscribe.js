'use strict';

var fs = require('fs'),
    col = require('col');

module.exports = function (req, res) {
console.log(req);
  fs.writeFile('./database.txt', JSON.stringify(req.body), function () {
    var message = req.body;
    message.secret = 'xxxxxxxxxx';
    col.success('Subscriber received and written to database.txt:');
    console.log(message);
  });

  res.send(202, 'Subscription accepted');

};
