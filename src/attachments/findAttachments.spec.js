import expect from 'must';
import data from './__tests__/entitiesWithAttachments.json';
import { filter } from '../filter';
import { findAttachments } from './findAttachments';

describe('findAttachments', () => {

  it('returns a function to be chainable in Promises', () => {
    expect(findAttachments()).to.be.a.function();
  });

  it('locates the correct amount of attachments when checking single, language neutral attachment', () => {
    return Promise.resolve(data)
      .then(filter({
        path : ['testTable'],
        predicate : v => v.identifier === '1'
      }))
      .then(findAttachments())
      .then(attachments => {
        expect(attachments.length).to.be(1);
      });
  });

  it('locates the correct amount of attachments when checking single, multilanguage attachment', () => {
    return Promise.resolve(data)
      .then(filter({
        path : ['testTable'],
        predicate : v => v.identifier === '2'
      }))
      .then(findAttachments())
      .then(attachments => {
        expect(attachments.length).to.be(2);
      });
  });

  it('locates the correct amount of attachments when checking multiple attachments', () => {
    return Promise.resolve(data)
      .then(filter({
        path : ['testTable'],
        predicate : v => v.identifier === '3'
      }))
      .then(findAttachments())
      .then(attachments => {
        expect(attachments.length).to.be(6);
      });
  });

  it('locates the correct amount of attachments when checking rows with zero attachments', () => {
    return Promise.resolve(data)
      .then(filter({
        path : ['testTable'],
        predicate : v => v.identifier === '4'
      }))
      .then(findAttachments())
      .then(attachments => {
        expect(attachments.length).to.be(0);
      });
  });

  it('locates the correct amount of attachments when checking rows with zero attachments', () => {
    return Promise.resolve(data)
      .then(filter({
        path : ['testTable'],
        predicate : v => v.identifier === '1' || v.identifier === '3'
      }))
      .then(findAttachments())
      .then(attachments => {
        expect(attachments.length).to.be(7);
      });
  });

  it('locates the correct amount of attachments, when used with all attachments', () => {
    return Promise.resolve(data)
      .then(findAttachments())
      .then(attachments => {
        expect(attachments.length).to.be(9);
      });
  });

});
