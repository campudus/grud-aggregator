import type {
  Prettify,
  Table,
  TableName,
  ColumnName,
  Row,
  Tables,
  LinkedTableName,
  Flat
} from "./common.d.ts";

export type TableEntity<T extends Tables> = Prettify<
  {
    [TName in T["name"]]: Table<TName> & {
      rows: {
        [rowId: number]: Row<TName>;
      };
    };
  }[T["name"]]
>;

export type TableEntities<T extends Tables> = Prettify<{
  [TId in T["id"]]: TableEntity<Extract<T, { id: TId }>>;
}>;

export function getEntitiesOfTable<
  TNameOrNames extends TableName | TableName[],
  IncludeColumns extends ColumnName<Flat<TNameOrNames>>[] | undefined = undefined,
  IncludeTables extends LinkedTableName<Flat<TNameOrNames>>[] | undefined = undefined,
  ExcludeTables extends LinkedTableName<Flat<TNameOrNames>>[] | undefined = undefined
>(
  tableNameOrNames: TNameOrNames,
  options: {
    pimUrl: string;
    maxEntriesPerRequest?: number;
    archived?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
    includeColumns?: IncludeColumns;
    includeTables?: IncludeTables;
    excludeTables?: ExcludeTables;
  }
): Promise<
  TableEntities<
    Table<
      | Flat<TNameOrNames>
      | LinkedTableName<
          Flat<TNameOrNames>,
          Flat<IncludeColumns>,
          Flat<IncludeTables>,
          Flat<ExcludeTables>
        >
    >
  >
>;
