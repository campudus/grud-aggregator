import expect from "must";
import {referencer} from "./referencer.js";
import {tablesToLanguages} from "../tablesToLanguages.js";
import {exclude} from "../exclude.js";
import {filter} from "../filter.js";
import allTables from "./__tests__/allTables.json" with { type: "json" };
import selfReferencingTable from "./../__tests__/selfReferencingTable.json" with { type: "json" };
import selfReferencingTableExpected from "./../__tests__/selfReferencingTableTTLExpected.json" with { type: "json" };

describe("referencer and tablesToLanguages", () => {

  it("works right after tablesToLanguages", () => {
    return Promise
      .resolve(allTables)
      .then(tablesToLanguages({"de": []}))
      .then(referencer({withLanguages: true}))
      .then(referenced => {
        const de = referenced["de"];

        expect(de.testTable["1"].someLink[0].identifier)
          .to.eql("my identifying text, linking to row 1 in anotherTestTable");

        expect(de.testTable["2"].someLink[0].identifier)
          .to.eql("my third row identifying text, linking to both rows in anotherTestTable");

        expect(de.testTable["2"].someLink[1].identifier)
          .to.eql("my fourth row identifying text, linking to no rows in anotherTestTable");

        expect(de.testTable["2"].someLink[0].anotherLink[0].testColumn).to.eql("some other thing");
      });
  });

  it("works without using languages after tablesToLanguages", () => {
    return Promise
      .resolve(allTables)
      .then(tablesToLanguages({"de": ["de"]}))
      .then(data => data.de)
      .then(referencer({withLanguages: false}))
      .then(referenced => {
        expect(referenced.testTable["1"].someLink[0].identifier)
          .to.eql("my identifying text, linking to row 1 in anotherTestTable");

        expect(referenced.testTable["2"].someLink[0].identifier)
          .to.eql("my third row identifying text, linking to both rows in anotherTestTable");

        expect(referenced.testTable["2"].someLink[1].identifier)
          .to.eql("my fourth row identifying text, linking to no rows in anotherTestTable");

        expect(referenced.testTable["2"].someLink[0].anotherLink[0].testColumn).to.eql("some other thing");
      });
  });

  it("can use filters and tablesToLangauges on self referencing tables without removing links", () => {
    const filterResult = filter({
      path: ["selfRefTestTable"],
      predicate: () => true
    })(selfReferencingTable);
    const excludeResult = exclude({
      predicate: () => false
    })(filterResult);
    const result = tablesToLanguages({
      "de": [],
      "en": []
    })(excludeResult);

    expect(JSON.stringify(result))
      .to
      .eql(JSON.stringify(selfReferencingTableExpected));

  });
});
