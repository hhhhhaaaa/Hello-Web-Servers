//Packages required.
var express = require('express');
var path = require('path');
var fs = require("fs");

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Directory of pages.
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/albums', function(req, res) {
  res.render('albums');
});

app.get('/songs', function(req, res) {
  res.render('songs');
});


//Used to grab the static files
app.use(express.static(path.join(__dirname + 'public')));

var albums = app.locals.albums = JSON.stringify(require("./public/albums.json"));
var artists = app.locals.artists = JSON.stringify(require("./public/artists.json"));
var songs = app.locals.songs = JSON.stringify(require("./public/songs.json"));

//Used to arrange the JSON files
albums.sort(function(a, b) {
    return parseFloat(a.title) - parseFloat(b.title);
});

artists.sort(function(a, b) {
    return parseFloat(a.name) - parseFloat(b.name);
});

songs.sort(function(a, b) {
    return parseFloat(a.title) - parseFloat(b.title);
});

//Used to display the page.
app.listen(3000, function() {
  console.log("Server Started On Port 3000...");
});
