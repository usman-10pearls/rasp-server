#!/usr/bin/env nodejs
// Load the http module to create an http server.
/*var http = require('http');
 
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
 
// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000,'0.0.0.0');
 
// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
*/
var rpio = require('rpio');
//rpio.init({mock:'raspi-3'});
rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low'));


rpio.open(12, rpio.OUTPUT, rpio.LOW);



rpio.open(3, rpio.OUTPUT, rpio.LOW);
rpio.open(5, rpio.OUTPUT, rpio.LOW);
rpio.open(7, rpio.OUTPUT, rpio.LOW);
rpio.open(8, rpio.OUTPUT, rpio.LOW);
rpio.open(10, rpio.OUTPUT, rpio.LOW);
rpio.open(11, rpio.OUTPUT, rpio.LOW);
rpio.open(12, rpio.OUTPUT, rpio.LOW);


/*console.log(rpio.read(3))
console.log(rpio.read(5))
console.log(rpio.read(7))
console.log(rpio.read(8))
console.log(rpio.read(10))
console.log(rpio.read(11))
console.log(rpio.read(12))
*/
/*
 * The sleep functions block, but rarely in these simple programs does one care
 * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
 */
for (var i = 0; i < 5; i++) {
        /* On for 1 second */
        rpio.write(12, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
        rpio.write(12, rpio.LOW);
        rpio.msleep(500);
}



const express =require('express');

const bodyParser = require('body-parser');




const datastore = require('./datastore');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const port = 3000;
app.get('/hello',(request,response)=>{response.send('Hello from express!')})


app.post('/update',function(request,response){
console.log('got request from main server');

console.log('request uid');
console.log(request.headers.uid);


console.log("====== request processing started =====");

userExist = datastore.Auth.users[request.headers.uid];
if(userExist)
{
	//console.log(request);
	
	body = request.body;
	//console.log(body);
	//console.log("====== end request body =====");
	
	deviceName = body.deviceName;
	state = body.state;
	
	//devicesAssigned = datastore.Auth.userAssignedDevices[userExist.uid];
	
	console.log('devices assigned')
	console.log(userExist.uid);

	pin = datastore.Auth.pins[deviceName];
	console.log("device : "+deviceName);
	console.log("state : "+state);
	console.log("pin : "+pin);
	rpio.write(pin, state ? rpio.LOW : rpio.HIGH);
	rpio.sleep(3);
	console.log('turning pin'+ pin + ' to '+ (state ? "true" : "false"));

	response.status(200);
	response.send('yay!');
	
	//console.log(devicesAssigned);
	/*for(let i=0;i<devicesAssigned.length;i++)
	{
		//console.log(devicesAssigned[i]);
		//console.log(deviceName);
		if(devicesAssigned[i] == deviceName){
				
			pin = datastore.Auth.pins[deviceName];
			console.log("state : "+state)
			console.log("pin : "+pin)
			rpio.write(pin, state ? rpio.LOW : rpio.HIGH);
			rpio.sleep(3);
			console.log('turning pin'+ pin + ' to '+ (state ? "true" : "false"));
			//console.log('Pin '+pin+' is currently set ' + (rpio.read(pin)));
			
			
			response.status(200);
			response.send('yay!');
			break;
		}
			
	}
	response.status(400);
	response.send('device not allowed to this user. device : '+deviceName+' userid :' +userExist.uid);*/
}
else
{
	response.status(400);
	response.send('user authentication failed.');
}

console.log("====== request processing ended =====");

})



app.listen(port,(err)=>{
if(err){
return console.log('error occurred.',err);
}
console.log('server is listening on 3000')
})



