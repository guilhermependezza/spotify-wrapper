import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = fetch;

describe('Albums', () => {
  let stubbedFetch;
  let promise;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    promise = stubbedFetch.returnsPromise();
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => expect(getAlbum).to.exist);
    it('should have getAlbums method', () => expect(getAlbum).to.exist);
    it('should have getAlbumTracks method', () => expect(getAlbumTracks).to.exist);
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      getAlbum('asdfklasdkflklkasdf');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasdf');

      getAlbum('asdfklasdkflklkasda');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasda');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' });
      const albums = getAlbum('asdfklasdkflklkasdf');
      expect(albums.resolveValue).to.be.eql({ key: 'value' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      getAlbumTracks();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      getAlbumTracks('asdfklasdkflklkasdf');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasdf/tracks');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' });
      const albumTracks = getAlbumTracks('asdfklasdkflklkasdf');
      expect(albumTracks.resolveValue).to.be.eql({ key: 'value' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      getAlbums();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      getAlbums(['asdfklasdkflklkasdf', 'asdahrhasdasdf']);
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=asdfklasdkflklkasdf,asdahrhasdasdf');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' });
      const albums = getAlbums(['asdfklasdkflklkasdf']);
      expect(albums.resolveValue).to.be.eql({ key: 'value' });
    });
  });
});
