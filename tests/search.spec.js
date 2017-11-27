import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let stubbedFetch;
  let promise;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    promise = stubbedFetch.returnsPromise();
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('should exist method search', () => expect(search).to.exist);
    it('should exist method searchAlbums', () => expect(searchAlbums).to.exist);
    it('should exist method searchArtists', () => expect(searchArtists).to.exist);
    it('should exist method searchTracks', () => expect(searchTracks).to.exist);
    it('should exist method searchPlaylists', () => expect(searchPlaylists).to.exist);
  });

  describe('Generic search', () => {
    it('should call fetch function', () => {
      search('blabla', 'blabla');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('fleshgod apocalypse', 'artist');
        expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist');

        search('fleshgod apocalypse', 'album');
        expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist');
      });

      context('passing more than one type', () => {
        search('fleshgod apocalypse', ['artist', 'album']);
        expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist,album');
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'blablabla' });
      const artists = search('fleshgod apocalypse', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'blablabla' });
    });
  });

  describe('Search albums', () => {
    it('should call fetch', () => {
      searchAlbums('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      searchAlbums('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=album');
    });
  });

  describe('Search tracks', () => {
    it('should call fetch', () => {
      searchTracks('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      searchTracks('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=track');
    });
  });

  describe('Search artists', () => {
    it('should call fetch', () => {
      searchArtists('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      searchArtists('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist');
    });
  });

  describe('Search playlists', () => {
    it('should call fetch', () => {
      searchPlaylists('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      searchPlaylists('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=playlist');
    });
  });
});
