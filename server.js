//Packages required.
var express = require('express');
var path = require('path');
var fs = require("fs");
var albums = app.locals.albums = require("./public/albums.json");
var artists = app.locals.artists = require("./public/artists.json");
var songs = app.locals.songs = require("./public/songs.json");

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

app.get('/albums/:album_id', function(req, res) {
  res.render('album');
});

app.get('/artists/:artist_id', function(req, res) {
  res.render('artist');
});

//Used to assign the pages to variables
//app.params.album_id = albums;
//app.params.artist_id = artists;

//Used to grab the static files
app.use(express.static(path.join(__dirname + 'public')));

var albumsSorted = [];
var artistsSorted = [];
var songsSorted = [];
//Albums
for (var properties in albums) {
  albumsSorted.push(albums[properties])
}
//Artists
for (var properties in artists) {
  artistsSorted.push(artists[properties])
}
//Songs
for (var properties in songs) {
  songsSorted.push(songs[properties])
}

//Used to arrange the JSON files
albumsSorted.sort(function(a, b) {
  var x = a.title.toLowerCase();
  var y = b.title.toLowerCase();
//If x is less than y, move it down; else if x is greater than y, move it up; else keep it where it is.
  return x < y ? -1 : x > y ? 1 : 0;
});

artistsSorted.sort(function(a, b) {
  var x = a.name.toLowerCase();
  var y = b.name.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
});

songsSorted.sort(function(a, b) {
  var x = a.title.toLowerCase();
  var y = b.title.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
});

console.log(albums[0].artist_id)

//Used to display the page.
app.listen(3000, function() {
  console.log("Server Started On Port 3000...");
});
