import { makeAuthHeader } from './make-auth-header';
import { API_URL } from './config';
import { toJson } from './utils';

const makeUrl = (query, type) =>
  `${ API_URL }/search?q=${query.replace(/ /g, '+')}&type=${type}`;

export const search = (query, type) =>
  fetch(makeUrl(query, type), makeAuthHeader()).then(toJson);

export const searchAlbums = query => search(query, 'album');

export const searchTracks = query => search(query, 'track');

export const searchArtists = query => search(query, 'artist');

export const searchPlaylists = query => search(query, 'playlist');
