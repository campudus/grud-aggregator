import expect from 'must';
import tablesFixture from './__tests__/tablesFixture.json';
import resultFixture from './__tests__/resultFixture.json';
import translateForLanguages from './translatedTables';

describe('translate tables', () => {

  const langtags = {
    DE : 'de',
    EN : 'en'
  };

  it('translates the table name correctly', () => {

    const result = translateForLanguages(tablesFixture, langtags);
    expect(result['de']['1']['displayName']).to.eql(resultFixture['de']['1']['displayName']);
    expect(result['en']['1']['displayName']).to.eql(resultFixture['en']['1']['displayName']);

  });

  it('translates the table description correctly', () => {

    const result = translateForLanguages(tablesFixture, langtags);
    expect(result['de']['1']['description']).to.eql(resultFixture['de']['1']['description']);
    expect(result['en']['1']['description']).to.eql(resultFixture['en']['1']['description']);

  });

  it('results in a correct representation for multilanguage strings', () => {

    const result = translateForLanguages(tablesFixture, langtags);
    expect(result['de']['1']['rows']['1'][1]).to.eql(resultFixture['de']['1']['rows']['1'][1]);
    expect(result['en']['1']['rows']['1'][1]).to.eql(resultFixture['en']['1']['rows']['1'][1]);

  });

  it('should result in a correct representation for everything', () => {

    const result = translateForLanguages(tablesFixture, langtags);
    expect(JSON.stringify(result)).to.eql(JSON.stringify(resultFixture));

  });

});
