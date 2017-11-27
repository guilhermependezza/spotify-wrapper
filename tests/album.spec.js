import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

global.fetch = fetch;

describe('Albums', () => {
  let stubbedFetch, promise;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
    promise = stubbedFetch.returnsPromise();
  });

  afterEach(() => {
    stubbedFetch.restore();
  })

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    })
  })

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const albums = getAlbum();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      const albums = getAlbum('asdfklasdkflklkasdf');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasdf');

      const albums2 = getAlbum('asdfklasdkflklkasda');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasda');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' })
      const albums = getAlbum('asdfklasdkflklkasdf');
      expect(albums.resolveValue).to.be.eql({ key: 'value' });
    })
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const albumTracks = getAlbumTracks();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      const albumTracks = getAlbumTracks('asdfklasdkflklkasdf');
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/asdfklasdkflklkasdf/tracks');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' })
      const albumTracks = getAlbumTracks('asdfklasdkflklkasdf');
      expect(albumTracks.resolveValue).to.be.eql({ key: 'value' });
    })
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch method with correct URL', () => {
      const albums = getAlbums(['asdfklasdkflklkasdf', 'asdahrhasdasdf']);
      expect(stubbedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=asdfklasdkflklkasdf,asdahrhasdasdf');
    });

    it('should return correct data', () => {
      promise.resolves({ key: 'value' })
      const albums = getAlbums(['asdfklasdkflklkasdf']);
      expect(albums.resolveValue).to.be.eql({ key: 'value' });
    })
  })
})
