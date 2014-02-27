'use strict';

var express = require('express'),
    path = require('path'),
    http = require('http'),
    routes = require('./routes'),
    subscribe = require('./routes/subscribe'),
    publish = require('./routes/publish');

var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app
  .get('/', routes.index)
  .post('/', subscribe)
  .get('/publish/:feed', publish);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
