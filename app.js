var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

if (app.get('env') === 'development') {
	var webpack = require('webpack');
	var webpackConfig = require('./webpack.config');

	var compiler = webpack(webpackConfig);
	
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}));

	app.use(require("webpack-hot-middleware")(compiler));
}

app.use(express.static(path.join(__dirname, 'public')));

// route
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

// setup port
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

// create server
var server = http.createServer(app);
server.listen(port);

console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)