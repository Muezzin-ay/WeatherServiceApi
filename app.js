
const api = require('./modules/module_api')

var express = require('express');
var app = express();

app.use('/api', api);

app.use("/", express.static(__dirname + "/public"));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});