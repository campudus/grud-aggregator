import resultFixture from './__tests__/resultFixture.json';
import filterFixtureSecondTable from './__tests__/filterFixtureSecondTable.json';
import filterFixtureEmpty from './__tests__/filterFixtureEmpty.json';
import { filter } from './filter';
import expect from 'must';

describe.only('filter', () => {

  it('returns a function, so we can put it into Promise.then chains', () => {
    expect(filter()).to.be.a.function();
  });

  it('can pass data through, if no filter was specified', () => {
    return Promise.resolve(resultFixture)
      .then(filter())
      .then(data => {
        expect(data).to.eql(resultFixture);
      });
  });

  it('can filter everything so the result is an empty object', () => {
    return Promise.resolve(resultFixture)
      .then(filter({
        path : ['anotherTestTable', 'testColumn'],
        predicate : value => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixtureEmpty);
      });
  });

  it('wrong paths will remove all data', () => {
    return Promise.resolve(resultFixture)
      .then(filter({
        path : ['non-existant'],
        predicate : value => false
      }))
      .then(data => {
        expect(data).to.eql(filterFixtureEmpty);
      });
  });

  it('can filter to a single value', () => {
    return Promise.resolve(resultFixture)
      .then(filter({
        path : ['anotherTestTable', 'testColumn'],
        predicate : value => value === 'some other thing in second row'
      }))
      .then(data => {
        expect(data).to.eql(filterFixtureSecondTable);
      });
  });

  // can pass multiple filters
});
