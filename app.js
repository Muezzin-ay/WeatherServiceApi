
const api = require('./modules/module_api')
const fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

const PORT = 443;

var privateKey = fs.readFileSync('./cert/Geokoord-Server-Robin_key.pem');
var certificate = fs.readFileSync('./cert/Geokoord-Server-Robin_cert.pem');

var credentials = {key: privateKey, cert: certificate};
var app = express();

//Handle HTTP to HTTPS redirect
app.use(function(req,res,next){
  //console.log('SSL in use: '+ req.secure)
  if(!req.secure){
    res.redirect("https://" + req.headers.host + req.url); 
    //console.log('redirected request');
  }else{
    next();
  }
});

app.use('/api', api);

app.use("/", express.static(__dirname + "/public"));

/**
 * HTTP/HTTPS Server
 */

var server = https.createServer(credentials, app).listen(PORT);
console.log('HTTPS Server listening on %s', PORT);

//301 redirect for http to https
var http_server = http.createServer(app).listen(80);
console.log('HTTP Server listening on Port 80 an redirect to HTTPS in enabled.');