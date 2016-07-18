import resultFixture from './__tests__/resultFixture.json';
import { createSchemaFromLanguageTables } from './createSchemaFromLanguageTables';
import expect from 'must';
import _ from 'lodash';

describe('createSchemaFromLanguageTables', () => {

  it('can be put into Promise chain', () => {
    expect(
      Promise.resolve(resultFixture)
        .then(createSchemaFromLanguageTables())
        .then(() => true)
    ).to.resolve.to.true();
  });

  it('returns a json with language tags and in there keys "tables" and "columns"', () => {
    const langJson = createSchemaFromLanguageTables()(resultFixture);
    expect(_.size(langJson)).to.be(3);
    const json = langJson['de'];
    expect(json).not.to.be.empty();
    expect(json.tables).to.exist();
    expect(json.tables).to.be.an.object();
    expect(json.tables).not.to.be.an.array();
    expect(json.columns).to.exist();
    expect(json.columns).to.be.an.object();
    expect(json.columns).not.to.be.an.array();
  });

  it('columns object has same keys as tables', () => {
    const json = createSchemaFromLanguageTables()(resultFixture)['de'];
    expect(Object.keys(json.tables).sort()).to.eql(Object.keys(json.columns).sort());
  });

  it('results in {tables:{[internalTableName]:[name]} for tables', () => {
    const json = createSchemaFromLanguageTables()(resultFixture)['de'];
    expect(Object.keys(json.tables).sort()).to.eql([
      'anotherTestTable',
      'testTable',
      'thirdTestTable'
    ]);
    expect(json.tables.testTable).to.exist();
    expect(json.tables.testTable).to.be('Test Tabelle');
  });

  it('results in {columns:{[internalTableName]:{[internalColumnName]:[name]}}} for columns', () => {
    const json = createSchemaFromLanguageTables()(resultFixture)['de'];
    expect(Object.keys(json.columns).sort()).to.eql(['anotherTestTable', 'testTable', 'thirdTestTable']);
    expect(json.columns.testTable).to.exist();
    expect(Object.keys(json.columns.testTable).sort()).to.eql([
      'mlShorttext',
      'slAttachment',
      'slShorttext',
      'someLink'
    ]);
    expect(json.columns.testTable.slShorttext).to.be('Irgendein Text');
    expect(json.columns.testTable.mlShorttext).to.be('Irgendein mehrsprachiger Text');
  });

  it('can set fallback languages, if a spec is not defined', () => {
    const json = createSchemaFromLanguageTables('en')(resultFixture)['de'];
    expect(json.columns.anotherTestTable.testColumn).to.be('Some other text');
    expect(json.columns.anotherTestTable.otherColumn).to.be('Some other multilanguage text');
  });

  it('can set multiple fallback languages, if a spec is not defined', () => {
    const json = createSchemaFromLanguageTables('de', 'en')(resultFixture)['fr'];
    expect(json.tables.anotherTestTable).to.be('Test table 2');
    expect(json.columns.anotherTestTable.testColumn).to.be('Some other text');
  });

});

