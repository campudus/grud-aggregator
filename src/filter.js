import _ from 'lodash';

const defaultPredicate = () => true;

export function filter({
  excludeBacklinks = false,
  path = [],
  predicate = defaultPredicate,
  ignoreMissing = false
} = {
  excludeBacklinks : false,
  path : [],
  predicate : defaultPredicate,
  ignoreMissing : false
}) {

  return data => {
    if (!_.isEmpty(path)) {
      // keep the table data without any initial data (rows)
      const accTables = _.transform(data, (all, table) => {
        all[table.id] = _.omit(table, 'rows');
      }, {});

      // find table that we want to filter from
      const firstTable = _.find(data, table => table.name === path[0]);
      if (firstTable) {

        // add all dependencies of this into allTables
        accTables[firstTable.id].rows = _.transform(firstTable.rows, (rows, row) => {
          // find values that match predicate
          if (matches(data, path, row, firstTable, predicate)) {
            rows[row.id] = row;
          }
        }, {});

        addDependenciesOfTable(
          data,
          accTables,
          accTables[firstTable.id],
          excludeBacklinks,
          `${firstTable.id}`,
          ignoreMissing
        );

        if (excludeBacklinks) {
          return _.omitBy(removeBrokenLinksToFirstTable(accTables, firstTable.id), table => _.isEmpty(table.rows));
        }

      }

      // return only tables that have rows / are linked
      return _.omitBy(accTables, table => _.isEmpty(table.rows));
    } else {
      return data;
    }
  };

}

function removeBrokenLinksToFirstTable(accTables, firstTableId) {
  return _.mapValues(accTables, table => {
    const columnIdxsOfLinks = _.transform(table.columns, (cols, column, idx) => {
      if (column.kind === 'link' && column.toTable === firstTableId) {
        cols.push(idx);
      }
    }, []);
    table.rows = _.mapValues(table.rows, row => {
      return {
        ...row,
        values : _.map(row.values, (value, idx) => {
          if (_.includes(columnIdxsOfLinks, idx)) {
            return _.filter(value, link => !_.isNil(accTables[firstTableId].rows[link.id]));
          } else {
            return value;
          }
        })
      };
    });
    return table;
  });
}

function addDependenciesOfTable(allTables, accTables, currentTable, excludeBacklinks, excludedTableId, ignoreMissing) {

  const linksOfCurrentTableToCheck = _.transform(currentTable.columns, (acc, column, idx) => {
    if (column.kind === 'link') {
      acc[column.toTable] = _.reduce(currentTable.rows, (linkIds, rowValue) => {
        if (_.isNil(rowValue)) {
          return linkIds;
        } else {
          return _.union(linkIds, _.map(rowValue.values[idx], link => link.id));
        }
      }, acc[column.toTable] || []);
    }
  }, {});

  const missing = _.transform(linksOfCurrentTableToCheck, (missing, linkedRowIds, tableId) => {
    const isExcludedLink = excludeBacklinks && tableId === excludedTableId;
    if (!isExcludedLink) {
      const existingRows = _.isNil(accTables[tableId]) ? [] : _.map(accTables[tableId].rows, row => row.id);
      missing[tableId] = missing[tableId] || linkedRowIds;
      missing[tableId] = _.difference(missing[tableId], existingRows);
    }
  }, {});

  const filteredMissing = _.omitBy(missing, _.isEmpty);

  _.forEach(filteredMissing, (linksInTable, tableId) => {
    if (_.isNil(accTables[tableId])) {
      if (!ignoreMissing) {
        console.warn('Linking to a missing table - ignoring!', ignoreMissing);
      }
    } else {
      accTables[tableId].rows = _.transform(linksInTable, (rows, toRowId) => {
        const entity = allTables[tableId].rows[toRowId];
        if (_.isNil(entity)) {
          if (!ignoreMissing) {
            console.warn('Missing entity', toRowId, 'in table', tableId);
          }
        } else {
          rows[toRowId] = entity;
        }
      }, accTables[tableId].rows || {});

      addDependenciesOfTable(
        allTables,
        accTables,
        accTables[tableId],
        excludeBacklinks,
        excludedTableId,
        ignoreMissing
      );
    }
  });

}

function matches(allTables, [currentColumn, ...columnsToWalk], row, currentTable, predicate) {
  if (_.isEmpty(columnsToWalk)) {
    const element = toElement(row, currentTable);
    return predicate(element);
  } else {
    const nextColumnName = columnsToWalk[0];
    const nextColumnIdx = _.findIndex(currentTable.columns, col => col.name === nextColumnName);
    if (nextColumnIdx === -1) {
      return false; // non existent path
    } else {
      const nextColumn = currentTable.columns[nextColumnIdx];
      const nextLinks = _.map(row.values[nextColumnIdx], link => link.id);
      const nextTableId = nextColumn.toTable;
      const nextTable = allTables[nextTableId];
      const nextColumnsToWalk = columnsToWalk;
      const nextRows = _.map(nextLinks, rowIdInNextTable => nextTable.rows[rowIdInNextTable]);

      return _.some(nextRows, nextRow => matches(allTables, nextColumnsToWalk, nextRow, nextTable, predicate));
    }
  }
}

function toElement(row, table) {
  return _.reduce(table.columns, (element, column, idx) => {
    element[column.name] = row.values[idx];
    return element;
  }, {id : row.id});
}
