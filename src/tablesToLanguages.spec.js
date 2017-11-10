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

  it("results in the same thing for each language if there are no multilanguage columns", () => {
    const result = tablesToLanguages({
      "de": [],
      "en": []
    })(selfReferencingTable);

    expect(JSON.stringify(result))
      .to
      .eql(JSON.stringify(selfReferencingTableExpected));
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
