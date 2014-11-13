// app.js

var express = require('express'),
  app = express();
  
//setup static public directory
app.use(express.static(__dirname + '/www')); 


app.listen(3000);
console.log('App started on port ' + 3000);


