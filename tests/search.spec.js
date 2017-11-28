import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, albums, artists, tracks, playlists } from '../src/search';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let stubbedFetch;
  let promise;
  let spotify;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    promise = stubbedFetch.returnsPromise();
    spotify = new SpotifyWrapper({
      token: 'foo'
    });
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('should exist method search', () => expect(spotify.search.search).to.exist);
    it('should exist method albums', () => expect(spotify.search.albums).to.exist);
    it('should exist method artists', () => expect(spotify.search.artists).to.exist);
    it('should exist method tracks', () => expect(spotify.search.tracks).to.exist);
    it('should exist method playlists', () => expect(spotify.search.playlists).to.exist);
  });

  describe('Generic search', () => {
    it('should call fetch function', () => {
      spotify.search.search('blabla', 'blabla');
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        spotify.search.search('fleshgod apocalypse', 'artist');
        expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist');

        spotify.search.search('fleshgod apocalypse', 'album');
        expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist');
      });

      context('passing more than one type', () => {
        spotify.search.search('fleshgod apocalypse', ['artist', 'album']);
        expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist,album');
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'blablabla' });
      const artists = spotify.search.search('fleshgod apocalypse', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'blablabla' });
    });
  });

  describe('Search albums', () => {
    it('should call fetch', () => {
      spotify.search.albums('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.albums('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=album');
    });
  });

  describe('Search tracks', () => {
    it('should call fetch', () => {
      spotify.search.tracks('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.tracks('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=track');
    });
  });

  describe('Search artists', () => {
    it('should call fetch', () => {
      spotify.search.artists('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.artists('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=artist');
    });
  });

  describe('Search playlists', () => {
    it('should call fetch', () => {
      spotify.search.playlists('Muse');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.playlists('fleshgod apocalypse');
      expect(stubbedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=fleshgod+apocalypse&type=playlist');
    });
  });
});
