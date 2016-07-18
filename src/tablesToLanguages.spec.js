import expect from 'must';
import tablesFixture from './__tests__/tablesFixture.json';
import resultFixture from './__tests__/resultFixture.json';
import { tablesToLanguages } from './tablesToLanguages';

describe('tablesToLanguages', () => {

  const langtags = {
    DE : 'de',
    EN : 'en',
    FR : 'fr'
  };

  it('is possible to put it into a Promise chain', () => {
    expect(
      Promise.resolve(tablesFixture)
        .then(tablesToLanguages(langtags))
        .then(() => true)
    ).to.resolve.to.true();
  });

  it('translates the table name correctly', () => {

    const result = tablesToLanguages(langtags)(tablesFixture);
    expect(result['de']['1']['displayName']).to.eql(resultFixture['de']['1']['displayName']);
    expect(result['en']['1']['displayName']).to.eql(resultFixture['en']['1']['displayName']);

  });

  it('translates the table description correctly', () => {

    const result = tablesToLanguages(langtags)(tablesFixture);
    expect(result['de']['1']['description']).to.eql(resultFixture['de']['1']['description']);
    expect(result['en']['1']['description']).to.eql(resultFixture['en']['1']['description']);

  });

  it('results in a correct representation for multilanguage strings', () => {

    const result = tablesToLanguages(langtags)(tablesFixture);
    expect(result['de']['1']['rows']['1']['values'][1]).to.eql(resultFixture['de']['1']['rows']['1']['values'][1]);
    expect(result['en']['1']['rows']['1']['values'][1]).to.eql(resultFixture['en']['1']['rows']['1']['values'][1]);

  });

  it('should result in a correct representation for everything', () => {
    const result = tablesToLanguages(langtags)(tablesFixture);

    // Uncomment next two lines for better debugging
    // const fs = require('fs-extra');
    // fs.outputFileSync('test.json', JSON.stringify(result));

    expect(JSON.stringify(result)).to.eql(JSON.stringify(resultFixture));
  });

});
