import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = fetch;

describe('Index', () => {
  it('should create a SpotifyWrapper instance', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.instanceof(SpotifyWrapper);
  });

  it('should receive apiUrl as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blablabla'
    });
    expect(spotify.apiURL).to.be.equal('blablabla');
  });

  it('should use default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: '1234'
    });
    expect(spotify.token).to.be.equal('1234');
  });

  describe('request method', () => {
    let stubbedFetch;
    let promise;

    beforeEach(() => {
      stubbedFetch = sinon.stub(global, 'fetch');
      promise = stubbedFetch.returnsPromise();
    });

    afterEach(() => {
      stubbedFetch.restore();
    });

    it('should exist a request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.be.exist;
    });

    it('should call fetch when request', () => {
      const request = new SpotifyWrapper({ token: 'asdf' }).request('url');
      expect(stubbedFetch).to.be.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const request = new SpotifyWrapper({ token: 'asdf' }).request('url');
      expect(stubbedFetch).to.be.calledWith('url');
    });

    it('should call fetch with correct header', () => {
      const headers = {
        headers: {
          authorization: `Bearer foo`
        }
      };

      const request = new SpotifyWrapper({ token: 'foo' }).request('url');
      expect(stubbedFetch).to.be.calledWith('url', headers);
    });
  });
});
