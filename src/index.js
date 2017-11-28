import API_URL from './config';

import search from './search';

import album from './album';

export default class SpotifyWrapper {
  constructor({ apiURL = API_URL, token }) {
    this.apiURL = apiURL;
    this.token = token;
    this.album = album.bind(this)();
    this.search = search.bind(this)();
  }

  request(url) {
    const headers = {
      headers: {
        authorization: `Bearer ${this.token}`
      }
    };
    return fetch(url, headers);
  }
}
