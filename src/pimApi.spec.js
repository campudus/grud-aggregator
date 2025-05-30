
import expect from "must";
import express from "express";
import {getAllTables, getTablesByNames, getCompleteTable} from "./pimApi";

describe("pimApi", () => {

  const TEST_PORT = 14432;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;

  let server;
  let calledUrls;
  let headers;

  before(() => {
    return new Promise((resolve, reject) => {
      const app = express();
      app.use((req, res) => {
        calledUrls.push(req.url);
        headers = req.headers;

        const sendFile = (fileName) => {
          if (process.env.FORCE_DELAY_MS) {
            setTimeout(() => {
              res.sendFile(fileName);
            }, process.env.FORCE_DELAY_MS);
          } else {
            res.sendFile(fileName);
          }
        };

        if (req.url === "/tables") {
          sendFile(`${__dirname}/__tests__/pimFixture-alltables.json`);
        } else if (req.url === "/tables/1") {
          sendFile(`${__dirname}/__tests__/pimFixture-1-table.json`);
        } else if (req.url === "/tables/3") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-table.json`);
        } else if (req.url === "/tables/3/columns") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-columns.json`);
        } else if (req.url === "/tables/1/rows?offset=0&limit=500") {
          sendFile(`${__dirname}/__tests__/pimFixture-1-rows500.json`);
        } else if (req.url === "/tables/3/rows?offset=0&limit=2") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-rows1.json`);
        } else if (req.url === "/tables/3/rows?offset=2&limit=2") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-rows2.json`);
        } else if (req.url === "/tables/3/rows?offset=4&limit=2") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-rows3.json`);
        } else if (req.url === "/tables/3/rows?offset=0&limit=2&archived=true") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-rows3.json`);
        } else if (req.url === "/tables/3/rows?offset=0&limit=2&archived=false") {
          sendFile(`${__dirname}/__tests__/pimFixture-3-rows3.json`);
        } else {
          res.end("error");
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
    process.env.FORCE_DELAY_MS = null;

    calledUrls = [];
    headers = {};
  });

  after(done => {
    server.close(done);
  });

  describe("getAllTables", () => {
    it("should expect an object with entry 'pimUrl' or a string as param", () => {
      expect(() => getAllTables({})).to.throw(/pimUrl.*missing/i);
      expect(() => getAllTables({pimUrl: false})).to.throw(/pimUrl.*string/i);
      expect(() => getAllTables({pimUrl: true})).to.throw(/pimUrl.*string/i);
      expect(() => getAllTables({pimUrl: {}})).to.throw(/pimUrl.*string/i);
      expect(() => getAllTables({pimUrl: 123})).to.throw(/pimUrl.*string/i);
      return expect(getAllTables({pimUrl: SERVER_URL})).to.resolve.not.to.null();
    });

    it("should download all tables", () => {
      return getAllTables({
        pimUrl: SERVER_URL
      }).then(() => {
        expect(calledUrls.some(elem => /\/tables$/.test(elem))).to.be.true();
      });
    });

    it("should set headers if available in options", () => {
      return getAllTables({
        pimUrl: SERVER_URL,
        headers: {"test": "test"}
      }).then(() => {
        expect(headers).to.have.property("test");
        expect(headers.test).to.equal("test");
      });
    });

    it("should timeout after number of milliseconds specified in options", () => {
      const TIMEOUT_MS = 100;

      process.env.FORCE_DELAY_MS = 1000;

      return getAllTables({
        pimUrl: SERVER_URL,
        timeout: TIMEOUT_MS
      }).must.reject.with.error(new RegExp(`timeout.+${TIMEOUT_MS}ms`, "i"));
    });
  });

  describe("getTablesByNames", () => {
    it("should expect an object with entry 'pimUrl' or a string as param", () => {
      expect(() => getTablesByNames({})).to.throw(/pimUrl.*missing/i);
      expect(() => getTablesByNames({pimUrl: false})).to.throw(/pimUrl.*string/i);
      expect(() => getTablesByNames({pimUrl: true})).to.throw(/pimUrl.*string/i);
      expect(() => getTablesByNames({pimUrl: {}})).to.throw(/pimUrl.*string/i);
      expect(() => getTablesByNames({pimUrl: 123})).to.throw(/pimUrl.*string/i);
      return expect(getTablesByNames({pimUrl: SERVER_URL})).to.resolve.not.to.null();
    });

    it("should set headers if available in options", () => {
      return getTablesByNames({
        pimUrl: SERVER_URL,
        headers: {"test": "test"}
      }, "testTable").then(() => {
        expect(headers).to.have.property("test");
        expect(headers.test).to.equal("test");
      });
    });

    it("should return tables filtered by name", () => {
      return getTablesByNames({
        pimUrl: SERVER_URL
      }, "testTable").then(result => {
        expect(calledUrls.some(elem => /\/tables$/.test(elem))).to.be.true();
        expect(result.length).to.equal(1);
        expect(result[0]).to.have.property("id");
        expect(result[0].name).to.equal("testTable");
      });
    });

    it("should return tables filtered by multiple names", () => {
      return getTablesByNames({
        pimUrl: SERVER_URL
      }, "testTable", "anotherTestTable").then(result => {
        expect(calledUrls.some(elem => /\/tables$/.test(elem))).to.be.true();
        expect(result.length).to.equal(2);
        expect(result[0]).to.have.property("id");
        expect(result[0].name).to.equal("testTable");
        expect(result[1]).to.have.property("id");
        expect(result[1].name).to.equal("anotherTestTable");
      });
    });
  });

  describe("getCompleteTable", () => {
    it("should expect an object with entry 'pimUrl' or a string as param", () => {
      expect(() => getCompleteTable({}, 1, 500)).to.throw(/pimUrl.*missing/i);
      expect(() => getCompleteTable({pimUrl: false}, 1, 500)).to.throw(/pimUrl.*string/i);
      expect(() => getCompleteTable({pimUrl: true}, 1, 500)).to.throw(/pimUrl.*string/i);
      expect(() => getCompleteTable({pimUrl: {}}, 1, 500)).to.throw(/pimUrl.*string/i);
      expect(() => getCompleteTable({pimUrl: 123}, 1, 500)).to.throw(/pimUrl.*string/i);
      return expect(getCompleteTable({pimUrl: SERVER_URL}, 1, 500)).to.resolve.not.to.null();
    });

    it("should expect param tableId as positive integer", () => {
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, "1", 500)).to.throw(/tableId.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, false, 500)).to.throw(/tableId.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, true, 500)).to.throw(/tableId.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, {}, 500)).to.throw(/tableId.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, [], 500)).to.throw(/tableId.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, null, 500)).to.throw(/tableId.*integer/i);
      return expect(getCompleteTable({pimUrl: SERVER_URL}, 1, 500)).to.resolve.not.to.null();
    });

    it("should expect param maxEntries as positive integer", () => {
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, 1, "100")).to.throw(/maxEntriesPerRequest.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, 1, true)).to.throw(/maxEntriesPerRequest.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, 1, false)).to.throw(/maxEntriesPerRequest.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, 1, [])).to.throw(/maxEntriesPerRequest.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, 1, {})).to.throw(/maxEntriesPerRequest.*integer/i);
      expect(() => getCompleteTable({pimUrl: SERVER_URL}, 1, null)).to.throw(/maxEntriesPerRequest.*integer/i);
      return expect(getCompleteTable({pimUrl: SERVER_URL}, 1, 500)).to.resolve.not.to.null();
    });

    it("should return table filtered by id and max entries 2", () => {
      return getCompleteTable({
        pimUrl: SERVER_URL
      }, 3, 2).then(result => {
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=2&limit=2/.test(elem))).to.be.true();
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=4&limit=2/.test(elem))).to.be.true();

        expect(result).to.have.property("id");
        expect(result.name).to.equal("thirdTestTable");
        expect(result).to.have.property("rows");
        expect(result.rows).to.be.an.array();
        expect(result.rows.length).to.equal(5);
      });
    });

    it("should construct the correct URL for the rows API call without setting the archived parameter", () => {
      return getCompleteTable({
        pimUrl: SERVER_URL
      }, 3, 2).then(result => {
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=2/.test(elem))).to.be.true();

        expect(result).to.have.property("id");
        expect(result.name).to.equal("thirdTestTable");
        expect(result).to.have.property("rows");
        expect(result.rows).to.be.an.array();
      });
    });

    it("should construct the correct URL for the rows API call with archived parameter set to true", () => {
      return getCompleteTable({
        pimUrl: SERVER_URL
      }, 3, 2, true).then(result => {
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=2&archived=true/.test(elem))).to.be.true();

        expect(result).to.have.property("id");
        expect(result.name).to.equal("thirdTestTable");
        expect(result).to.have.property("rows");
        expect(result.rows).to.be.an.array();
      });
    });

    it("should construct the correct URL for the rows API call with archived parameter set to false", () => {
      return getCompleteTable({
        pimUrl: SERVER_URL
      }, 3, 2, false).then(result => {
        expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=2&archived=false/.test(elem))).to.be.true();

        expect(result).to.have.property("id");
        expect(result.name).to.equal("thirdTestTable");
        expect(result).to.have.property("rows");
        expect(result.rows).to.be.an.array();
      });
    });

    it("should timeout after number of milliseconds specified in options", () => {
      const TIMEOUT_MS = 100;

      process.env.FORCE_DELAY_MS = 1000;

      return getCompleteTable({
        pimUrl: SERVER_URL,
        timeout: TIMEOUT_MS
      }, 3, 2, false).must.reject.with.error(new RegExp(`timeout.+${TIMEOUT_MS}ms`, "i"));
    });
  });

});
