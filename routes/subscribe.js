'use strict';

var fs = require('fs');

module.exports = function (req, res) {

  fs.writeFile('./database.txt', JSON.stringify(req.body), function () {
    console.log('written to database.txt:');
    console.log(req.body);
  });

  res.send(202, 'Subscription accepted');

};
