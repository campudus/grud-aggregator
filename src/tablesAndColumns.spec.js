import resultFixture from './__tests__/resultFixture.json';
import {createLanguageJsonForTablesAndColumns} from './tablesAndColumns';
import expect from 'must';
import _ from 'lodash';

describe('createLanguageJsonForTablesAndColumns', () => {

  it('returns a json with language tags and in there keys "tables" and "columns"', () => {
    const langJson = createLanguageJsonForTablesAndColumns(resultFixture);
    expect(_.size(langJson)).to.be(2);
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
    const json = createLanguageJsonForTablesAndColumns(resultFixture)['de'];
    expect(Object.keys(json.tables).sort()).to.eql(Object.keys(json.columns).sort());
  });

  it('results in {tables:{[internalTableName]:[name]} for tables', () => {
    const json = createLanguageJsonForTablesAndColumns(resultFixture)['de'];
    expect(Object.keys(json.tables).sort()).to.eql(['anotherTestTable', 'testTable']);
    expect(json.tables.testTable).to.exist();
    expect(json.tables.testTable).to.be('Test Tabelle');
  });

  it('results in {columns:{[internalTableName]:{[internalColumnName]:[name]}}} for columns', () => {
    const json = createLanguageJsonForTablesAndColumns(resultFixture)['de'];
    expect(Object.keys(json.columns).sort()).to.eql(['anotherTestTable', 'testTable']);
    expect(json.columns.testTable).to.exist();
    expect(Object.keys(json.columns.testTable).sort()).to.eql([
      'mlShorttext',
      'slShorttext'
    ]);
    expect(json.columns.testTable.slShorttext).to.be('Irgendein Text');
    expect(json.columns.testTable.mlShorttext).to.be('Irgendein mehrsprachiger Text');
  });
});

