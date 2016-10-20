//load http module
var http = require("http");

//load file system module;
var fs = require("fs");

//set a manage handler
var manage_handler = function(req,res){
	console.log("New Request");
	var path = "./index.html";

	//check if there are parameters in the url
	if(req.url.indexOf("?") > 0){
		console.log("url have parameters");
	}

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