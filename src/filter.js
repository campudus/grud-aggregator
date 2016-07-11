import _ from 'lodash';

export function filter(filter) {
  return data => {
    return _.reduce(data, (all, tables, lang) => {
      // FIXME make this correct
      // 1) calculate what to filter regarding rows through the given path
      // 2) filter table rows
      // 3) filter tables that have no rows
      // 4) return the things that are still there after the filter
      if (filter) {
        all[lang] = {};
      } else {
        all[lang] = tables;
      }
      return all;
    }, {});
  }
}
