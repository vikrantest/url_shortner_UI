var express = require('express'),
	bodyParser = require('body-parser')
	app = express();
var http = require('http').Server(app);

http.listen(8080, function(){
  console.log('listening on *:8080..........................');
});

var shurl_routes = require(__dirname+'/routes/base_routes');

app.use(bodyParser.json());

app.use('/static', express.static('static'));
app.use('/', shurl_routes);

