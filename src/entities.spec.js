import expect from "must";
import express from "express";
import {getEntitiesOfTable, getEntitiesOfTables} from "./entities.js";

import testTableOnly from "./__tests__/entitiesFixture-testTableOnly.json" with { type: "json" };
import testTableAndThirdTableOnly from "./__tests__/entitiesFixture-testTableAndThirdTableOnly.json" with { type: "json" };
import testTableAndLinkedTables from "./__tests__/entitiesFixture-testTableAndLinkedTables.json" with { type: "json" };

describe("entities.js", () => {
  const TABLE_IDS = [1, 2, 3, 4, 5];

  const TEST_PORT = 14432;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;
  let server;
  let calledUrls;

  before(() => {
    const DATA_BY_URL = {
      "/tables": "pimFixture-alltables.json",
      "/structure": "pimFixture-structure.json"
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
          const forceDelay = parseInt(process.env.FORCE_DELAY_MS);

          if (Number.isFinite(forceDelay)) {
            setTimeout(() => sendFile(), forceDelay);
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
    it("retrieves entities of multiple tables", async () => {
      const result = await getEntitiesOfTables(["testTable", "fooTestTable", "quxTestTable"], {pimUrl: SERVER_URL});
      
      expect(Object.keys(result)).to.eql(TABLE_IDS.map(String));

      TABLE_IDS.forEach(id => {
        expect(result[id].rows).not.to.be.empty();
        expect(result[id].columns).not.to.be.empty();
      });
    });

    it("maps the rows to their object ids for multiple tables", async () => {
      const result = await getEntitiesOfTables(["testTable", "fooTestTable", "quxTestTable"], {pimUrl: SERVER_URL});
        
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

  describe("getEntitiesOfTable", () => {
    it("retrieves entities of a test table", async () => {
      const result = await getEntitiesOfTable("testTable", {pimUrl: SERVER_URL});
      
      expect(Object.keys(result)).to.eql(["1", "2", "3"]);
    });

    it("maps the rows to their object ids", async () => {
      const result = await getEntitiesOfTable("testTable", {pimUrl: SERVER_URL});
        
      expect(result["1"].rows).not.to.be.an.array();
      expect(result["1"].rows).to.be.an.object();
      expect(Object.keys(result["1"].rows)).to.eql(["1", "2", "3", "4"]);
    });

    it("requires a pimUrl", async () => {
      await expect(getEntitiesOfTable("someTable")).to.reject.with.error(/missing option pimUrl/i);
    });

    it("requires a pimUrl as string", async () => {
      await expect(getEntitiesOfTable("testTable", {pimUrl: true})).to.reject.with.error(/pimUrl.*string/i);
      await expect(getEntitiesOfTable("testTable", {pimUrl: false})).to.reject.with.error(/pimUrl.*string/i);
      await expect(getEntitiesOfTable("testTable", {pimUrl: []})).to.reject.with.error(/pimUrl.*string/i);
      await expect(getEntitiesOfTable("testTable", {pimUrl: 123})).to.reject.with.error(/pimUrl.*string/i);
      await expect(getEntitiesOfTable("testTable", {pimUrl: SERVER_URL})).to.resolve.not.to.null();
    });

    describe("maxEntriesPerRequest setting", () => {

      it("may download in a paged fashion", async () => {
        const result = await getEntitiesOfTable("testTable", { pimUrl: SERVER_URL, maxEntriesPerRequest: 2 });
        
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

      it("will reject on a negative number", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: -1
          })
        ).to.reject.with.error();
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: -5143
          })
        ).to.reject.with.error();
      });

      it("will reject on NaN", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: NaN
          })
        ).to.reject.with.error();
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: "hello"
          })
        ).to.reject.with.error();
      });

      it("will reject on non-integer values", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: 0.5
          })
        ).to.reject.with.error();
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: -6.5
          })
        ).to.reject.with.error();
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            maxEntriesPerRequest: Math.PI
          })
        ).to.reject.with.error();
      });
    });

    // describe("setting disableFollow", () => {
    //   it.only("requires an array", async () => {
    //     await expect(getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: true
    //     })).to.reject.with.error(/array of column lists/i);
    //   });

    //   it("requires an array of arrays", () => {
    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         "abc", 2, true
    //       ]
    //     })).to.throw(/array of column lists/i);
    //   });

    //   it("does not allow '*' / '**' more than once in a column list", () => {
    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["**", "col1", "**", "col2"]
    //       ]
    //     })).to.throw(/'\*\*' can only appear once/i);

    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["*", "col1", "*", "col2"]
    //       ]
    //     })).to.throw(/'\*' \/ '\*\*' can only appear once/i);
    //   });

    //   it("requires exactly one column after '**'", () => {
    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["**"]
    //       ]
    //     })).to.throw(/must contain exactly one column/i);

    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["**", "col1", "col2"]
    //       ]
    //     })).to.throw(/must contain exactly one column/i);

    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["col1", "**", "col2", "col3"]
    //       ]
    //     })).to.throw(/must contain exactly one column/i);

    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["col1", "**"]
    //       ]
    //     })).to.throw(/must contain exactly one column/i);
    //   });

    //   it("should not download specified links on top level", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["someLink"]
    //       ]
    //     }).then(result => {
    //       expect(result).to.eql(disableFollowTestTableOnly);
    //     });
    //   });

    //   it("should not download specified links in sub-tables if defined", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["someLink", "anotherLink"]
    //       ]
    //     }).then(result => {
    //       expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
    //     });
    //   });

    //   it("should not download specified links in sub-tables if defined with '*'", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["*", "anotherLink"]
    //       ]
    //     })
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
    //       });
    //   });

    //   it("should download top level links if erroneously defined with '*' as first entry", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       disableFollow: [
    //         ["*", "someLink"]
    //       ]
    //     })
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableAndLinkedTables);
    //       });
    //   });

    //   it("should not download specified links in all tables if defined with '**'", () => {
    //     return Promise
    //       .resolve()
    //       .then(() => getEntitiesOfTable("testTable", {
    //         pimUrl: SERVER_URL,
    //         disableFollow: [
    //           ["**", "someLink"]
    //         ]
    //       }))
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableOnly);
    //       })
    //       .then(() => getEntitiesOfTable("testTable", {
    //         pimUrl: SERVER_URL,
    //         disableFollow: [
    //           ["**", "anotherLink"]
    //         ]
    //       }))
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
    //       })
    //       .then(() => getEntitiesOfTable("testTable", {
    //         pimUrl: SERVER_URL,
    //         disableFollow: [
    //           ["someLink", "**", "anotherLink"]
    //         ]
    //       }))
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
    //       });
    //   });

    //   it("should not download specified links in all tables if defined with a combination of '*' and '**'", () => {
    //     return Promise
    //       .resolve()
    //       .then(() => getEntitiesOfTable("testTable", {
    //         pimUrl: SERVER_URL,
    //         disableFollow: [
    //           ["*", "**", "anotherLink"]
    //         ]
    //       }))
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
    //       })
    //       .then(() => getEntitiesOfTable("testTable", {
    //         pimUrl: SERVER_URL,
    //         disableFollow: [
    //           ["someLink", "**", "*"]
    //         ]
    //       }))
    //       .then(result => {
    //         expect(result).to.eql(disableFollowTestTableAndThirdTableOnly);
    //       });
    //   });
    // });

    // describe("setting includeColumns", () => {
    //   it("requires an array", () => {
    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       includeColumns: true
    //     })).to.throw(/array of columns/i);
    //   });

    //   it("requires an array of strings", () => {
    //     expect(() => getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       includeColumns: [
    //         "abc", 2, true
    //       ]
    //     })).to.throw(/array of columns/i);
    //   });

    //   it("should not download any links", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       includeColumns: []
    //     }).then(result => {
    //       expect(result).to.eql(includeColumnsTestTableOnly);
    //     });
    //   });

    //   it("should download specified link", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       includeColumns: ["someLink"]
    //     }).then(result => {
    //       expect(result).to.eql(includeColumnsAllTables);
    //     });
    //   });

    //   it("should not download specified link if it is disabled", () => {
    //     return getEntitiesOfTable("testTable", {
    //       pimUrl: SERVER_URL,
    //       includeColumns: ["someLink"],
    //       disableFollow: [["someLink"]]
    //     }).then(result => {
    //       expect(result).to.eql(includeColumnsTestTableOnly);
    //     });
    //   });
    // });

    describe("setting includeTables", () => {
      it("should require string array", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            includeTables: true
          })
        ).to.reject.with.error(/list of tableNames/i);
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            includeTables: [1, true]
          })
        ).to.reject.with.error(/list of tableNames/i);
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            includeTables: []
          })
        ).to.resolve.not.to.null();
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            includeTables: ["test"]
          })
        ).to.resolve.not.to.null();
      });

      it("should return all links if not set", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL
        });

        expect(result).to.eql(testTableAndLinkedTables);
      });

      it("should return no links on empty array", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeTables: []
        });

        expect(result).to.eql(testTableOnly);
      });

      it("should only include linked tables", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeTables: ["thirdTestTable"]
        });

        expect(result).to.eql(testTableAndThirdTableOnly);
      });

      it("should only include linked tables", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeTables: ["thirdTestTable", "anotherTestTable"]
        });

        expect(result).to.eql(testTableAndLinkedTables);
      });
    });

    describe("setting excludeTables", () => {
      it("should require string array", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            excludeTables: true
          })
        ).to.reject.with.error(/list of tableNames/i);
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            excludeTables: [1, true]
          })
        ).to.reject.with.error(/list of tableNames/i);
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            excludeTables: []
          })
        ).to.resolve.not.to.null();
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            excludeTables: ["test"]
          })
        ).to.resolve.not.to.null();
      });

      it("should return all links if not set", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL
        });

        expect(result).to.eql(testTableAndLinkedTables);
      });

      it("should return all links if empty", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          excludeTables: []
        });

        expect(result).to.eql(testTableAndLinkedTables);
      });

      it("should exclude linked table", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          excludeTables: ["anotherTestTable"]
        });

        expect(result).to.eql(testTableAndThirdTableOnly);
      });

      it("should exclude linked table and subsequent links", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          excludeTables: ["thirdTestTable"]
        });

        expect(result).to.eql(testTableOnly);
      });
    });

    describe("setting includeTables with excludeTables", () => {
      it("should give priority to excludeTables", async () => {
        const result = await getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          includeTables: ["thirdTestTable"],
          excludeTables: ["thirdTestTable"]
        });

        expect(result).to.eql(testTableOnly);
      });
    });

    describe("setting archived", () => {
      it("requires a boolean", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            archived: "false"
          })
        ).to.reject.with.error(/boolean/i);
      });

      it("should not include archived query in URL of rows API call - when not set as param of getEntitiesOfTable", async () => {
        const result = await getEntitiesOfTable("testTable", { pimUrl: SERVER_URL });

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

      it("should include archived query equals true in URL of rows API call", async () => {
        const result = await getEntitiesOfTable("testTable", { pimUrl: SERVER_URL, archived: true });

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

      it("should include archived query equals false in URL of rows API call", async () => {
        const result = await getEntitiesOfTable("testTable", { pimUrl: SERVER_URL, archived: false });

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

    describe("setting timeout", async () => {
      it("should reject if not an integer", async () => {
        await expect(
          getEntitiesOfTable("testTable", {
            pimUrl: SERVER_URL,
            timeout: "1000"
          })
        ).to.reject.with.error(/integer/i);
      });

      it("should timeout after specified milliseconds", async () => {
        const TIMEOUT_MS = 100;

        process.env.FORCE_DELAY_MS = 200;

        await expect(getEntitiesOfTable("testTable", {
          pimUrl: SERVER_URL,
          timeout: TIMEOUT_MS
        })).to.reject.with.error(new RegExp(`timed out.+${TIMEOUT_MS}ms`, "i"));
      });
    });
  });

});
