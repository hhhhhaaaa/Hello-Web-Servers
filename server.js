//Packages required.
var express = require('express');
var path = require('path');

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Directory of pages.
app.use(express.static(path.join(__dirname + 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/albums', function(req, res) {
  res.render('albums');
});

app.get('/songs', function(req, res) {
  res.render('songs');
});

app.get('/artists:artist_id', function(req, res) {
  res.render('artist');
});

app.get('/albums:album_id', function(req, res) {
  res.render('album');
});

//Used to display the page.
app.listen(3000, function() {
  console.log("Server Started On Port 3000...");
});
