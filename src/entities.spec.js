import expect from 'must';
import express from 'express';
import {getEntitiesOfTable} from './entities';
import disableFollowTestTableOnly from './__tests__/testTableDisableFollow1.json';
import disableFollowTestTableAndThirdTableOnly from './__tests__/testTableDisableFollow2.json';

describe('getEntitiesOfTable', () => {

  const TEST_PORT = 14432;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;
  let server;
  let calledUrls;

  before(() => {
    return new Promise((resolve, reject) => {
      const app = express();
      app.use((req, res) => {
        calledUrls.push(req.url);
        if (req.url === '/tables') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-alltables.json`);
        } else if (req.url === '/completetable/1') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1.json`);
        } else if (req.url === '/completetable/2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2.json`);
        } else if (req.url === '/completetable/3') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3.json`);
        } else if (req.url === '/tables/1') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1-table.json`);
        } else if (req.url === '/tables/2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2-table.json`);
        } else if (req.url === '/tables/3') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3-table.json`);
        } else if (req.url === '/tables/1/columns') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1-columns.json`);
        } else if (req.url === '/tables/2/columns') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2-columns.json`);
        } else if (req.url === '/tables/3/columns') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3-columns.json`);
        } else if (req.url === '/tables/1/rows?offset=0&limit=500') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1-rows500.json`);
        } else if (req.url === '/tables/2/rows?offset=0&limit=500') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2-rows500.json`);
        } else if (req.url === '/tables/3/rows?offset=0&limit=500') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3-rows500.json`);
        } else if (req.url === '/tables/1/rows?offset=0&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1-rows1.json`);
        } else if (req.url === '/tables/2/rows?offset=0&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2-rows1.json`);
        } else if (req.url === '/tables/3/rows?offset=0&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3-rows1.json`);
        } else if (req.url === '/tables/1/rows?offset=2&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1-rows2.json`);
        } else if (req.url === '/tables/2/rows?offset=2&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2-rows2.json`);
        } else if (req.url === '/tables/3/rows?offset=2&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3-rows2.json`);
        } else if (req.url === '/tables/3/rows?offset=4&limit=2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3-rows3.json`);
        } else {
          res.end('error');
        }
      });
      server = app.listen(TEST_PORT, function (err) {
        if (err) {
          return reject(err);
        } else {
          return resolve();
        }
      });
    });
  });

  beforeEach(() => {
    calledUrls = [];
  });

  after(done => {
    server.close(done);
  });

  it('finds the server with all entities', () => {
    return getEntitiesOfTable('testTable', {pimUrl : SERVER_URL})
      .then(result => {
        expect(Object.keys(result)).to.eql(['1', '2', '3']);
      });
  });

  it('maps the rows to their object ids', () => {
    return getEntitiesOfTable('testTable', {pimUrl : SERVER_URL})
      .then(result => {
        expect(result['1'].rows).not.to.be.an.array();
        expect(result['1'].rows).to.be.an.object();
        expect(Object.keys(result['1'].rows)).to.eql(['1', '2', '3', '4']);
      });
  });

  it('requires a pimUrl', () => {
    expect(() => getEntitiesOfTable('someTable')).to.throw(/missing option pimUrl/i);
  });

  it('requires a pimUrl as string', () => {
    expect(() => getEntitiesOfTable('testTable', {pimUrl : true})).to.throw(/pimUrl.*string/i);
    expect(() => getEntitiesOfTable('testTable', {pimUrl : false})).to.throw(/pimUrl.*string/i);
    expect(() => getEntitiesOfTable('testTable', {pimUrl : []})).to.throw(/pimUrl.*string/i);
    expect(() => getEntitiesOfTable('testTable', {pimUrl : 123})).to.throw(/pimUrl.*string/i);
    return expect(getEntitiesOfTable('testTable', {pimUrl : SERVER_URL})).to.resolve.not.to.null();
  });

  describe('maxEntriesPerRequest setting', () => {

    it('may download in a paged fashion', () => {
      return getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : 2
      }).then(result => {
        expect(calledUrls.some(elem => /\/completetable\//.test(elem))).to.be.false();
        expect(calledUrls.some(elem => /\/tables\/1\/columns/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/1\/rows\?offset=0&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/1\/rows\?offset=2&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/2\/columns/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/2\/rows\?offset=0&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/2\/rows\?offset=2&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/3\/columns/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=2&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=4&limit=2/.test(elem))).to.be.true();

        expect(result['1'].rows).not.to.be.an.array();
        expect(result['1'].rows).to.be.an.object();
        expect(Object.keys(result['1'].rows)).to.eql(['1', '2', '3', '4']);
      });
    });

    it('will throw on a negative number', () => {
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : -1
      })).to.throw();
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : -5143
      })).to.throw();
    });

    it('will throw on NaN', () => {
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : NaN
      })).to.throw();
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : 'hello'
      })).to.throw();
    });

    it('will throw on non-integer values', () => {
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : 0.5
      })).to.throw();
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : -6.5
      })).to.throw();
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        maxEntriesPerRequest : Math.PI
      })).to.throw();
    });

  });

  describe('setting disableFollow', () => {

    it('requires an array', () => {
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        disableFollow : true
      })).to.throw(/array of columns/i);
    });

    it('requires an array of arrays', () => {
      expect(() => getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        disableFollow : [
          'abc', 2, true
        ]
      })).to.throw(/array of columns/i);
    });

    it('should not download the specified links', () => {
      return getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        disableFollow : [
          ['someLink']
        ]
      }).then(result => {
        expect(result).to.eql(disableFollowTestTableOnly);
      });
    });

    it('should not download specified links in sub-tables if defined', () => {
      return getEntitiesOfTable('testTable', {
        pimUrl : SERVER_URL,
        disableFollow : [
          ['someLink', 'anotherLink']
        ]
      }).then(result => {
        expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
      });
    });

  });

});
