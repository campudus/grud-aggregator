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
  TableColumns,
  ColumnInfo,
  UnionToIntersection,
  RowValue
} from "./common.d.ts";

export type TableEntity<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<
  {
    [TName in T["name"]]: TableFilterName<S, TName> extends infer TFName
      ? Exclude<
          Extract<TFName, Inc> extends never ? TFName : Extract<TFName, Inc>,
          Exc
        > extends infer ITF
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

export type RefEntity<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined,
  Ent extends TableEntity<S, T, Inc, Exc> = TableEntity<S, T, Inc, Exc>,
  EntCols extends Ent["columns"] = Ent["columns"],
  EntColsIndex extends Exclude<keyof EntCols, keyof unknown[]> = Exclude<
    keyof EntCols,
    keyof unknown[]
  >
> = Prettify<
  UnionToIntersection<
    { id: number } & {
      [K in EntColsIndex]: EntCols[K] extends ColumnInfo
        ? EntCols[K]["name"] extends string
          ? {
              [CName in EntCols[K]["name"]]: EntCols[K]["kind"] extends "link"
                ? EntCols[K]["toTable"] extends infer LId
                  ? RefEntity<S, Extract<Tables<S>, { id: LId }>, Inc, Exc>[]
                  : never
                : RowValue<S, EntCols[K]>;
            }
          : never
        : never;
    }[EntColsIndex]
  >
>;

export type RefEntities<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<{
  [TName in T["name"]]: {
    [rowId: number]: RefEntity<S, Extract<Tables<S>, { name: TName }>, Inc, Exc>;
  };
}>;

export function getEntitiesOfTable<
  S extends Structure,
  TNameOrNames extends TableName<S> | TableName<S>[],
  Inc extends TableFilterName<S, TableName<S>>[] | undefined = undefined,
  Exc extends (TableName<S> | TableFilterName<S, TableName<S>>)[] | undefined = undefined,
  Ref extends boolean = false,
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
    referenced?: Ref;
  }
): Promise<
  Ref extends true
    ? RefEntities<S, Table<S, Flat<TNameOrNames> | LTName>, Flat<Inc>, Flat<Exc>>
    : TableEntities<S, Table<S, Flat<TNameOrNames> | LTName>, Flat<Inc>, Flat<Exc>>
>;
