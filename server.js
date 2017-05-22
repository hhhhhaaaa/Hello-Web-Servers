//Packages required.
var express = require('express');
var path = require('path');

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Directory of pages.
app.use(express.static(path.join(__dirname, 'public')));

app.get( '/', function(request, response) {
  response.render("index");
});

//Used to display the page.
app.listen(3000, function() {
  console.log("Server Started On Port 3000...");
});
