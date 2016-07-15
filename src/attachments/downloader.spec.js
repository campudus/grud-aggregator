import expect from 'must';
import express from 'express';
import tmp from 'tmp';
import fs from 'fs-extra';
import { downloader } from './downloader';

describe('downloader', () => {

  const TEST_PORT = 14432;
  const SERVER_FIXTURES = `${__dirname}/__tests__/server`;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;
  let server;

  before(() => {
    return new Promise((resolve, reject) => {
      const app = express();
      app.use('/files', express.static(SERVER_FIXTURES));
      server = app.listen(TEST_PORT, function (err) {
        if (err) {
          return reject(err);
        } else {
          return resolve();
        }
      });
    });
  });

  after(done => {
    server.close(done);
  });

  it('expects a pimUrl option', () => {
    expect(() => downloader({downloadPath : 'out'})).to.throw(/missing pimUrl/i);
  });

  it('expects a downloadPath option', () => {
    expect(() => downloader({pimUrl : SERVER_URL})).to.throw(/missing downloadPath/i);
  });

  it('returns a function so it can be used in promise chain', () => {
    expect(downloader({pimUrl : SERVER_URL, downloadPath : 'out'})).to.be.a.function();
  });

  it('is possible to download single file', () => {
    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;

    return Promise.resolve([{
      url : '/files/11111111-1111-1111-1111-111111111111/en/1-english.png',
      path : '11111111-1111-1111-0000-111111111111.png'
    }])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : outPath
      }))
      .then(downloaded => {
        expect(downloaded.length).to.be(1);
        return Promise.all([
          statOf(`${__dirname}/__tests__/server/11111111-1111-1111-1111-111111111111/en/1-english.png`),
          statOf(`${__dirname}/__tests__/server/11111111-1111-1111-1111-111111111111/de/1-deutsch.png`),
          statOf(`${outPath}/11111111-1111-1111-0000-111111111111.png`)
        ]);
      })
      .then(([expectedA, expectedB, actualA]) => {
        expect(actualA.size).to.be(expectedA.size);
        expect(actualA.size).to.be(expectedB.size);
      })
      .catch(err => expect(err).to.be.null())
      .then(cleanUp(tmpDir));
  });

  it('can download multiple attachments at once', () => {
    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;

    return Promise.resolve([{
      url : '/files/22222222-2222-2222-2222-aaaaaaaaaaaa/en/2a-english.png',
      path : '22222222-2222-2222-0000-aaaaaaaaaaaa.png'
    }, {
      url : '/files/22222222-2222-2222-2222-bbbbbbbbbbbb/de/2b-deutsch.png',
      path : '22222222-2222-2222-0000-bbbbbbbbbbbb.png'
    }])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : outPath
      }))
      .then(downloaded => {
        expect(downloaded.length).to.be(2);
        return Promise.all([
          statOf(`${__dirname}/__tests__/server/22222222-2222-2222-2222-aaaaaaaaaaaa/en/2a-english.png`),
          statOf(`${__dirname}/__tests__/server/22222222-2222-2222-2222-bbbbbbbbbbbb/de/2b-deutsch.png`),
          statOf(`${outPath}/22222222-2222-2222-0000-aaaaaaaaaaaa.png`),
          statOf(`${outPath}/22222222-2222-2222-0000-bbbbbbbbbbbb.png`)
        ]);
      })
      .then(([expectedA, expectedB, actualA, actualB]) => {
        expect(actualA.size).to.be(expectedA.size);
        expect(actualB.size).to.be(expectedB.size);
      })
      .catch(err => expect(err).to.be.null())
      .then(cleanUp(tmpDir));
  });

  it('does not break when empty array of files is given', () => {
    const tmpDir = tmp.dirSync({unsafeCleanup : true});
    const outPath = tmpDir.name;

    return Promise.resolve([])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : outPath
      }))
      .then(downloaded => expect(downloaded.length).to.be(0))
      .catch(err => expect(err).to.be.null())
      .then(cleanUp(tmpDir));
  });

  it('fails gracefully if fed with string', () => {
    return Promise.resolve('plain wrong.')
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : 'out'
      }))
      .then(downloaded => expect(downloaded.length).to.be(0))
      .catch(err => expect(err).to.be.an.error(/expected array of \{url, path}/i));
  });

  it('fails gracefully if given an array with a string', () => {
    return Promise.resolve(['plain wrong.'])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : 'out'
      }))
      .then(downloaded => expect(downloaded.length).to.be(0))
      .catch(err => expect(err).to.be.an.error(/expected array of \{url, path}/i));
  });

  it('fails gracefully if fed with array of empty object', () => {
    return Promise.resolve([{}])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : 'out'
      }))
      .then(downloaded => expect(downloaded.length).to.be(0))
      .catch(err => expect(err).to.be.an.error(/expected array of \{url, path}/i));
  });

  it('fails gracefully if fed with array of objects where url is missing', () => {
    return Promise.resolve([{path : '/out.png'}])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : 'out'
      }))
      .then(downloaded => expect(downloaded.length).to.be(0))
      .catch(err => expect(err).to.be.an.error(/expected array of \{url, path}/i));
  });

  it('fails gracefully if fed with array of objects where path is missing', () => {
    return Promise.resolve([{url : '/something'}])
      .then(downloader({
        pimUrl : SERVER_URL,
        downloadPath : 'out'
      }))
      .then(downloaded => expect(downloaded.length).to.be(0))
      .catch(err => expect(err).to.be.an.error(/expected array of \{url, path}/i));
  });

});

function cleanUp(tmpDir) {
  return () => {
    tmpDir.removeCallback();
  };
}

function statOf(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}
