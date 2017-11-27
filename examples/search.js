import fetch from 'node-fetch';
import { searchAlbums } from '../src/search';

global.fetch = fetch;
const albums = searchAlbums('fleshgod apocalypse');
albums.then(data => console.log(data));
