'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_TOKEN = 'BQCg4ZAExrAqku-zv1O8WLDQO-E6JVcohBNkkORbgID07ad9Jh-U9C5vVf1ywowWTg5a2I-a3n-oO1xu1i3uXoXnrR39JqS3V0_fsFNoyuyQ5VEp64SZRj7R4qtyqNr2ROONM1mcZWSM';

var authHeaders = {
  headers: {
    authorization: 'Bearer ' + API_TOKEN
  }
};

var makeAuthHeader = exports.makeAuthHeader = function makeAuthHeader() {
  return authHeaders;
};