import expect from 'must';
import express from 'express';
import {getEntitiesOfTable} from './entities';

describe.only('getEntitiesOfTable', () => {

  const TEST_PORT = 14432;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;
  let server;

  before(() => {
    return new Promise((resolve, reject) => {
      const app = express();
      app.use((req, res) => {
        if (req.path === '/tables') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-alltables.json`);
        } else if (req.path === '/completetable/1') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-1.json`);
        } else if (req.path === '/completetable/2') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-2.json`);
        } else if (req.path === '/completetable/3') {
          res.sendFile(`${__dirname}/__tests__/pimFixture-3.json`);
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
    expect(() => {
      getEntitiesOfTable('someTable');
    }).to.throw(/missing option pimUrl/i);
  });

  it('requires a pimUrl as string', () => {
    expect(() => {
      getEntitiesOfTable('someTable', {pimUrl : true});
    }).to.throw(/pimUrl.*string/i);
    expect(() => {
      getEntitiesOfTable('someTable', {pimUrl : false});
    }).to.throw(/pimUrl.*string/i);
    expect(() => {
      getEntitiesOfTable('someTable', {pimUrl : []});
    }).to.throw(/pimUrl.*string/i);
    expect(() => {
      getEntitiesOfTable('someTable', {pimUrl : 123});
    }).to.throw(/pimUrl.*string/i);
    expect(() => {
      getEntitiesOfTable('someTable', {pimUrl : SERVER_URL});
    }).not.to.throw();
  });

  describe('setting disableFollow', () => {

    it('requires an array of arrays', () => {
      expect(() => {
        getEntitiesOfTable('someTable', {pimUrl : SERVER_URL, disableFollow : true})
      }).to.throw(/array of columns/i);
    });

    it('should not download the specified links', () => {
      // FIXME correct test
      expect(true).to.be.false();
    });

  });

});
