import translatedTableFixture from './__tests__/resultFixture.json';
import {createLanguageJsonForTablesAndColumns} from './tablesAndColumns';
import expect from 'must';
import _ from 'lodash';

describe('createLanguageJsonForTablesAndColumns', () => {

  it('returns a json with language tags and in there keys "tables" and "columns"', () => {
    const langJson = createLanguageJsonForTablesAndColumns(translatedTableFixture);
    expect(_.size(langJson)).to.be(2);
    const json = langJson['de-DE'];
    expect(json).not.to.be.empty();
    expect(json.tables).to.exist();
    expect(json.tables).to.be.an.object();
    expect(json.tables).not.to.be.an.array();
    expect(json.columns).to.exist();
    expect(json.columns).to.be.an.object();
    expect(json.columns).not.to.be.an.array();
  });

  it('columns object has same keys as tables', () => {
    const json = createLanguageJsonForTablesAndColumns(translatedTableFixture)['de-DE'];
    expect(Object.keys(json.tables).sort()).to.eql(Object.keys(json.columns).sort());
  });

  it('results in {tables:{[internalTableName]:[name]} for tables', () => {
    const json = createLanguageJsonForTablesAndColumns(translatedTableFixture)['de-DE'];
    expect(Object.keys(json.tables).sort()).to.eql(['variant']);
    expect(json.tables.variant).to.exist();
    expect(json.tables.variant).to.be('Variante');
  });

  it('results in {columns:{[internalTableName]:{[internalColumnName]:[name]}}} for columns', () => {
    const json = createLanguageJsonForTablesAndColumns(translatedTableFixture)['de-DE'];
    expect(Object.keys(json.columns).sort()).to.eql(['variant']);
    expect(json.columns.variant).to.exist();
    expect(Object.keys(json.columns.variant).sort()).to.eql([
      'aricleNumber',
      'battery',
      'color',
      'description',
      'ean',
      'features',
      'frame',
      'identifier',
      'imagesDetail',
      'imagesDiagonal',
      'imagesStraight',
      'rrp'
    ]);
    expect(json.columns.variant.color).to.be('Farbe');
    expect(json.columns.variant.frame).to.be('Rahmen');
  });
});

