var request = require('request');

var SERVERURL = "http://localhost:8000";



//Testing service removeduplicatewords

var jsonrdw = { palabras: 'hola,como,estas,hola,como,estas,hola,como,estas' };

request.post(
    SERVERURL+'/removeduplicatewords',
    { json:  jsonrdw },
    function (error, response, body) {
    	console.log("##############################");
    	console.log("Testing: removeduplicatewords");
        if (!error && response.statusCode == 200) {
        	console.log("Result: "+body);
        	if(body=="hola,como,estas"){
        		console.log("removeduplicatewords = OK");
        	}else{
        		console.log("removeduplicateworkds = NOT OK ");
        	}
        }else{
        	console.log("removeduplicatewords: ERROR: "+error);
        }
        console.log("##############################");
    }
);


//Testing service detectfiletype

var jsondft = { "url": "http://www.jandusoft.com/images/JanduSoft_logo.png"};

request.post(
    SERVERURL+'/detectfiletype',
    { json:  jsondft },
    function (error, response, body) {
    	console.log("Testing: detectfiletype");
        if (!error && response.statusCode == 200) {
        	console.log("Result: "+JSON.stringify(body));
        	if(JSON.stringify(body)=="{\"ext\":\"png\",\"mime\":\"image/png\"}"){
        		console.log("detectfiletype = OK");
        	}else{
        		console.log("detectfiletype = NOT OK ");
        	}
        }else{
        	console.log("detectfiletype: ERROR: "+error);
        }
        console.log("##############################");
    }
);

//Testing service botorder
request.get(
	SERVERURL+'/botorder/order1',
	function (error, response, body) {
    	console.log("Testing: botorder #1");
        if (!error && response.statusCode == 200) {
        	console.log("Result: "+body);
        	if(body=="NONE"){
        		console.log("botorder #1 = OK");
        	}else{
        		console.log("botorder #1 = NOT OK ");
        	}
        }else{
        	console.log("botorder #1: ERROR: "+error);
        }
        console.log("##############################");
    }
);

var jsonbor = { "botorder": "KILLMATRIX"};

request.post(
    SERVERURL+'/botorder/order1',
    { json:  jsonbor },
    function (error, response, body) {
    	console.log("Testing: botorder #2");
        if (!error && response.statusCode == 200) {
        	console.log("Result: "+body);
        	if(body=="OK"){
        		console.log("botorder #2 = OK");
        	}else{
        		console.log("botorder #2 = NOT OK ");
        	}
        }else{
        	console.log("botorder #2: ERROR: "+error);
        }
        console.log("##############################");
    }
);

request.get(
	SERVERURL+'/botorder/order1',
	function (error, response, body) {
    	console.log("Testing: botorder #3");
        if (!error && response.statusCode == 200) {
        	console.log("Result: "+body);
        	if(body=="KILLMATRIX"){
        		console.log("botorder #3 = OK");
        	}else{
        		console.log("botorder #3 = NOT OK ");
        	}
        }else{
        	console.log("botorder #3: ERROR: "+error);
        }
        console.log("##############################");
    }
);
