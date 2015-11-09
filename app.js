var express = require('express'),
	app=express(),
	mysql=require('mysql'),
	config = require('./config/config'),
	bodyParser = require('body-parser');

app.use(bodyParser());

require('./route')(app);

var port=config.server.port;
app.listen(port);

console.log("App started on port :"+port);

