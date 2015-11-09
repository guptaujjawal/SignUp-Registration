var query = require('./controller/query');

// API Server Endpoints
module.exports = function(app){

  app.route('/register')
     .post(query.register);
  app.route('/')
  	 .get(query.defaults);
  app.route('/login')
  	 .post(query.login);
}
