import _ from 'lodash';

export function filter(filter) {
  const predicate = (!_.isNil(filter) && _.isFunction(filter.predicate)) ? filter.predicate : () => true;
  return data => {
    if (filter && !_.isEmpty(filter.path)) {
      // keep the table data without any initial data (rows)
      const accTables = _.transform(data, (all, table) => {
        all[table.id] = _.omit(table, 'rows');
      }, {});

      // find table that we want to filter from
      const table = _.find(data, table => table.name === filter.path[0]);
      if (table) {

        // add all dependencies of this into allTables
        accTables[table.id].rows = _.transform(table.rows, (rows, row) => {
          // find values that match predicate
          if (matches(filter.path, row, table, predicate)) {
            rows[row.id] = row;
          }
        }, {});
        addDependenciesOfTable(data, accTables, accTables[table.id]);
      }

      // return only tables that have rows / are linked
      return _.omitBy(accTables, table => _.isEmpty(table.rows));
    } else {
      return data;
    }

    function addDependenciesOfTable(data, accTables, currentTable) {

      const linksOfCurrentTableToCheck = _.transform(currentTable.columns, (acc, column, idx) => {
        if (column.kind === 'link') {
          acc[column.toTable] = _.reduce(currentTable.rows, (linkIds, rowValue) => {
            return _.union(linkIds, _.map(rowValue.values[idx], link => link.id));
          }, acc[column.toTable] || []);
        }
      }, {});

      const missing = _.transform(linksOfCurrentTableToCheck, (missing, linkedRowIds, tableId) => {
        const existingRows = _.isNil(accTables[tableId]) ? [] : _.map(accTables[tableId].rows, row => row.id);
        missing[tableId] = missing[tableId] || linkedRowIds;
        missing[tableId] = _.difference(missing[tableId], existingRows);
      }, {});

      const filteredMissing = _.omitBy(missing, _.isEmpty);
      _.forEach(filteredMissing, (linksInTable, tableId) => {
        accTables[tableId].rows = _.transform(linksInTable, (rows, toRowId) => {
          rows[toRowId] = data[tableId].rows[toRowId];
        }, accTables[tableId].rows || {});
        addDependenciesOfTable(data, accTables, accTables[tableId]);
      });
    }

    function matches([currentColumn, ...columnsToWalk], row, currentTable, predicate) {
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
          const nextTable = data[nextTableId];
          const nextColumnsToWalk = columnsToWalk;
          const nextRows = _.map(nextLinks, rowIdInNextTable => nextTable.rows[rowIdInNextTable]);

          return _.some(nextRows, nextRow => matches(nextColumnsToWalk, nextRow, nextTable, predicate));
        }
      }
    }

    function toElement(row, table) {
      return _.reduce(table.columns, (element, column, idx) => {
        element[column.name] = row.values[idx];
        return element;
      }, {id : row.id});
    }
  };
}
