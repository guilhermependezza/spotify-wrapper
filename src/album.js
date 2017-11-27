import makeAuthHeader from './make-auth-header';
import API_URL from './config';
import { toJson } from './utils';

export const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`, makeAuthHeader()).then(toJson);

export const getAlbums = ids =>
  fetch(`${API_URL}/albums?ids=${ids}`, makeAuthHeader()).then(toJson);

export const getAlbumTracks = id =>
  fetch(`${API_URL}/albums/${id}/tracks`, makeAuthHeader()).then(toJson);
