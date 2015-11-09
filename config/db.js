var mysql= require('mysql'),
	config=require('./config');

var connection = mysql.createConnection({
  host     : config.databases.host,
  user     : config.databases.user,
  password : config.databases.password,
  database : config.databases.database
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

exports.connection=connection;