'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = exports.searchPlaylists = exports.searchArtists = exports.searchTracks = exports.searchAlbums = exports.search = undefined;

var _search = require('./search');

var _album = require('./album');

exports.search = _search.search;
exports.searchAlbums = _search.searchAlbums;
exports.searchTracks = _search.searchTracks;
exports.searchArtists = _search.searchArtists;
exports.searchPlaylists = _search.searchPlaylists;
exports.getAlbum = _album.getAlbum;
exports.getAlbums = _album.getAlbums;
exports.getAlbumTracks = _album.getAlbumTracks;