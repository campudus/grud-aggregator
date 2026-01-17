import expect from "must";
import simpleTable from "./__tests__/simpleTable.json";
import simpleTableExpected from "./__tests__/simpleTableTTLExpected.json";
import selfReferencingTable from "./__tests__/selfReferencingTable.json";
import selfReferencingTableExpected from "./__tests__/selfReferencingTableTTLExpected.json";
import tablesFixture from "./__tests__/tablesFixture.json";
import missingFixture from "./__tests__/missingFixture.json";
import missingResultFixture from "./__tests__/missingResultFixture.json";
import missingStayEmptyFixture from "./__tests__/missingStayEmptyFixture.json";
import resultFixture from "./__tests__/resultFixture.json";
import {tablesToLanguages} from "./tablesToLanguages";

describe("tablesToLanguages", () => {

  const langtags = {
    de: [],
    en: [],
    fr: []
  };

  const langtagsForMissing = {
    de: ["en"],
    en: [],
    fr: ["de", "en"]
  };

  const langtagsInFallback = {
    de: ["de", "en"],
    en: ["en"],
    fr: ["fr", "de", "en"]
  };

  it("is possible to put it into a Promise chain", () => {
    expect(
      Promise
        .resolve(tablesFixture)
        .then(tablesToLanguages(langtags))
        .then(() => true)
    ).to.resolve.to.true();
  });

  it("translates the table display name correctly", () => {
    const result = tablesToLanguages(langtags)(tablesFixture);
    expect(result["de"]["1"]["displayName"]).to.eql(resultFixture["de"]["1"]["displayName"]);
    expect(result["en"]["1"]["displayName"]).to.eql(resultFixture["en"]["1"]["displayName"]);
  });

  it("translates the table description correctly", () => {

    const result = tablesToLanguages(langtags)(tablesFixture);
    expect(result["de"]["1"]["description"]).to.eql(resultFixture["de"]["1"]["description"]);
    expect(result["en"]["1"]["description"]).to.eql(resultFixture["en"]["1"]["description"]);

  });

  it("results in a correct representation for multilanguage strings", () => {

    const result = tablesToLanguages(langtags)(tablesFixture);
    expect(result["de"]["1"]["rows"]["1"]["values"][1]).to.eql(resultFixture["de"]["1"]["rows"]["1"]["values"][1]);
    expect(result["en"]["1"]["rows"]["1"]["values"][1]).to.eql(resultFixture["en"]["1"]["rows"]["1"]["values"][1]);

  });

  it("should result in a correct representation for everything", () => {
    const result = tablesToLanguages(langtags)(tablesFixture);

    // Uncomment next two lines for better debugging
    // const fs = require("fs-extra");
    // fs.outputFileSync("test.json", JSON.stringify(result));

    expect(JSON.stringify(result)).to.eql(JSON.stringify(resultFixture));
  });

  it("can use fallbacks", () => {
    const result = tablesToLanguages(langtagsForMissing)(missingFixture);

    expect(JSON.stringify(result)).to.eql(JSON.stringify(missingResultFixture));
  });

  it("may not replace empty/trimmed strings, if fallbackOnEmptyString option is set to false", () => {
    const result = tablesToLanguages(langtagsForMissing, {fallbackOnEmptyString: false})(missingFixture);

    expect(JSON.stringify(result)).to.eql(JSON.stringify(missingStayEmptyFixture));
  });

  it("results in the same thing if first language tag in fallbacks is same as the key", () => {
    const resultKeys = tablesToLanguages(langtagsForMissing)(missingFixture);
    const resultFallback = tablesToLanguages(langtagsInFallback)(missingFixture);

    expect(JSON.stringify(resultKeys)).to.eql(JSON.stringify(resultFallback));
  });

  it("results in the same thing for each language if there are no multilanguage columns", () => {
    const result = tablesToLanguages({
      "de": [],
      "en": []
    })(simpleTable);

    expect(JSON.stringify(result))
      .to
      .eql(JSON.stringify(simpleTableExpected));
  });

  it("works with self referencing tables", () => {
    const result = tablesToLanguages({
      "de": [],
      "en": []
    })(selfReferencingTable);

    expect(JSON.stringify(result))
      .to
      .eql(JSON.stringify(selfReferencingTableExpected));
  });

  it("handles numeric group columns correctly", () => {
    const langtagsForGroups = {
      "de-DE": [],
      "en-GB": []
    };

    const tableWithSimpleGroup = {
      "1": {
        "id": 1,
        "name": "material",
        "displayName": {
          "de-DE": "Material",
          "en-GB": "Material"
        },
        "description": {
          "de-DE": "Beschreibung",
          "en-GB": "Description"
        },
        "columns": [
          {
            "id": 1,
            "ordering": 1,
            "name": "identifier",
            "kind": "shorttext",
            "multilanguage": true,
            "languageType": "language",
            "displayName": {
              "de-DE": "Identifikator",
              "en-GB": "identifier"
            },
            "description": {
              "de-DE": "Beschreibung",
              "en-GB": "Description"
            }
          },
          {
            "id": 2,
            "ordering": 2,
            "name": "testGroup",
            "kind": "group",
            "multilanguage": false,
            "displayName": {
              "de-DE": "Testgruppe",
              "en-GB": "test group"
            },
            "description": {
              "de-DE": "Beschreibung",
              "en-GB": "Description"
            },
            "groups": [
              {
                "id": 1,
                "kind": "numeric",
                "multilanguage": false,
                "displayName": {
                  "de-DE": "Zahl1",
                  "en-GB": "number1"
                }, 
                "description": {
                  "de-DE": "Beschreibung",
                  "en-GB": "Description"
                } 
              },
              {
                "id": 2,
                "kind": "numeric",
                "multilanguage": false,
                "displayName": {
                  "de-DE": "Zahl2",
                  "en-GB": "number2"
                }, 
                "description": {
                  "de-DE": "Beschreibung",
                  "en-GB": "Description"
                } 
              }
            ]
          }
        ],
        "rows": {
          "1": {
            "id": 1,
            "values": [
              {
                "de-DE": "Stahl",
                "en-GB": "steel"
              },
              [
                100,
                200
              ]
            ]
          }
        }
      }
    };

    const result = tablesToLanguages(langtagsForGroups)(tableWithSimpleGroup);

    expect(result["de-DE"]["1"]["rows"]["1"]["values"][1]).to.eql([100, 200]);
    expect(result["en-GB"]["1"]["rows"]["1"]["values"][1]).to.eql([100, 200]);
  });

  it("handles multilanguage group columns correctly", () => {
    const langtagsForGroups = {
      "de-DE": [],
      "en-GB": []
    };

    const tableWithMultilanguageGroup = {
      "1": {
        "id": 1,
        "name": "material",
        "displayName": {
          "de-DE": "Material",
          "en-GB": "Material"
        },
        "description": {
          "de-DE": "Beschreibung",
          "en-GB": "Description"
        },
        "columns": [
          {
            "id": 1,
            "ordering": 1,
            "name": "identifier",
            "kind": "shorttext",
            "multilanguage": true,
            "languageType": "language",
            "displayName": {
              "de-DE": "Identifikator",
              "en-GB": "identifier"
            },
            "description": {
              "de-DE": "Beschreibung",
              "en-GB": "Description"
            }
          },
          {
            "id": 2,
            "ordering": 2,
            "name": "testGroup",
            "kind": "group",
            "multilanguage": true,
            "languageType": "language",
            "displayName": {
              "de-DE": "Testgruppe",
              "en-GB": "test group"
            },
            "description": {
              "de-DE": "Beschreibung",
              "en-GB": "Description"
            },
            "groups": [
              {
                "id": 1,
                "kind": "shorttext",
                "displayName": {
                  "de-DE": "Text",
                  "en-GB": "text"
                },
                "description": {
                  "de-DE": "Beschreibung",
                  "en-GB": "Description"
                },
                "multilanguage": true,
                "languageType": "language"
              },
              {
                "id": 2,
                "kind": "numeric",
                "multilanguage": false,
                "displayName": {
                  "de-DE": "Zahl",
                  "en-GB": "number"
                }, 
                "description": {
                  "de-DE": "Beschreibung",
                  "en-GB": "Description"
                } 
              }
            ]
          }
        ],
        "rows": {
          "1": {
            "id": 1,
            "values": [
              {
                "de-DE": "Stahl",
                "en-GB": "steel"
              },
              [
                {
                  "de-DE": "Beschreibung",
                  "en-GB": "Description"
                },
                100
              ]
            ]
          }
        }
      }
    };

    const result = tablesToLanguages(langtagsForGroups)(tableWithMultilanguageGroup);

    expect(result["de-DE"]["1"]["rows"]["1"]["values"][1]).to.eql(["Beschreibung", 100]);
    expect(result["en-GB"]["1"]["rows"]["1"]["values"][1]).to.eql(["Description", 100]);
  });

  it("handles link columns inside group columns correctly", () => {
    const langtagsForGroupLink = {
      "de-DE": [],
      "en-GB": []
    };

    const tableWithMultilanguageGroupAndLink = {
      "70": {
        "id": 70,
        "name": "accessory",
        "displayName": {
          "de-DE": "Zubehör",
          "en-GB": "Accessories"
        },
        "description": {
          "en-GB": "Description",
          "de-DE": "Beschreibung"
        },
        "columns": [
          {
            "id": 1,
            "ordering": 20,
            "name": "identifier",
            "kind": "shorttext",
            "multilanguage": true,
            "identifier": true,
            "displayName": {
              "de-DE": "Bezeichnung",
              "en-GB": "Identifier"
            },
            "description": {
              "en-GB": "Description",
              "de-DE": "Beschreibung"
            },
            "languageType": "language"
          },
          {
            "id": 2,
            "ordering": 30,
            "name": "achievements",
            "kind": "link",
            "multilanguage": true,
            "identifier": false,
            "displayName": {
              "en-GB": "Achievements",
              "de-DE": "Auszeichnungen"
            },
            "description": {
              "en-GB": "Description",
              "de-DE": "Beschreibung"
            },
            "languageType": "language",
            "toTable": 83,
            "toColumn": {
              "id": 1,
              "ordering": 10,
              "name": "identifier",
              "kind": "shorttext",
              "multilanguage": true,
              "identifier": true,
              "displayName": {
                "de-DE": "Bezeichnung",
                "en-GB": "Identifier"
              },
              "description": {
                "en-GB": "Description",
                "de-DE": "Beschreibung"
              },
              "languageType": "language"
            }
          },
          {
            "id": 5,
            "ordering": 40,
            "name": "slogan",
            "kind": "group",
            "multilanguage": true,
            "identifier": false,
            "displayName": {
              "de-DE": "Werbespruch",
              "en-GB": "Slogan"
            },
            "description": {
              "en-GB": "Description",
              "de-DE": "Beschreibung"
            },
            "languageType": "language",
            "groups": [
              {
                "id": 1,
                "ordering": 20,
                "name": "identifier",
                "kind": "shorttext",
                "multilanguage": true,
                "identifier": true,
                "displayName": {
                  "de-DE": "Bezeichnung",
                  "en-GB": "Identifier"
                },
                "description": {
                  "en-GB": "Description",
                  "de-DE": "Beschreibung"
                },
                "languageType": "language"
              },
              {
                "id": 2,
                "ordering": 30,
                "name": "achievements",
                "kind": "link",
                "multilanguage": true,
                "identifier": false,
                "displayName": {
                  "en-GB": "Achievements",
                  "de-DE": "Auszeichnungen"
                },
                "description": {
                  "en-GB": "Description",
                  "de-DE": "Beschreibung"
                },
                "languageType": "language",
                "toTable": 83,
                "toColumn": {
                  "id": 1,
                  "ordering": 10,
                  "name": "identifier",
                  "kind": "shorttext",
                  "multilanguage": true,
                  "identifier": true,
                  "displayName": {
                    "de-DE": "Bezeichnung",
                    "en-GB": "Identifier"
                  },
                  "description": {
                    "en-GB": "Description",
                    "de-DE": "Beschreibung"
                  },
                  "languageType": "language"
                }
              }
            ]
          }
        ],
        "rows": {
          "1": {
            "id": 1,
            "values": [
              {
                "de-DE": "Vorderlicht",
                "en-GB": "Front Light"
              },
              [
                {
                  "id": 1,
                  "value": {
                    "de-DE": "Bestes Rad in Oberfranken",
                    "en-GB": "Best Bike in Upper Franconia"
                  }
                },
                {
                  "id": 2,
                  "value": {
                    "de-DE": "Top Bike Sowieso",
                    "en-GB": "Top Bike Anyway"
                  }
                }
              ],
              [
                {
                  "de-DE": "Vorderlicht",
                  "en-GB": "Front Light"
                },
                [
                  {
                    "id": 1,
                    "value": {
                      "de-DE": "Bestes Rad in Oberfranken",
                      "en-GB": "Best Bike in Upper Franconia"
                    }
                  },
                  {
                    "id": 2,
                    "value": {
                      "de-DE": "Top Bike Sowieso",
                      "en-GB": "Top Bike Anyway"
                    }
                  }
                ]
              ]
            ]
          }
        }
      }
    };

    const result = tablesToLanguages(langtagsForGroupLink)(tableWithMultilanguageGroupAndLink);

    expect(result["de-DE"]["70"]["rows"]["1"]["values"][2]).to.eql(["Vorderlicht", [1, 2]]);
    expect(result["en-GB"]["70"]["rows"]["1"]["values"][2]).to.eql(["Front Light", [1, 2]]);
  });

  describe("fallback only option", () => {

    it("should throw if a fallback array is empty and the option turned on", () => {
      expect(() => tablesToLanguages(langtagsForMissing, {fallbackOnly: true})(missingFixture))
        .to.throw(/missing/i);
    });

    it("should not throw if a fallback array is empty and the option turned off", () => {
      expect(() => tablesToLanguages(langtagsForMissing, {fallbackOnly: false})(missingFixture))
        .not.to.throw();
    });

    it("uses the fallback array instead of the key as single source of truth", () => {
      // The test just replaces de with en arrays
      const result = tablesToLanguages({
        fr: ["de"],
        de: ["en"],
        en: ["fr"]
      }, {fallbackOnly: true})(tablesFixture);

      expect(JSON.stringify(result)).not.to.eql(JSON.stringify(resultFixture));
      expect(JSON.stringify(result["de"])).to.eql(JSON.stringify(resultFixture["en"]));
      expect(JSON.stringify(result["en"])).to.eql(JSON.stringify(resultFixture["fr"]));
      expect(JSON.stringify(result["fr"])).to.eql(JSON.stringify(resultFixture["de"]));
    });

  });

});
