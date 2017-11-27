'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = undefined;

var _makeAuthHeader = require('./make-auth-header');

var _config = require('./config');

var _utils = require('./utils');

var getAlbum = exports.getAlbum = function getAlbum(id) {
  return fetch(_config.API_URL + '/albums/' + id, (0, _makeAuthHeader.makeAuthHeader)()).then(_utils.toJson);
};

var getAlbums = exports.getAlbums = function getAlbums(ids) {
  return fetch(_config.API_URL + '/albums?ids=' + ids, (0, _makeAuthHeader.makeAuthHeader)()).then(_utils.toJson);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(id) {
  return fetch(_config.API_URL + '/albums/' + id + '/tracks', (0, _makeAuthHeader.makeAuthHeader)()).then(_utils.toJson);
};