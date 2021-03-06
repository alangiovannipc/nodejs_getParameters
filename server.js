//load http module
var http = require("http");

//load file system module;
var fs = require("fs");

//set a manage handler
var manage_handler = function(req,res){
	console.log("New Request");
	var pathRequest = "./index.html";
	var pathResponse = "./response.html";
	var obParams = {};

	//check if there are parameters in the url
	if(req.url.indexOf("?") > 0){
		
		//extract url parameters
		console.log(req.url);
		//regular expression for searching parameters in the url string
		var regex = /[^\?&]+(?=&|\b)/g;
		var params = req.url.match(regex);
		console.log(params);
		//set keys and values into obParams object
		params.forEach(function(value){
			var tmp = value.split("=");
			obParams[tmp[0]] = tmp[1];
		})
		console.log(" obParams :" );
		console.dir(obParams);

		//reading the html file for write in the response
		fs.readFile(pathResponse,function(err,html){
			var data = html.toString();
			var regex = /[^\{\}]+(?=\})/g;
			var keys = data.match(regex);
			console.log("Keys to replace :\n" + keys);

			keys.forEach(function(val){
				console.log(val)
				data = data.replace("{{"+val+"}}",obParams[val]);
				console.log(data)
			})

			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});

	}else{

		//reading the html file for write in the response
		fs.readFile(pathRequest,function(err,html){
			var data = html.toString();
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});
	}
	
}

//Created the server and passed the manage handler function
var server = http.createServer(manage_handler);

//set the listen port
server.listen("8080");