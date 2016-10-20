//load http module
var http = require("http");

//load file system module;
var fs = require("fs");

//set a manage handler
var manage_handler = function(req,res){
	console.log("New Request");
	var path = "./index.html";

	fs.readFile(path,function(err,html){
		var data = html.toString();
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.end();
	});
	
}

//Created the server and passed the manage handler function
var server = http.createServer(manage_handler);

//set the listen port
server.listen("8080");