'use strict';

var crypto = require('crypto');

module.exports = function (blob, secret) {
  var shasum = crypto.createHmac('sha1', secret);

  shasum.update(blob);

  return shasum.digest('hex');
};
