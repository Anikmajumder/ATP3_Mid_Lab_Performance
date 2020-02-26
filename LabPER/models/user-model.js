var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	ep: function(id, callback){
		var sql = "select * from product where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByName: function(uname, callback){
		
		var sql = "select * from user where username=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var t='employee';
		var sql = "select * from user where type='"+t+"'";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	vp:function(callback){
		
		var sql = "select * from product";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into  user (username,uname,password,contact,type) values(?,?,?,?,?)" ;
		db.execute(sql, [ user.username, user.uname,user.password,user.contact, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	dp: function(id, callback){
		var sql = "delete from product where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update user set username=?,uname=?,password=?,contact=?,type=? where id=?";
		db.execute(sql, [user.username, user.uname,user.password,user.contact, user.type, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	pi: function(user, callback){
		var sql = "insert into  product (product_name,quantity,price) values(?,?,?)";
		db.execute(sql, [user.product_name, user.quantity,user.price], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

   epu: function(user, callback){
		var sql = "update product set product_name=?,quantity=?,price=? where id=?";
		db.execute(sql, [user.product_name, user.quantity,user.price,user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
