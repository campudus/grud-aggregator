import expect from "must";
import express from "express";
import {getEntitiesOfTable, getEntitiesOfTables} from "./entities.js";
import disableFollowTestTableOnly from "./__tests__/testTableDisableFollow1.json" with { type: "json" };
import disableFollowTestTableAndThirdTableOnly from "./__tests__/testTableDisableFollow2.json" with { type: "json" };
import disableFollowTestTableAndLinkedTables from "./__tests__/testTableDisableFollow3.json" with { type: "json" };
import includeColumnsTestTableOnly from "./__tests__/testTableIncludeColumns1.json" with { type: "json" };
import includeColumnsAllTables from "./__tests__/testTableIncludeColumns2.json" with { type: "json" };

describe("entities.js", () => {
  const TABLE_IDS = [1, 2, 3, 4, 5];

  const TEST_PORT = 14432;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;
  let server;
  let calledUrls;

  before(() => {
    const DATA_BY_URL = {
      "/tables": "pimFixture-alltables.json"
    };

    TABLE_IDS.forEach(id => Object.assign(DATA_BY_URL, {
      [`/completetable/${id}`]: `pimFixture-${id}.json`,
      [`/tables/${id}`]: `pimFixture-${id}-table.json`,
      [`/tables/${id}/columns`]: `pimFixture-${id}-columns.json`,
      [`/tables/${id}/rows?offset=0&limit=500`]: `pimFixture-${id}-rows500.json`,
      [`/tables/${id}/rows?offset=0&limit=500&archived=true`]: `pimFixture-${id}-rows500.json`,
      [`/tables/${id}/rows?offset=0&limit=500&archived=false`]: `pimFixture-${id}-rows500.json`,
      [`/tables/${id}/rows?offset=0&limit=2`]: `pimFixture-${id}-rows1.json`,
      [`/tables/${id}/rows?offset=2&limit=2`]: `pimFixture-${id}-rows2.json`,
      [`/tables/${id}/rows?offset=4&limit=2`]: `pimFixture-${id}-rows3.json`
    }));

    return new Promise((resolve, reject) => {
      const app = express();

      app.use((req, res) => {
        calledUrls.push(req.url);

        const data = DATA_BY_URL[req.url];

        if (!data) {
          res.end("error");
        } else {
          const sendFile = () => res.sendFile(`${import.meta.dirname}/__tests__/${data}`);

          if (process.env.FORCE_DELAY_MS) {
            setTimeout(() => sendFile(), process.env.FORCE_DELAY_MS);
          } else {
            sendFile();
          }
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
  });

  after(done => {
    server.close(done);
  });

  describe("getEntitiesOfTables", () => {
    it("retrieves entities of multiple tables", () => {
      return getEntitiesOfTables(["testTable", "fooTestTable", "quxTestTable"], {pimUrl: SERVER_URL})
        .then(result => {
          expect(Object.keys(result)).to.eql(TABLE_IDS.map(String));

          TABLE_IDS.forEach(id => {
            expect(result[id].rows).not.to.be.empty();
            expect(result[id].columns).not.to.be.empty();
          });
        });
    });

    it("maps the rows to their object ids for multiple tables", () => {
      return getEntitiesOfTables(["testTable", "fooTestTable", "quxTestTable"], {pimUrl: SERVER_URL})
        .then(result => {
          TABLE_IDS.forEach(id => {
            expect(result[id].rows).to.be.an.object();
          });

          expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
          expect(Object.keys(result["2"].rows)).to.eql(["1", "2", "3"]);
          expect(Object.keys(result["3"].rows)).to.eql(["1", "2", "3", "4", "5"]);
          expect(Object.keys(result["4"].rows)).to.eql(["1"]);
          expect(Object.keys(result["5"].rows)).to.eql(["1"]);
        });
    });
  });

  describe("getEntitiesOfTable", () => {
    it("retrieves entities of a test table", () => {
      return getEntitiesOfTable("testTable", {pimUrl: SERVER_URL})
        .then(result => {
          expect(Object.keys(result)).to.eql(["1", "2", "3"]);
        });
    });

    it("maps the rows to their object ids", () => {
      return getEntitiesOfTable("testTable", {pimUrl: SERVER_URL})
        .then(result => {
          expect(result["1"].rows).not.to.be.an.array();
          expect(result["1"].rows).to.be.an.object();
          expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
        });
    });

    it("requires a pimUrl", () => {
      expect(() => getEntitiesOfTable("someTable")).to.throw(/missing option pimUrl/i);
    });

    it("requires a pimUrl as string", () => {
      expect(() => getEntitiesOfTable("testTable", {pimUrl: true})).to.throw(/pimUrl.*string/i);
      expect(() => getEntitiesOfTable("testTable", {pimUrl: false})).to.throw(/pimUrl.*string/i);
      expect(() => getEntitiesOfTable("testTable", {pimUrl: []})).to.throw(/pimUrl.*string/i);
      expect(() => getEntitiesOfTable("testTable", {pimUrl: 123})).to.throw(/pimUrl.*string/i);
      return expect(getEntitiesOfTable("testTable", {pimUrl: SERVER_URL})).to.resolve.not.to.null();
    });

    describe("maxEntriesPerRequest setting", () => {

      it("may download in a paged fashion", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: 2
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

          expect(result["1"].rows).not.to.be.an.array();
          expect(result["1"].rows).to.be.an.object();
          expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
        });
      });

      it("will throw on a negative number", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: -1
        })).to.throw();
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: -5143
        })).to.throw();
      });

      it("will throw on NaN", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: NaN
        })).to.throw();
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: "hello"
        })).to.throw();
      });

      it("will throw on non-integer values", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: 0.5
        })).to.throw();
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: -6.5
        })).to.throw();
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          maxEntriesPerRequest: Math.PI
        })).to.throw();
      });
    });

    describe("setting disableFollow", () => {
      it("requires an array", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: true
        })).to.throw(/array of column lists/i);
      });

      it("requires an array of arrays", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            "abc", 2, true
          ]
        })).to.throw(/array of column lists/i);
      });

      it("does not allow '*' / '**' more than once in a column list", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["**", "col1", "**", "col2"]
          ]
        })).to.throw(/'\*\*' can only appear once/i);

        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["*", "col1", "*", "col2"]
          ]
        })).to.throw(/'\*' \/ '\*\*' can only appear once/i);
      });

      it("requires exactly one column after '**'", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["**"]
          ]
        })).to.throw(/must contain exactly one column/i);

        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["**", "col1", "col2"]
          ]
        })).to.throw(/must contain exactly one column/i);

        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["col1", "**", "col2", "col3"]
          ]
        })).to.throw(/must contain exactly one column/i);

        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["col1", "**"]
          ]
        })).to.throw(/must contain exactly one column/i);
      });

      it("should not download specified links on top level", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["someLink"]
          ]
        }).then(result => {
          expect(result).to.eql(disableFollowTestTableOnly);
        });
      });

      it("should not download specified links in sub-tables if defined", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["someLink", "anotherLink"]
          ]
        }).then(result => {
          expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
        });
      });

      it("should not download specified links in sub-tables if defined with '*'", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["*", "anotherLink"]
          ]
        })
          .then(result => {
            expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
          });
      });

      it("should download top level links if erroneously defined with '*' as first entry", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          disableFollow: [
            ["*", "someLink"]
          ]
        })
          .then(result => {
            expect(result).to.eql(disableFollowTestTableAndLinkedTables);
          });
      });

      it("should not download specified links in all tables if defined with '**'", () => {
        return Promise
          .resolve()
          .then(() => getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            disableFollow: [
              ["**", "someLink"]
            ]
          }))
          .then(result => {
            expect(result).to.eql(disableFollowTestTableOnly);
          })
          .then(() => getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            disableFollow: [
              ["**", "anotherLink"]
            ]
          }))
          .then(result => {
            expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
          })
          .then(() => getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            disableFollow: [
              ["someLink", "**", "anotherLink"]
            ]
          }))
          .then(result => {
            expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
          });
      });

      it("should not download specified links in all tables if defined with a combination of '*' and '**'", () => {
        return Promise
          .resolve()
          .then(() => getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            disableFollow: [
              ["*", "**", "anotherLink"]
            ]
          }))
          .then(result => {
            expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
          })
          .then(() => getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            disableFollow: [
              ["someLink", "**", "*"]
            ]
          }))
          .then(result => {
            expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
          });
      });
    });

    describe("setting includeColumns", () => {
      it("requires an array", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeColumns: true
        })).to.throw(/array of columns/i);
      });

      it("requires an array of strings", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeColumns: [
            "abc", 2, true
          ]
        })).to.throw(/array of columns/i);
      });

      it("should not download any links", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeColumns: []
        }).then(result => {
          expect(result).to.eql(includeColumnsTestTableOnly);
        });
      });

      it("should download specified link", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeColumns: ["someLink"]
        }).then(result => {
          expect(result).to.eql(includeColumnsAllTables);
        });
      });

      it("should not download specified link if it is disabled", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeColumns: ["someLink"],
          disableFollow: [["someLink"]]
        }).then(result => {
          expect(result).to.eql(includeColumnsTestTableOnly);
        });
      });
    });

    describe("setting archived", () => {
      it("requires a boolean", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          archived: "false"
        })).to.throw(/boolean/i);
      });

      it("should not include archived query in URL of rows API call - when not set as param of getEntitiesOfTable", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL
        }).then(result => {
          expect(calledUrls.some(elem => /\/completetable\//.test(elem))).to.be.false();
          expect(calledUrls.some(elem => /\/tables\/1\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/1\/rows\?offset=0&limit=500/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/2\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/2\/rows\?offset=0&limit=500/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/3\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=500/.test(elem))).to.be.true();

          expect(result["1"].rows).not.to.be.an.array();
          expect(result["1"].rows).to.be.an.object();
          expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
        });
      });

      it("should include archived query equals true in URL of rows API call", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          archived: true
        }).then(result => {
          expect(calledUrls.some(elem => /\/completetable\//.test(elem))).to.be.false();
          expect(calledUrls.some(elem => /\/tables\/1\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/1\/rows\?offset=0&limit=500&archived=true/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/2\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/2\/rows\?offset=0&limit=500&archived=true/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/3\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=500&archived=true/.test(elem))).to.be.true();

          expect(result["1"].rows).not.to.be.an.array();
          expect(result["1"].rows).to.be.an.object();
          expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
        });
      });

      it("should include archived query equals false in URL of rows API call", () => {
        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          archived: false
        }).then(result => {
          expect(calledUrls.some(elem => /\/completetable\//.test(elem))).to.be.false();
          expect(calledUrls.some(elem => /\/tables\/1\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/1\/rows\?offset=0&limit=500&archived=false/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/2\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/2\/rows\?offset=0&limit=500&archived=false/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/3\/columns/.test(elem))).to.be.true();
          expect(calledUrls.some(elem => /\/tables\/3\/rows\?offset=0&limit=500&archived=false/.test(elem))).to.be.true();

          expect(result["1"].rows).not.to.be.an.array();
          expect(result["1"].rows).to.be.an.object();
          expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
        });
      });
    });

    describe("setting timeout", () => {
      it("should throw if not an integer", () => {
        expect(() => getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          timeout: "1000"
        })).to.throw(/integer/i);
      });

      it("should timeout after specified milliseconds", () => {
        const TIMEOUT_MS = 100;

        process.env.FORCE_DELAY_MS = 1000;

        return getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          timeout: TIMEOUT_MS
        }).must.reject.with.error(new RegExp(`timed out.+${TIMEOUT_MS}ms`, "i"));
      });
    });
  });

});
