import tablesFixture from "./__tests__/tablesFixture.json";
import cyclicTablesFixture from "./__tests__/cyclicTablesFixture.json";
import cyclicTablesWithDependencyLinkFixture from "./__tests__/cyclicTablesWithDependencyLinkFixture.json";
import filterFixture0 from "./__tests__/filterFixture0.json";
import filterFixture1 from "./__tests__/filterFixture1.json";
import filterFixture2 from "./__tests__/filterFixture2.json";
import filterFixture3 from "./__tests__/filterFixture3.json";
import filterFixture4 from "./__tests__/filterFixture4.json";
import filterFixture5 from "./__tests__/filterFixture5.json";
import filterFixture6 from "./__tests__/filterFixture6.json";
import filterFixture7 from "./__tests__/filterFixture7.json";
import filterFixture8 from "./__tests__/filterFixture8.json";
import filterFixture9 from "./__tests__/filterFixture9.json";
import filterFixture10 from "./__tests__/filterFixture10.json";
import filterFixture11 from "./__tests__/filterFixture11.json";
import filterFixture12 from "./__tests__/filterFixture12.json";
import filterFixture13 from "./__tests__/filterFixture13.json";
import testTableDisableFollow2 from "./__tests__/testTableDisableFollow2.json";
import missingEntitiesFixture from "./__tests__/missingEntitiesFixture.json";
import {filter} from "./filter";
import expect from "must";

describe("filter", () => {

  let myCounter = 0;
  const countUp = () => {
    myCounter += 1;
    return false;
  };

  beforeEach(() => {
    myCounter = 0;
  });

  it("returns a function, so we can put it into Promise.then chains", () => {
    expect(filter()).to.be.a.function();
  });

  it("can pass data through, if no filter was specified", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter())
      .then(data => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it("passes data through, if no filter.path was specified", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({}))
      .then(data => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it("passes data through, if filter.path is empty", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: [],
        predicate: countUp
      }))
      .then(data => {
        expect(data).to.eql(tablesFixture);
        countUp();
        expect(myCounter).to.be(1);
      });
  });

  it("can filter everything so the result is an empty object", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["anotherTestTable"],
        predicate: countUp
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
        countUp();
        expect(myCounter).to.be(1 + Object.keys(tablesFixture["2"].rows).length);
      });
  });

  it("wrong initial table will remove all data", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["non-existent"],
        predicate: countUp
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
        countUp();
        expect(myCounter).to.be(1);
      });
  });

  it("non-existent table and path will remove all data", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["non", "existant"],
        predicate: countUp
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
        countUp();
        expect(myCounter).to.be(1);
      });
  });

  it("non-existent path after table will remove all data", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["thirdTestTable", "non-existent"],
        predicate: countUp
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
        countUp();
        expect(myCounter).to.be(1);
      });
  });

  it("can filter a single value", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["anotherTestTable"],
        predicate: value => value.testColumn === "some other thing in second row"
      }))
      .then(data => {
        expect(data).to.eql(filterFixture1);
      });
  });

  it("filters a table that is linked with something to false to filter everything", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["thirdTestTable", "anotherLink"],
        predicate: () => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
      });
  });

  it("filters a table that is linked by multiple entries", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["thirdTestTable", "anotherLink"],
        predicate: value => value.testColumn === "some other thing in second row"
      }))
      .then(data => {
        expect(data).to.eql(filterFixture2);
      });
  });

  it("filters a table through links over links", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["testTable", "someLink", "anotherLink"],
        predicate: value => value.testColumn === "some other thing in second row"
      }))
      .then(data => {
        expect(data).to.eql(filterFixture3);
      });
  });

  it("can be chained multiple times to create an AND effect", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["testTable", "someLink", "anotherLink"],
        predicate: value => value.testColumn === "some other thing in second row"
      }))
      .then(filter({
        path: ["testTable", "someLink"],
        predicate: value => {
          return value.identifier === "my fourth row identifying text, linking to no rows in anotherTestTable";
        }
      }))
      .then(data => {
        expect(data).to.eql(filterFixture4);
      });
  });

  it("can be used to kick non linked entities", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["testTable"],
        predicate: () => true
      }))
      .then(data => {
        expect(data).to.eql(filterFixture5);
      });
  });

  it("no predicate will remove unused entities", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["testTable"]
      }))
      .then(data => {
        expect(data).to.eql(filterFixture5);
      });
  });

  it("can work with cyclic files", () => {
    return Promise
      .resolve(cyclicTablesFixture)
      .then(filter({
        path: ["tableA"]
      }))
      .then(data => {
        expect(data).to.eql(filterFixture6);
      });
  });

  it("has entities which were backlinked in a cycle, even if they are filtered out by predicate", () => {
    return Promise
      .resolve(cyclicTablesFixture)
      .then(filter({
        path: ["tableB"],
        predicate: v => v.linkToA.length > 0
      }))
      .then(data => {
        expect(data).to.eql(filterFixture7);
      });
  });

  it("can handle deeper cyclic dependencies", () => {
    return Promise
      .resolve(cyclicTablesWithDependencyLinkFixture)
      .then(filter({
        path: ["tableA"]
      }))
      .then(data => {
        expect(data).to.eql(filterFixture11);
      });
  });

  it("can handle missing tables as links, as long as no data really links it", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["thirdTestTable"],
        predicate: v => v.anotherLink.length === 0
      }))
      .then(data => {
        expect(data).to.eql(filterFixture8);
        return data;
      })
      .then(filter({ // should stay the same after doing the same filter
        path: ["thirdTestTable"],
        predicate: v => v.anotherLink.length === 0
      }))
      .then(data => {
        expect(data).to.eql(filterFixture8);
        return data;
      });
  });

  it("will ignore missing tables as links but emit a warning", () => {
    const warn = console.warn;
    let warned = false;
    console.warn = function () {
      warned = true;
      warn.apply(this, arguments);
    };
    return Promise
      .resolve(testTableDisableFollow2)
      .then(filter({
        path: ["testTable"]
      }))
      .then(result => {
        expect(result).to.eql(filterFixture12);
        expect(warned).to.be(true);
      });
  });

  it("will ignore missing tables as links and can ignore the warning", () => {
    const warn = console.warn;
    let warned = false;
    console.warn = function () {
      warned = true;
      warn.apply(this, arguments);
    };
    return Promise
      .resolve(testTableDisableFollow2)
      .then(filter({
        path: ["testTable"],
        ignoreMissing: true
      }))
      .then(result => {
        expect(result).to.eql(filterFixture12);
        expect(warned).to.be(false);
      });
  });

  it("will ignore missing entities but emit a warning", () => {
    const warn = console.warn;
    let warned = false;
    console.warn = function () {
      warned = true;
      warn.apply(this, arguments);
    };
    return Promise
      .resolve(missingEntitiesFixture)
      .then(filter({
        path: ["testTable"]
      }))
      .then(result => {
        expect(result).to.eql(filterFixture13);
        expect(warned).to.be(true);
      });
  });

  it("will ignore missing entities and can ignore the warning", () => {
    const warn = console.warn;
    let warned = false;
    console.warn = function () {
      warned = true;
      warn.apply(this, arguments);
    };
    return Promise
      .resolve(missingEntitiesFixture)
      .then(filter({
        path: ["testTable"],
        ignoreMissing: true
      }))
      .then(result => {
        expect(result).to.eql(filterFixture13);
        expect(warned).to.be(false);
      });
  });

  it("will add the id of the row in the predicate check", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["anotherTestTable"],
        predicate: v => v.id === 1 || v.id === 2
      }))
      .then(data => {
        expect(data).to.eql(filterFixture9);
      });
  });

  it("will add the id of the row in the predicate when using deep links", () => {
    return Promise
      .resolve(tablesFixture)
      .then(filter({
        path: ["testTable", "someLink", "anotherLink"],
        predicate: value => value.id === 2
      }))
      .then(data => {
        expect(data).to.eql(filterFixture3);
      });
  });

  it("can exclude backlink-dependencies to the first table", () => {
    return Promise
      .resolve(cyclicTablesWithDependencyLinkFixture)
      .then(filter({
        excludeBacklinks: true,
        path: ["tableA"],
        predicate: v => v.id !== 3
      }))
      .then(data => {
        expect(data).to.eql(filterFixture10);
      });
  });

});
