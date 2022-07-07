import expect from "must";
import {referencer} from "./referencer";
import allTables from "./__tests__/allTables.json";
import singleTable from "./__tests__/singleTable.json";
import allTablesWithLanguages from "./__tests__/allTablesWithLanguages.json";
import singleTableWithLanguages from "./__tests__/singleTableWithLanguages.json";
import selfReferencingTable from "./__tests__/selfReferencingTable.json";

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

  it("can reference multiple tables and jump through links", () => {
    return Promise
      .resolve(allTables)
      .then(referencer())
      .then(referenced => {
        expect(referenced.testTable["1"].someLink[0].identifier).to.eql("my identifying text, linking to row 1 in anotherTestTable");
        expect(referenced.testTable["2"].someLink[0].identifier).to.eql("my third row identifying text, linking to both rows in anotherTestTable");
        expect(referenced.testTable["2"].someLink[1].identifier).to.eql("my fourth row identifying text, linking to no rows in anotherTestTable");
        expect(referenced.testTable["2"].someLink[0].anotherLink[0].testColumn).to.eql("some other thing");
      });
  });

  it("can reference links that reference the same table", () => {
    return Promise
      .resolve(selfReferencingTable)
      .then(referencer())
      .then(referenced => {
        expect(referenced.selfRefTestTable["1"].mylink.length).to.eql(1);
        expect(referenced.selfRefTestTable["1"].mylink[0].identifier).to.eql("second");
        expect(referenced.selfRefTestTable["2"].mylink.length).to.eql(0);
        expect(referenced.selfRefTestTable["3"].mylink.length).to.eql(0);
        expect(referenced.selfRefTestTable["4"].mylink.length).to.eql(1);
        expect(referenced.selfRefTestTable["4"].mylink[0].identifier).to.eql("fifth");
        expect(referenced.selfRefTestTable["5"].mylink.length).to.eql(1);
        expect(referenced.selfRefTestTable["5"].mylink[0].identifier).to.eql("fourth");
        expect(referenced.selfRefTestTable["6"].mylink.length).to.eql(2);
        expect(referenced.selfRefTestTable["6"].mylink[0].identifier).to.eql("seventh");
        expect(referenced.selfRefTestTable["6"].mylink[1].identifier).to.eql("eighth");
        expect(referenced.selfRefTestTable["7"].mylink.length).to.eql(1);
        expect(referenced.selfRefTestTable["7"].mylink[0].identifier).to.eql("eighth");
        expect(referenced.selfRefTestTable["8"].mylink.length).to.eql(2);
        expect(referenced.selfRefTestTable["8"].mylink[0].identifier).to.eql("sixth");
        expect(referenced.selfRefTestTable["8"].mylink[1].identifier).to.eql("ninth");
        expect(referenced.selfRefTestTable["9"].mylink.length).to.eql(1);
        expect(referenced.selfRefTestTable["9"].mylink[0].identifier).to.eql("ninth");
      });
  });

});
