var connection=require('../config/db').connection,
	genericfunction=require('../template/generic_function'),
	config=require('../config/config'),
	crypto=require('crypto'),
	md5=require('MD5');
//---------------Sign-Up-------------------
exports.register = function(req,res,next) {

	res.setHeader("Access-Control-Allow-Origin","*");

    //My Register logic 
    var username=req.body.username,
     	password=req.body.password,
   	 	repassword=req.body.repassword,
     	email=req.body.email;

     var cipher = crypto.createCipher(config.algorithm,config.password);

     var access_token = md5(username+new Date());
     
	 var cryptedpassword = cipher.update(password,'utf8','hex');
	 cryptedpassword += cipher.final('hex');

	 genericfunction.userregistration(username,email,function(result){
	 		if(result!=0){
	 		var jsonobj={"result": "Username/Email already existed"};
	  		res.json(jsonobj);
	  		}
	  		else{		
	var post = {username: username,password:cryptedpassword,email:email,access_token:access_token};

	var query = connection.query('INSERT INTO myproject.tb_users SET ?', post, function(err, result) {
	  	if(err) 
	  		throw err;
	  	else{
	  		var jsonobj={"result": "Sucess"};
	  		console.log('Last insert ID:', result.insertId);
	  		res.json(jsonobj);
	  	}

	});	
  }

	 });
};
//--------------Default Page---------------
exports.defaults=function(req,res,next){
	res.json("Default Page");
}

//--------------Login---------------------
exports.login=function(req,res,next){
	var username=req.body.username,
     	password=req.body.password;

    res.setHeader("Access-Control-Allow-Origin","*");

    var query = connection.query('select username,password,access_token from tb_users where username=\''+username+'\'', function(err, rows) {
    	if(err) 
	  		throw err;
	  	else if(rows.length==1){
		var decipher = crypto.createDecipher(config.algorithm,config.password)
	    var dec = decipher.update(rows[0].password,'hex','utf8')
	    dec += decipher.final('utf8');
	    //console.log(dec);
	    if(dec==password){
	    		var jsonobj={"result": "Sucess"};
	    		res.json(jsonobj);
	    	}
	    else{
	    	var jsonobj={"result": "UnSucess"};
	    		res.json(jsonobj);
	    }
	  	}
	});	
}


