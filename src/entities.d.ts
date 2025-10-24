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

export type TableEntities<
  TName extends TableName,
  TId extends number = Table<TName>["id"]
> = Prettify<{
  [Id in TId]: Extract<Tables, { id: Id }> extends infer Table
    ? Table extends Tables
      ? Table & {
          rows: {
            [rowId: number]: Row<Table["name"]>;
          };
        }
      : never
    : never;
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
    | Flat<TNameOrNames>
    | LinkedTableName<
        Flat<TNameOrNames>,
        Flat<IncludeColumns>,
        Flat<IncludeTables>,
        Flat<ExcludeTables>
      >
  >
>;
