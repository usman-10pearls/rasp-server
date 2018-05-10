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
rpio.init({mock:'raspi-3'});
rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low'));


rpio.open(12, rpio.OUTPUT, rpio.LOW);

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
const app = express();
const port = 3000;
app.get('/hello',(request,response)=>{response.send('Hello from express!')})


app.post('/update',function(request,response){
console.log('got request from main server');
response.status(200);
response.send('yay!');

})



app.listen(port,(err)=>{
if(err){
return console.log('error occurred.',err);
}
console.log('server is listening on 3000')
})



