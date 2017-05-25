//Packages required.
var express = require('express');
var path = require('path');
var fs = require("fs");
var ejs = require("ejs");
var helpers = require('express-helpers')
var albums = require("./public/json/albums.json");
var artists = require("./public/json/artists.json");
var songs = require("./public/json/songs.json");

var app = express();
helpers(app);

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Used to grab the static files
app.use(express.static(path.join(__dirname, 'public')));

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

//Directory of pages.
app.get('/', function(req, res) {
  res.render( 'index', {
    albumsSorted: albumsSorted,
    artistsSorted: artistsSorted,
    songsSorted: songsSorted
});
});

app.get('/albums', function(req, res) {
  res.render( 'albums', {
    albumsSorted: albumsSorted,
    artistsSorted: artistsSorted,
    songsSorted: songsSorted
});
});

app.get('/songs', function(req, res) {
  res.render( 'songs', {
    albumsSorted: albumsSorted,
    artistsSorted: artistsSorted,
    songsSorted: songsSorted
});
  res.render('songs');
});

app.get('/albums/:album_id', function(req, res) {
  var album_id = albums.id;
  res.render( 'album', {
    albumsSorted: albumsSorted,
    artistsSorted: artistsSorted,
    songsSorted: songsSorted
});
});

app.get('/artists/:artist_id', function(req, res) {
  var artist_id = artists.id;
  res.render( 'artist', {
    albumsSorted: albumsSorted,
    artistsSorted: artistsSorted,
    songsSorted: songsSorted
});
});

//Used to display the page.
app.listen(3000, function() {
  console.log("Server Started On Port 3000...");
});
