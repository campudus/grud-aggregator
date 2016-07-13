import tablesFixture from './__tests__/tablesFixture.json';
import filterFixture0 from './__tests__/filterFixture0.json';
import filterFixture1 from './__tests__/filterFixture1.json';
import filterFixture2 from './__tests__/filterFixture2.json';
import filterFixture3 from './__tests__/filterFixture3.json';
import filterFixture4 from './__tests__/filterFixture4.json';
import { filter } from './filter';
import expect from 'must';

describe('filter', () => {

  it('returns a function, so we can put it into Promise.then chains', () => {
    expect(filter()).to.be.a.function();
  });

  it('can pass data through, if no filter was specified', () => {
    return Promise.resolve(tablesFixture)
      .then(filter())
      .then(data => {
        expect(data).to.eql(tablesFixture);
      });
  });

  it('can filter everything so the result is an empty object', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['anotherTestTable'],
        predicate : () => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
      });
  });

  it('wrong paths will remove all data (1)', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['non-existant'],
        predicate : () => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
      });
  });

  it('wrong paths will remove all data (2)', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['non', 'existant'],
        predicate : () => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
      });
  });

  it('wrong paths will remove all data (3)', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['thirdTestTable', 'non-existant'],
        predicate : () => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
      });
  });

  it('can filter a single value', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['anotherTestTable'],
        predicate : value => value.testColumn === 'some other thing in second row'
      }))
      .then(data => {
        expect(data).to.eql(filterFixture1);
      });
  });

  it('filters a table that is linked with something to false to filter everything', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['thirdTestTable', 'anotherLink'],
        predicate : () => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixture0);
      });
  });

  it('filters a table that is linked by multiple entries', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['thirdTestTable', 'anotherLink'],
        predicate : value => value.testColumn === 'some other thing in second row'
      }))
      .then(data => {
        expect(data).to.eql(filterFixture2);
      });
  });

  it('filters a table through links over links', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['testTable', 'someLink', 'anotherLink'],
        predicate : value => value.testColumn === 'some other thing in second row'
      }))
      .then(data => {
        expect(data).to.eql(filterFixture3);
      });
  });

  it('can be chained multiple times to create an AND effect', () => {
    return Promise.resolve(tablesFixture)
      .then(filter({
        path : ['testTable', 'someLink', 'anotherLink'],
        predicate : value => value.testColumn === 'some other thing in second row'
      }))
      .then(filter({
        path : ['testTable', 'someLink'],
        predicate : value => {
          return value.identifier === 'my fourth row identifying text, linking to no rows in anotherTestTable';
        }
      }))
      .then(data => {
        expect(data).to.eql(filterFixture4);
      });
  });

});
