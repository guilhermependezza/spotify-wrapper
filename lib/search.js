'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  var makeUrl = function makeUrl(query, type) {
    return _this.apiURL + '/search?q=' + query.replace(/ /g, '+') + '&type=' + type;
  };

  return {
    search: function search(query, type) {
      return _this.request(makeUrl(query, type));
    },
    albums: function albums(query) {
      return _this.search.search(query, 'album');
    },
    tracks: function tracks(query) {
      return _this.search.search(query, 'track');
    },
    artists: function artists(query) {
      return _this.search.search(query, 'artist');
    },
    playlists: function playlists(query) {
      return _this.search.search(query, 'playlist');
    }
  };
};