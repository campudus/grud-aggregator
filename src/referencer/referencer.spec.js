import expect from "must";
import {referencer} from "./referencer";
import allTables from "./__tests__/allTables.json";
import singleTable from "./__tests__/singleTable.json";
import allTablesWithLanguages from "./__tests__/allTablesWithLanguages.json";
import singleTableWithLanguages from "./__tests__/singleTableWithLanguages.json";

describe("referencer", () => {

  it("returns a function to be used in promise chain", () => {
    expect(referencer()).to.be.a.function();
  });

  it("can reference a single table in a language", () => {
    return Promise
      .resolve(singleTableWithLanguages)
      .then(referencer({withLanguages: true}))
      .then(referenced => {
        expect(referenced["en"].anotherTestTable["2"].testColumn).to.be("some other thing in second row");
        expect(referenced["en"].anotherTestTable["2"].otherColumn).to.be("Good day");
      });
  });

  it("can reference multiple tables with languages", () => {
    return Promise
      .resolve(allTablesWithLanguages)
      .then(referencer({withLanguages: true}))
      .then(referenced => {
        expect(referenced["en"].anotherTestTable["2"].testColumn).to.be("some other thing in second row");
        expect(referenced["en"].testTable["1"].slAttachment[0].title).to.be("Title of first attachment");
        expect(referenced["de"].testTable["1"].slAttachment[0].title).to.be("Titel des ersten Attachments");
      });
  });

  it("can reference a single table", () => {
    return Promise
      .resolve(singleTable)
      .then(referencer())
      .then(referenced => {
        expect(referenced.anotherTestTable["2"].testColumn).to.be("some other thing in second row");
        expect(referenced.anotherTestTable["2"].otherColumn).to.eql({en: "Good day"});
      });
  });

  it("can reference multiple tables", () => {
    return Promise
      .resolve(allTables)
      .then(referencer())
      .then(referenced => {
        expect(referenced.anotherTestTable["2"].testColumn).to.be("some other thing in second row");
        expect(referenced.anotherTestTable["2"].otherColumn).to.eql({en: "Good day"});
      });
  });

});
