import type {
  Prettify,
  Table,
  TableName,
  ColumnName,
  LinkedTableId,
  Row,
  Tables
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
  CName extends ColumnName<TName> = ColumnName<TName>
>(
  tableNameOrNames: TNameOrNames,
  options: {
    disableFollow?: string[][];
    includeColumns?: CName[];
    pimUrl: string;
    maxEntriesPerRequest?: number;
    archived?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
  }
): Promise<TableEntities<TName>>;
