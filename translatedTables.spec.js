import expect from 'must';
import serialize from 'serialize-javascript';
import variantFixture from './__tests__/variantFixture.json';
import resultFixture from './__tests__/resultFixture.json';
import translateForLanguages from './translatedTables';

describe('translate tables', () => {

  const langtags = {
    DE_DE : "de-DE",
    EN_GB : "en-GB"
  };

  it('translates the table name correctly', () => {

    const result = translateForLanguages(variantFixture, langtags);
    expect(result['de-DE']['71']['displayName']).to.eql(resultFixture['de-DE']['71']['displayName']);
    expect(result['en-GB']['71']['displayName']).to.eql(resultFixture['en-GB']['71']['displayName']);

  });

  it('results in a correct representation for strings', () => {

    const result = translateForLanguages(variantFixture, langtags);
    expect(result['de-DE']['71']['rows']['16'][2]).to.eql(resultFixture['de-DE']['71']['rows']['16'][2]);
    expect(result['en-GB']['71']['rows']['16'][2]).to.eql(resultFixture['en-GB']['71']['rows']['16'][2]);

  });

  it('should result in a correct representation for everything', () => {

    const result = translateForLanguages(variantFixture, langtags);
    expect(serialize(result)).to.eql(serialize(resultFixture));

  });

});
