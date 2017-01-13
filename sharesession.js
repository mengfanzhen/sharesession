// 仅列出核心代码
var express = require("express");
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
const os = require('os');
const net = require('net');
var config={
	"cookie" : {
	   "maxAge" : 1800000
	},
	  "sessionStore" : {
	   "host" : "66.154.123.239",
	   "port" : "6379",
	   "pass" : "mengfanzhen",
	   "db" : 1,
	   "ttl" : 1800,
	   "logErrors" : true
	}
}
var app = express();
app.set("view engine","ejs");  
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'hello kitty',
	store: new RedisStore(config.sessionStore) // 利用redis存储session
}));

app.get('/views/:page',function(req,res){
	var page = req.params.page;
	var sessionid = req.session.id
	res.render(page,{"sessionid":sessionid,"iparray":ipArray})
})
app.listen(3000)

var ipArray = [];
var networkInterfaces =  os.networkInterfaces()
for(var key in networkInterfaces){
	networkInterfaces[key].forEach(function(item){
		if(net.isIPv4(item.address)){
			ipArray.push(item.address)
		}
	})
}



