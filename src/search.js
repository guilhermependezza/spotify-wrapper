export default function () {
  const makeUrl = (query, type) =>
    `${this.apiURL}/search?q=${query.replace(/ /g, '+')}&type=${type}`;

  return {
    search: (query, type) => this.request(makeUrl(query, type)),
    albums: query => this.search.search(query, 'album'),
    tracks: query => this.search.search(query, 'track'),
    artists: query => this.search.search(query, 'artist'),
    playlists: query => this.search.search(query, 'playlist')
  };
}
