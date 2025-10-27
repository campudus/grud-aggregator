export function referencer() {
  return (entitiesOfPim) => {
    const withLanguages = !/^[0-9]+$/.test(Object.keys(entitiesOfPim).at(0));
    const tablesByLangtag = withLanguages ? entitiesOfPim : { default: entitiesOfPim };
    const output = {};

    for (const [lt, tablesById] of Object.entries(tablesByLangtag)) {
      output[lt] = {};

      for (const table of Object.values(tablesById)) {
        output[lt][table.name] ||= {};

        for (const [rowId, row] of Object.entries(table.rows)) {
          output[lt][table.name][rowId] ||= { id: row.id };

          for (const [columnIndex, column] of Object.entries(table.columns)) {
            const cellValue = row.values[columnIndex];

            if (column.kind === "link") {
              const linkTableName = tablesById[column.toTable].name;

              output[lt][table.name][rowId][column.name] = cellValue.map((link) => {
                const linkRowId = link.id || link;

                output[lt][linkTableName] ||= {};
                output[lt][linkTableName][linkRowId] ||= { id: linkRowId };

                return output[lt][linkTableName][linkRowId];
              });
            } else {
              output[lt][table.name][rowId][column.name] = cellValue;
            }
          }
        }
      }
    }

    return withLanguages ? output : output.default;
  };
}
