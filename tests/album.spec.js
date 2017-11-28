import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getTracks } from '../src/album';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = fetch;

describe('Albums', () => {
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

  describe('smoke tests', () => {
    it('should have getAlbum method', () => expect(spotify.album.getAlbum).to.exist);
    it('should have getAlbums method', () => expect(spotify.album.getAlbums).to.exist);
    it('should have getTracks method', () => expect(spotify.album.getTracks).to.exist);
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbum();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      spotify.album.getAlbum('asdfklasdkflklkasdf');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasdf');

      spotify.album.getAlbum('asdfklasdkflklkasda');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasda');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' });
      const albums = spotify.album.getAlbum('asdfklasdkflklkasdf');
      expect(albums.resolveValue).to.be.eql({ key: 'value' });
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      spotify.album.getTracks();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      spotify.album.getTracks('asdfklasdkflklkasdf');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasdf/tracks');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' });
      const albumTracks = spotify.album.getTracks('asdfklasdkflklkasdf');
      expect(albumTracks.resolveValue).to.be.eql({ key: 'value' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbums();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      spotify.album.getAlbums(['asdfklasdkflklkasdf', 'asdahrhasdasdf']);
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=asdfklasdkflklkasdf,asdahrhasdasdf');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' });
      const albums = spotify.album.getAlbums(['asdfklasdkflklkasdf']);
      expect(albums.resolveValue).to.be.eql({ key: 'value' });
    });
  });
});
