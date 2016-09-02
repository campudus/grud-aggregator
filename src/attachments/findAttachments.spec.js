import expect from 'must';
import data from './__tests__/entitiesWithAttachments.json';
import resultWithAttachments from './__tests__/resultWithAttachments.json';
import {filter} from '../filter';
import {findAttachments} from './findAttachments';
import _ from 'lodash';

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

  // TODO filter attachments to only get from specific tables / columns
  it.skip('can get a filter that fetches only the wanted attachments', () => {
    return Promise.resolve(data)
      .then(findAttachments({
        filter : ['option', 'imagesStraight']
      }))
      .then(attachments => {
        expect(attachments.length).to.be(9);
      });
  });

  it('can add mappings from externalName to internalName', () => {
    return Promise.resolve(data)
      .then(findAttachments({
        withMapping : true
      }))
      .then(attachments => {
        expect(attachments.length).to.be(9);
        expect(_.every(attachments, a => {
          return _.has(a, ['externalName']) &&
            _.has(a, ['internalName']) &&
            _.has(a, ['lang']) &&
            _.has(a, ['url']) &&
            _.has(a, ['path']);
        })).to.be.true();
      });
  });

  it('can keep the original attachment with the withAttachment option', () => {
    return Promise.resolve(data)
      .then(findAttachments({
        withAttachment : true
      }))
      .then(attachments => {
        expect(attachments.length).to.be(9);
        expect(attachments).to.eql(resultWithAttachments);
      });
  });

  it('can have the original attachment and a mapping at the same time', () => {
    return Promise.resolve(data)
      .then(findAttachments({
        withAttachment : true,
        withMapping : true
      }))
      .then(attachments => {
        expect(attachments.length).to.be(9);
        expect(_.every(attachments, a => {
          return _.has(a, ['attachment']) &&
            _.has(a, ['attachment', 'title']) &&
            _.has(a, ['attachment', 'description']) &&
            _.has(a, ['attachment', 'externalName']) &&
            _.has(a, ['attachment', 'internalName']) &&
            _.has(a, ['attachment', 'mimeType']) &&
            _.has(a, ['attachment', 'url']) &&
            _.has(a, ['externalName']) &&
            _.has(a, ['internalName']) &&
            _.has(a, ['lang']) &&
            _.has(a, ['url']) &&
            _.has(a, ['path']);
        })).to.be.true();
      });
  });

});
