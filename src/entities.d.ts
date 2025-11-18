import type {
  Structure,
  Prettify,
  Table,
  TableName,
  Row,
  Tables,
  LinkedTableName,
  Flat,
  TableFilterName,
  ColumnName,
  TableColumns
} from "./common.d.ts";

export type TableEntity<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<
  {
    [TName in T["name"]]: TableFilterName<S, TName> extends infer TFName
      ? Exclude<Extract<TFName, Inc extends TFName ? Inc : TFName>, Exc> extends infer ITF
        ? (ITF extends `${string}.${infer C}` ? C : ColumnName<S, TName>) extends infer CName
          ? Omit<Table<S, TName>, "columns"> & {
              columns: TableColumns<
                S,
                TName,
                CName extends ColumnName<S, TName> ? CName : ColumnName<S, TName> //  TODO: improve
              >;
              rows: {
                [rowId: number]: Row<
                  S,
                  TName,
                  CName extends ColumnName<S, TName> ? CName : ColumnName<S, TName>
                >;
              };
            }
          : never
        : never
      : never;
  }[T["name"]]
>;

export type TableEntities<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<{
  [TId in T["id"]]: TableEntity<S, Extract<T, { id: TId }>, Inc, Exc>;
}>;

export function getEntitiesOfTable<
  S extends Structure,
  TNameOrNames extends TableName<S> | TableName<S>[],
  Inc extends TableFilterName<S, TableName<S>>[] | undefined = undefined,
  Exc extends (TableName<S> | TableFilterName<S, TableName<S>>)[] | undefined = undefined,
  LTName extends TableName<S> = LinkedTableName<
    S, //
    Flat<TNameOrNames>,
    Flat<Inc>,
    Flat<Exc>
  >
>(
  tableNameOrNames: TNameOrNames,
  options?: {
    structure?: S;
    pimUrl?: string;
    maxEntriesPerRequest?: number;
    archived?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
    include?: Inc;
    exclude?: Exc;
  }
): Promise<
  TableEntities<
    S, //
    Table<S, Flat<TNameOrNames> | LTName>,
    Flat<Inc>,
    Flat<Exc>
  >
>;
