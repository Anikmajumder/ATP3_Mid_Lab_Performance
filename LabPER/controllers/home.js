var express 	= require('express');
var router 		= express.Router();

var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByName(req.cookies['username'], function(result){
			console.log(result.type);
			if(result.type=='admin'){
			
				res.render('home/index', {user: result});
			}else if(result.type=='employee'){
				console.log(result.type)
				res.render('home/user', {user: result});
		}
	});
	}


	else{
		res.redirect('/logout');
		 }
		
});
router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUser(req.cookies['username'], function(result){
			res.render('home/user', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});


router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})
router.get('/vp', function(req, res){
	userModel.vp(function(results){
		if(results.length > 0){
			res.render('home/vp', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})



router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		 uname : req.body.uname,
		 contact : req.body.contact,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

router.get('/dp/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/dp', {user: result});
	});
})

router.post('/dp/:id', function(req, res){
	
	userModel.dp(req.params.id, function(status){
		if(status){
			res.redirect('/home/vp');
		}else{
			res.redirect('/home/dp/'+req.params.id);
		}
	});
})

router.get('/ep/:id', function(req, res){
	
	userModel.ep(req.params.id, function(result){
		res.render('home/ep', {user: result});
	});
})

router.post('/ep/:id', function(req, res){
	
	var user = {
		product_name: req.body.product_name,
		quantity: req.body.quantity,
		 price : req.body.price,
		 id:req.body.id
		 
	};

	userModel.epu(user, function(status){
		if(status){
			res.redirect('/home/vp');
		}else{
			res.redirect('/home/ep/'+req.params.id);
		}
	});
})
router.get('/ap', function(req, res){
	
			res.render('home/ap');
	
})

router.post('/ap', function(req, res){
	
	
	
	req.checkBody('name', 'Name field cannot be empty.').notEmpty();
	
	req.checkBody('price', 'Price must be between 8-60 characters long.').notEmpty();
	
	req.checkBody('quantity', 'Quantity field cannot be empty.').notEmpty();
	
	
	const err = req.validationErrors();

	if(err){		
		res.render('home/ap', {errors: err});
		//console.log(err);
	}else{
		var user = {
		product_name: req.body.name,
		quantity: req.body.quantity,
		price: req.body.price,

		
	};
		userModel.pi(user, function(status){
			if(status){
				res.redirect('/home/vp');
			}else{
				res.redirect('/home/ap');
			}
		});
		//res.send('login successful');
	}

})
router.get('/adduser', function(req, res){
	
	res.render('home/adduser');

})

router.post('/adduser', function(req, res){

// var user = {
// 	username: req.body.username,
// 	password: req.body.password,
// 	type: req.body.type
// };

req.checkBody('username', 'Name field cannot be empty.').notEmpty();
//req.checkBody('username', "Username can only must include one lowercase character, one uppercase character,").matches(/^[A-Za-z_-]+$/, "i");
req.checkBody('password', 'Password must be between 8-60 characters long.').len(4, 60);
//req.checkBody('password', "Password must include one lowercase character, one uppercase character, a number").matches(/^[A-Za-z0-9_-]+$/, "i");
req.checkBody('type', 'Type field cannot be empty.').notEmpty();
req.checkBody('contact', 'contact field cannot be empty.').notEmpty();
req.checkBody('uname', 'Username field cannot be empty.').notEmpty();


const err = req.validationErrors();

if(err){		
res.render('home/adduser', {errors: err});
//console.log(err);
}else{
var user = {
username: req.body.username,
uname: req.body.uname,
password: req.body.password,
contact: req.body.contact,
type: req.body.type
};
userModel.insert(user, function(status){
	if(status){
		res.redirect('/home/alluser');
	}else{
		res.redirect('/home/adduser');
	}
});
//res.send('login successful');
}

})
module.exports = router;

