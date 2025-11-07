import type {
  Structure,
  Prettify,
  Table,
  TableName,
  ColumnName,
  Row,
  Tables,
  LinkedTableName,
  Flat
} from "./common.d.ts";

export type TableEntity<
  S extends Structure, //
  T extends Tables<S>
> = Prettify<
  {
    [TName in T["name"]]: Table<S, TName> & {
      rows: {
        [rowId: number]: Row<S, TName>;
      };
    };
  }[T["name"]]
>;

export type TableEntities<
  S extends Structure, //
  T extends Tables<S>
> = Prettify<{
  [TId in T["id"]]: TableEntity<S, Extract<T, { id: TId }>>;
}>;

export type GetEntitiesOfTable<S extends Structure> = <
  TNameOrNames extends TableName<S> | TableName<S>[],
  IncludeColumns extends ColumnName<S, Flat<TNameOrNames>>[] | undefined = undefined,
  IncludeTables extends LinkedTableName<S, Flat<TNameOrNames>>[] | undefined = undefined,
  ExcludeTables extends LinkedTableName<S, Flat<TNameOrNames>>[] | undefined = undefined
>(
  tableNameOrNames: TNameOrNames,
  options?: {
    pimUrl?: string;
    maxEntriesPerRequest?: number;
    archived?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
    includeColumns?: IncludeColumns;
    includeTables?: IncludeTables;
    excludeTables?: ExcludeTables;
  }
) => Promise<
  TableEntities<
    S,
    Table<
      S,
      | Flat<TNameOrNames>
      | LinkedTableName<
          S,
          Flat<TNameOrNames>,
          Flat<IncludeColumns>,
          Flat<IncludeTables>,
          Flat<ExcludeTables>
        >
    >
  >
>;
