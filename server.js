//load http module
var http = require("http");

//set a manage handler
var manage_handler = function(req,res){
	console.log("New Request");
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end("Init Server");
}

//Created the server and passed the manage handler function
var server = http.createServer(manage_handler);

//set the listen port
server.listen("8080");