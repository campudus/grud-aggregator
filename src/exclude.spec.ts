import tablesFixture from "./__tests__/tablesFixture.json";
import fixtureDeletedTable from "./__tests__/excludeFixture-deletedTableAndLinks.json";
import fixtureNoConcats from "./__tests__/excludeFixture-noConcats.json";
import fixtureDeletedColumn from "./__tests__/excludeFixture-deletedColumn.json";
import fixtureDeletedLinkColumn from "./__tests__/excludeFixture-deletedLinkColumn.json";
import fixtureDeletedMultipleColumns from "./__tests__/excludeFixture-deletedMultipleColumns.json";
import fixtureDeletedMultipleColumnsInTables from "./__tests__/excludeFixture-deletedMultipleColumnsInTables.json";
import fixtureDeletedColumnsAndConcats from "./__tests__/excludeFixture-deletedColumnsAndConcats.json";
import fixtureDeletedByFunction from "./__tests__/excludeFixture-deletedByFunction.json";
import { exclude } from "./exclude";
import expect from "must";

describe("exclude", () => {
  it("returns a function, so we can put it into Promise.then chains", () => {
    expect(exclude()).to.be.a.function();
  });

  it("can pass data through, if no options were specified", () => {
    return Promise.resolve(tablesFixture)
      .then(exclude())
      .then((data) => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it("passes data through, if no exclude.paths was specified", () => {
    return Promise.resolve(tablesFixture)
      .then(exclude({}))
      .then((data) => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it("passes data through, if exclude.paths is empty", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [],
        })
      )
      .then((data) => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it("passes data through, if exclude.paths is non existent", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [["someTable", "non-existent"]],
        })
      )
      .then((data) => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it("can exclude a single table", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [["anotherTestTable"]],
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedTable);
      });
  });

  it("can exclude all columns by selecting a table so the result is an empty object", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [["testTable"], ["anotherTestTable"], ["thirdTestTable"]],
        })
      )
      .then((data) => {
        expect(data).to.eql({});
      });
  });

  it("can exclude all concat columns", () => {
    return Promise.resolve(tablesFixture)
      .then(exclude({ preserveConcats: false }))
      .then((data) => {
        expect(data).to.eql(fixtureNoConcats);
      });
  });

  it("can exclude a simple column", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [["testTable", "mlShorttext"]],
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedColumn);
      });
  });

  it("can exclude a link column", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [["testTable", "someLink"]],
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedLinkColumn);
      });
  });

  it("can exclude multiple columns in a table", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [
            ["testTable", "slAttachment"],
            ["testTable", "mlShorttext"],
          ],
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedMultipleColumns);
      });
  });

  it("can exclude multiple columns in multiple tables", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [
            ["testTable", "slShorttext"],
            ["thirdTestTable", "someNumber"],
            ["testTable", "someLink"],
          ],
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedMultipleColumnsInTables);
      });
  });

  it("can exclude columns and remove concats at the same time", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          paths: [
            ["testTable", "slShorttext"],
            ["thirdTestTable", "someNumber"],
            ["testTable", "someLink"],
          ],
          preserveConcats: false,
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedColumnsAndConcats);
      });
  });

  it("can use a predicate function to determine if a column should be kicked", () => {
    return Promise.resolve(tablesFixture)
      .then(
        exclude({
          predicate: (column, table) =>
            table.name !== "anotherTestTable" &&
            column.kind === "shorttext" &&
            !column.multilanguage,
        })
      )
      .then((data) => {
        expect(data).to.eql(fixtureDeletedByFunction);
      });
  });
});
