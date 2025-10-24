import type {
  Prettify,
  Table,
  TableName,
  ColumnName,
  LinkedTableId,
  Row,
  Tables,
  LinkedTableName
} from "./common.d.ts";

export type TableEntities<
  TName extends TableName,
  TId extends number = Table<TName>["id"],
  LinkIds extends number = LinkedTableId<TId>
> = Prettify<{
  [Id in TId | LinkIds]: Extract<Tables, { id: Id }> extends infer LinkTable
    ? LinkTable extends Tables
      ? LinkTable & {
          rows: {
            [rowId: number]: Row<LinkTable["name"]>;
          };
        }
      : never
    : never;
}>;

export function getEntitiesOfTable<
  TNameOrNames extends TableName | TableName[],
  TName extends TableName = TNameOrNames extends TableName[] ? TNameOrNames[number] : TNameOrNames,
  LName extends LinkedTableName<TName> = LinkedTableName<TName>,
  IncludeTableName extends LName = LName,
  ExcludeTableName extends LName = LName,
  IncludeColumnName extends ColumnName<TName> = ColumnName<TName>
>(
  tableNameOrNames: TNameOrNames,
  options: {
    pimUrl: string;
    maxEntriesPerRequest?: number;
    archived?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
    includeColumns?: IncludeColumnName[];
    includeTables?: IncludeTableName[],
    excludeTables?: ExcludeTableName[],
  }
): Promise<TableEntities<TName>>;
