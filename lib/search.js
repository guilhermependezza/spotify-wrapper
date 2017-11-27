'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchArtists = exports.searchTracks = exports.searchAlbums = exports.search = undefined;

var _makeAuthHeader = require('./make-auth-header');

var _config = require('./config');

var _utils = require('./utils');

var makeUrl = function makeUrl(query, type) {
  return _config.API_URL + '/search?q=' + query.replace(/ /g, '+') + '&type=' + type;
};

console.log((0, _makeAuthHeader.makeAuthHeader)());

var search = exports.search = function search(query, type) {
  return fetch(makeUrl(query, type), (0, _makeAuthHeader.makeAuthHeader)()).then(_utils.toJson);
};

var searchAlbums = exports.searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};

var searchTracks = exports.searchTracks = function searchTracks(query) {
  return search(query, 'track');
};

var searchArtists = exports.searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};

var searchPlaylists = exports.searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};