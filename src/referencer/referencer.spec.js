import expect from "must";
import {referencer} from "./referencer.js";
import allTables from "./__tests__/allTables.json" with { type: "json" };
import singleTable from "./__tests__/singleTable.json" with { type: "json" };
import allTablesWithLanguages from "./__tests__/allTablesWithLanguages.json" with { type: "json" };
import singleTableWithLanguages from "./__tests__/singleTableWithLanguages.json" with { type: "json" };
import selfReferencingTable from "./__tests__/selfReferencingTable.json" with { type: "json" };

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

  it("can reference simple (non-link) group columns ", () => {
    const tableWithSimpleGroup = {
      "en": {
        "1": {
          "id": 1,
          "name": "simpleGroupTable",
          "displayName": "Simple Group Table",
          "description": "Description",
          "columns": [
            {
              "id": 1,
              "name": "identifier",
              "kind": "shorttext",
              "identifier": true,
              "displayName": "Identifier",
              "description": "Description"
            },
            {
              "id": 2,
              "name": "detailNumber",
              "kind": "numeric",
              "identifier": false,
              "displayName": "Detail Number",
              "description": "Description"
            },
            {
              "id": 3,
              "name": "details",
              "kind": "group",
              "identifier": false,
              "displayName": "Details",
              "description": "Description",
              "groups": [
                {
                  "id": 1,
                  "name": "identifier",
                  "kind": "shorttext",
                  "identifier": true,
                  "displayName": "Identifier",
                  "description": "Description"
                },
                {
                  "id": 2,
                  "name": "detailNumber",
                  "kind": "numeric",
                  "identifier": false,
                  "displayName": "Detail Number",
                  "description": "Description"
                }
              ]
            }
          ],
          "rows": {
            "1": {
              "final": false,
              "values": [
                "item one",
                42,
                [
                  "This is detail text for item one",
                  42
                ]
              ]
            }
          }
        }
      }
    };

    return Promise
      .resolve(tableWithSimpleGroup)
      .then(referencer({withLanguages: true}))
      .then(referenced => {
        expect(referenced["en"].simpleGroupTable["1"].identifier).to.be("item one");
        expect(referenced["en"].simpleGroupTable["1"].detailNumber).to.be(42);
        expect(referenced["en"].simpleGroupTable["1"].details[0]).to.be("This is detail text for item one");
        expect(referenced["en"].simpleGroupTable["1"].details[1]).to.be(42);
      });
  });

  it("can reference link columns inside group columns", () => {
    const tableWithGroupLink = {
      "de-DE": {
        "70": {
          "id": 70,
          "name": "accessory",
          "displayName": "Zubehör",
          "description": "Beschreibung",
          "columns": [
            {
              "id": 1,
              "name": "identifier",
              "kind": "shorttext",
              "identifier": true,
              "displayName": "Bezeichnung",
              "description": "Beschreibung"
            },
            {
              "id": 2,
              "name": "achievements",
              "kind": "link",
              "identifier": false,
              "displayName": "Auszeichnungen",
              "description": "Beschreibung",
              "toTable": 83
            },
            {
              "id": 3,
              "name": "slogan",
              "kind": "group",
              "identifier": false,
              "displayName": "Werbespruch",
              "description": "Beschreibung",
              "groups": [
                {
                  "id": 1,
                  "name": "identifier",
                  "kind": "shorttext",
                  "identifier": true,
                  "displayName": "Bezeichnung",
                  "description": "Beschreibung"
                },
                {
                  "id": 2,
                  "name": "achievements",
                  "kind": "link",
                  "identifier": false,
                  "displayName": "Auszeichnungen",
                  "description": "Beschreibung",
                  "toTable": 83
                }
              ]
            }
          ],
          "rows": {
            "1": {
              "final": false,
              "values": [
                "Vorderlicht",
                [1, 2],
                [
                  "Vorderlicht",
                  [1, 2]
                ]
              ]
            },
            "2": {
              "final": false,
              "values": [
                "Rücklicht",
                [2],
                [
                  "Rücklicht",
                  [2]
                ]
              ]
            }
          }
        },
        "83": {
          "id": 83,
          "name": "award",
          "displayName": "Auszeichnungen",
          "description": "Beschreibung",
          "columns": [
            {
              "id": 1,
              "name": "identifier",
              "kind": "shorttext",
              "identifier": true,
              "displayName": "Bezeichnung",
              "description": "Beschreibung"
            },
            {
              "id": 3,
              "name": "url",
              "kind": "shorttext",
              "identifier": false,
              "displayName": "URL",
              "description": "Beschreibung"
            }
          ],
          "rows": {
            "1": {
              "final": false,
              "values": [
                "Bestes Rad in Oberfranken",
                "http://heise.de"
              ]
            },
            "2": {
              "final": false,
              "values": [
                "Top Bike Sowieso",
                "http://golem.de"
              ]
            }
          }
        }
      }
    };

    return Promise
      .resolve(tableWithGroupLink)
      .then(referencer({withLanguages: true}))
      .then(referenced => {
      // Check first row's group column with link references
        expect(referenced["de-DE"].accessory["1"].slogan[0]).to.be("Vorderlicht");
        expect(referenced["de-DE"].accessory["1"].slogan[1].length).to.be(2);
        expect(referenced["de-DE"].accessory["1"].slogan[1][0].linkRowId).to.be(1);
        expect(referenced["de-DE"].accessory["1"].slogan[1][0].identifier).to.be("Bestes Rad in Oberfranken");
        expect(referenced["de-DE"].accessory["1"].slogan[1][0].url).to.be("http://heise.de");
        expect(referenced["de-DE"].accessory["1"].slogan[1][1].linkRowId).to.be(2);
        expect(referenced["de-DE"].accessory["1"].slogan[1][1].identifier).to.be("Top Bike Sowieso");
        expect(referenced["de-DE"].accessory["1"].slogan[1][1].url).to.be("http://golem.de");

        // Check second row's group column with link reference
        expect(referenced["de-DE"].accessory["2"].slogan[0]).to.be("Rücklicht");
        expect(referenced["de-DE"].accessory["2"].slogan[1].length).to.be(1);
        expect(referenced["de-DE"].accessory["2"].slogan[1][0].linkRowId).to.be(2);
        expect(referenced["de-DE"].accessory["2"].slogan[1][0].identifier).to.be("Top Bike Sowieso");
        expect(referenced["de-DE"].accessory["2"].slogan[1][0].url).to.be("http://golem.de");
      });
  });

});
