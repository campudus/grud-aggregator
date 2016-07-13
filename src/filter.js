import _ from 'lodash';

export function filter(filter) {
  return data => {
    if (filter) {
      // keep the table data
      const accTables = _.transform(data, (all, table) => {
        all[table.id] = all[table.id] || _.omit(table, 'rows');
      }, {});

      // find table that we want to filter from
      const table = _.find(data, table => table.name === filter.path[0]);
      if (table) {

        // find values that match predicate
        const matchingRows = _.reduce(table.rows, (rows, row) => {
          if (_.isEmpty(filter.path)) {
            console.log('not matching empty path.');
          } else if (matches(filter.path, row, table, filter.predicate)) {
            rows[row.id] = row;
          }
          return rows;
        }, {});

        // add all dependencies of this into allTables
        accTables[table.id].rows = matchingRows;
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
          }, []);
        }
      }, {});
      const missing = _.transform(linksOfCurrentTableToCheck, (missing, linkedRowIds, tableId) => {
        const existingRows = _.keys(accTables[tableId].rows);
        missing[tableId] = missing[tableId] || linkedRowIds;
        missing[tableId] = _.difference(missing[tableId], existingRows);
      }, {});

      _.forEach(missing, (linksInTable, tableId) => {
        accTables[tableId].rows = _.transform(linksInTable, (rows, toRowId) => {
          rows[toRowId] = data[tableId].rows[toRowId];
        }, accTables[tableId].rows || {});
        addDependenciesOfTable(data, accTables, accTables[tableId], linksInTable);
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
          return false; // non existant path
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
      }, {});
    }
  };
}